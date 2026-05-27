document.addEventListener('DOMContentLoaded', () => {
    const projectOverlay = document.getElementById('projectDetailOverlay');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailProjectMeta = document.getElementById('detailProjectMeta');
    const detailProjectDesc = document.getElementById('detailProjectDesc');

    // 监听所有作品链接的点击事件
    document.querySelectorAll('.open-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 读取 HTML 标签里预设的 data 属性值
            const title = link.getAttribute('data-title');
            const desc = link.getAttribute('data-desc');
            
            // 动态注入到详情弹窗中
            detailProjectMeta.textContent = title;
            detailProjectDesc.textContent = desc;
            
            // 显示全屏详情页并置顶
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
