document.addEventListener('DOMContentLoaded', () => {
    const projectOverlay = document.getElementById('projectDetailOverlay');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailProjectMeta = document.getElementById('detailProjectMeta');
    const detailProjectTitle = document.getElementById('detailProjectTitle');
    const detailProjectDesc = document.getElementById('detailProjectDesc');
    const detailImagesBox = document.getElementById('detailImagesBox');

    // 🌟 动态在详情页右侧文字栏下方塞入一个“快捷导航盒子”
    const detailTextColumn = document.querySelector('.detail-text-column');
    const sidebarNav = document.createElement('div');
    sidebarNav.className = 'detail-sidebar-nav';
    detailTextColumn.appendChild(sidebarNav);

    // 核心渲染函数：无论是从首页点进来的，还是在侧边栏切换的，都用它来刷新画面
    function renderProject(clickedLink) {
        const title = clickedLink.getAttribute('data-title');
        const desc = clickedLink.getAttribute('data-desc');
        const imgsData = clickedLink.getAttribute('data-imgs'); // 完美读取你原本的相对图片路径
        
        detailProjectMeta.textContent = title;
        detailProjectTitle.textContent = title;
        detailProjectDesc.innerHTML = desc; // 🌟 确保用 innerHTML 识别换行
        
        // 清空盒子，重新吐出图片
        detailImagesBox.innerHTML = '';
        
        if (imgsData) {
            const imgList = imgsData.split(','); // 拆分相对路径
            imgList.forEach(url => {
                const imgElement = document.createElement('img');
                imgElement.src = url.trim(); // 保持相对路径原汁原味
                detailImagesBox.appendChild(imgElement);
            });
        } else {
            // 如果其他项目在 index.html 里没有写 data-imgs 属性，就显示整理中提示
            detailImagesBox.innerHTML = '<div style="font-size:13px; color:#999; padding-top:20px;">[作品图片正在整理上传中...]</div>';
        }

        // 🌟 自动化魔法：实时复印首页的菜单列表，并传入当前的标题用来“染灰不可点”
        generateSidebarMenu(title);

        // 切换项目的时候，自动把弹窗的滚动条抽回最顶部，方便看新项目
        projectOverlay.scrollTop = 0;
    }

    // 自动化“复印”首页侧边栏菜单的函数
    function generateSidebarMenu(currentTitle) {
        sidebarNav.innerHTML = ''; // 先擦干净旧的
        
        // 精准抓取你最新的 index.html 左栏里的年份分组
        const yearGroups = document.querySelectorAll('.left-col .year-group');
        
        yearGroups.forEach(group => {
            const yearLabel = group.querySelector('.year-label').textContent;
            
            // 复制出年份标头
            const navYear = document.createElement('div');
            navYear.className = 'nav-year';
            navYear.textContent = yearLabel;
            sidebarNav.appendChild(navYear);
            
            // 创建列表
            const ul = document.createElement('ul');
            ul.className = 'detail-sidebar-list';
            
            // 抓取这个年份底下的所有 open-project 链接
            const links = group.querySelectorAll('.open-project');
            links.forEach(link => {
                const projectTitle = link.getAttribute('data-title');
                const li = document.createElement('li');
                li.className = 'detail-sidebar-item';
                
                // 如果侧边栏里的项目名字和当前正在看的项目名字一模一样，就染成灰色激活态
                if (projectTitle === currentTitle) {
                    li.classList.add('current-active');
                }
                
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'detail-sidebar-link';
                a.textContent = link.textContent; // 保持原本的文字内容
                
                // 给生成的侧边栏按钮绑定原地无缝切换的点击事件
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderProject(link); // 把对应的节点扔进去重新渲染
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

    // 监听关闭按钮：只纯粹关闭弹窗，大主页绝对不会跟着乱滚
    closeDetailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectOverlay.style.display = 'none';
    });
});
