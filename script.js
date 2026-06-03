document.addEventListener('DOMContentLoaded', () => {
    const projectOverlay = document.getElementById('projectDetailOverlay');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const detailProjectMeta = document.getElementById('detailProjectMeta');
    const detailProjectTitle = document.getElementById('detailProjectTitle');
    const detailProjectDesc = document.getElementById('detailProjectDesc');
    const detailImagesBox = document.getElementById('detailImagesBox'); // 抓取放图的盒子

    document.querySelectorAll('.open-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = link.getAttribute('data-title');
            const desc = link.getAttribute('data-desc');
            const imgsData = link.getAttribute('data-imgs'); // 读取那两张图的名字
            
            detailProjectMeta.textContent = title;
            detailProjectTitle.textContent = title;
            detailProjectDesc.textContent = desc;
            
            // 清空上一次弹窗可能残留的老图片
            detailImagesBox.innerHTML = '';
            
            // 如果这个项目配了图片，就用代码自动把图片吐出来
            if (imgsData) {
                const imgList = imgsData.split(','); // 拆出每一张图的路径
                imgList.forEach(url => {
                    const imgElement = document.createElement('img');
                    imgElement.src = url;
                    detailImagesBox.appendChild(imgElement);
                });
            } else {
                // 如果是其他暂时没传图的项目，放一个干净的空提示或者灰色对角线
                detailImagesBox.innerHTML = '<div style="font-size:13px; color:#999; padding-top:20px;">[作品图片正在整理上传中...]</div>';
            }
            
            projectOverlay.style.display = 'block';
            window.scrollTo(0, 0);
        });
    });

    closeDetailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectOverlay.style.display = 'none';
    });
});
