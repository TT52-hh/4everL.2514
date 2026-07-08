document.addEventListener('DOMContentLoaded', () => {
    const projectOverlay = document.getElementById('projectDetailOverlay');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailProjectMeta = document.getElementById('detailProjectMeta');
    const detailProjectTitle = document.getElementById('detailProjectTitle');
    const detailProjectDesc = document.getElementById('detailProjectDesc');
    const detailImagesBox = document.getElementById('detailImagesBox');

    // 🌟 抓取右下角用来放 PROJECT INFO 的容器
    const metaTagContainer = document.querySelector('.project-meta-tag');

    // 动态在详情页右侧文字栏下方塞入一个“快捷导航盒子”
    const detailTextColumn = document.querySelector('.detail-text-column');
    const sidebarNav = document.createElement('div');
    sidebarNav.className = 'detail-sidebar-nav';
    detailTextColumn.appendChild(sidebarNav);

    // 核心渲染函数：无论是从首页点进来的，还是在侧边栏切换的，都用它来刷新画面
    function renderProject(clickedLink) {
        const title = clickedLink.getAttribute('data-title');
        const desc = clickedLink.getAttribute('data-desc');
        const imgsData = clickedLink.getAttribute('data-imgs'); 
        
        // 读取 HTML 上面的新标签数据，如果没写就给个克制的中文/数字兜底
        const type = clickedLink.getAttribute('data-type') || '数字媒体 / 艺术';
        const date = clickedLink.getAttribute('data-date') || '2026';
        
        detailProjectMeta.textContent = title;
        detailProjectTitle.textContent = title;
        detailProjectDesc.innerHTML = desc || ''; 

        // 🌟 核心汉化调整：消灭多余英文，保持极其干净的冷淡中文版式
        if (metaTagContainer) {
            metaTagContainer.innerHTML = `
                <p style="color:#000; font-weight:500; margin-bottom: 4px;">项目信息</p>
                <p>${type}</p>
                <p>${date}</p>
            `;
        }
        
        // 清空盒子，重新吐出图片
        detailImagesBox.innerHTML = '';
        
        if (imgsData) {
            const imgList = imgsData.split(','); 
            imgList.forEach(url => {
                const imgElement = document.createElement('img');
                imgElement.src = url.trim(); 
                detailImagesBox.appendChild(imgElement);
            });
        } else {
            detailImagesBox.innerHTML = '<div style="font-size:13px; color:#999; padding-top:20px;">[作品图片正在整理上传中...]</div>';
        }

        // 自动化魔法：实时复印首页的菜单列表
        generateSidebarMenu(title);

        // 切换项目的时候，自动把弹窗的滚动条抽回最顶部
        projectOverlay.scrollTop = 0;
    }

    // 自动化“复印”首页侧边栏菜单的函数
    function generateSidebarMenu(currentTitle) {
        sidebarNav.innerHTML = ''; 
        
        const yearGroups = document.querySelectorAll('.left-col .year-group');
        
        yearGroups.forEach(group => {
            const yearLabel = group.querySelector('.year-label').textContent;
            
            const navYear = document.createElement('div');
            navYear.className = 'nav-year';
            navYear.textContent = yearLabel;
            sidebarNav.appendChild(navYear);
            
            const ul = document.createElement('ul');
            ul.className = 'detail-sidebar-list';
            
            const links = group.querySelectorAll('.open-project');
            links.forEach(link => {
                const projectTitle = link.getAttribute('data-title');
                const li = document.createElement('li');
                li.className = 'detail-sidebar-item';
                
                if (projectTitle === currentTitle) {
                    li.classList.add('current-active');
                }
                
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'detail-sidebar-link';
                a.textContent = link.textContent; 
                
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderProject(link); 
                });
                
                li.appendChild(a);
                ul.appendChild(li);
            });
            
            sidebarNav.appendChild(ul);
        });
    }

    // 监听主页所有带 .open-project 的链接
    document.querySelectorAll('.open-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            renderProject(link);
            projectOverlay.style.display = 'block';
        });
    });

    // 监听关闭按钮
    closeDetailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectOverlay.style.display = 'none';
    });
});
