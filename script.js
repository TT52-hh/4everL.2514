document.addEventListener('DOMContentLoaded', () => {
    const projectOverlay = document.getElementById('projectDetailOverlay');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailProjectMeta = document.getElementById('detailProjectMeta');
    const detailProjectDesc = document.getElementById('detailProjectDesc');

    // 监听所有作品链接的点击事件
    document.querySelectorAll('.open-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = link.getAttribute('data-title');
            const desc = link.getAttribute('data-desc');
            
            detailProjectMeta.textContent = title;
            detailProjectDesc.textContent = desc;
            
            projectOverlay.style.display = 'block';
            window.scrollTo(0, 0);
        });
    });

    // 点击返回按钮关闭详情页
    closeDetailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectOverlay.style.display = 'none';
    });
});
