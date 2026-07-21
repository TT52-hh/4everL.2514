document.addEventListener('DOMContentLoaded', () => {
    // 🌟 获取元素
    const projectOverlay = document.getElementById('projectDetailOverlay');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailProjectMeta = document.getElementById('detailProjectMeta');
    const detailProjectTitle = document.getElementById('detailProjectTitle');
    const detailProjectDesc = document.getElementById('detailProjectDesc');
    const detailImagesBox = document.getElementById('detailImagesBox');

    const metaTagContainer = document.querySelector('#projectDetailOverlay .project-meta-tag');

    // 动态在详情页右侧文字栏下方塞入一个“快捷导航盒子”
    const detailTextColumn = document.querySelector('#projectDetailOverlay .detail-text-column');
    const sidebarNav = document.createElement('div');
    sidebarNav.className = 'detail-sidebar-nav';
    detailTextColumn.appendChild(sidebarNav);

    // 核心渲染函数
    function renderProject(clickedLink) {
        const title = clickedLink.getAttribute('data-title');
        const desc = clickedLink.getAttribute('data-desc');
        const imgsData = clickedLink.getAttribute('data-imgs'); 
        
        const type = clickedLink.getAttribute('data-type') || '数字媒体 / 艺术';
        const date = clickedLink.getAttribute('data-date') || '2026';
        
        detailProjectMeta.textContent = title;
        detailProjectTitle.textContent = title;
        detailProjectDesc.innerHTML = desc || ''; 

        if (metaTagContainer) {
            metaTagContainer.innerHTML = `
                <p style="color:#000; font-weight:500; margin-bottom: 4px;">项目信息</p>
                <p>${type}</p>
                <p>${date}</p>
            `;
        }
        
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

        generateSidebarMenu(title);
        projectOverlay.scrollTop = 0;
    }

    // 自动化复印首页侧边栏菜单
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

    // 监听主页所有项目链接
    document.querySelectorAll('.open-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            renderProject(link);
            projectOverlay.style.display = 'block';
        });
    });

    // 监听项目详情关闭按钮
    closeDetailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectOverlay.style.display = 'none';
    });

    // ==========================================================================
    // 🌟 About Me 个人介绍弹窗控制逻辑
    // ==========================================================================
    const aboutOverlay = document.getElementById('aboutDetailOverlay');
    const openAboutBtn = document.getElementById('openAboutBtn');
    const closeAboutBtn = document.getElementById('closeAboutBtn');

    if (openAboutBtn && aboutOverlay) {
        openAboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aboutOverlay.style.display = 'block';
            aboutOverlay.scrollTop = 0;
        });
    }

    if (closeAboutBtn && aboutOverlay) {
        closeAboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aboutOverlay.style.display = 'none';
        });
    }
});
