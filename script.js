// 1. 扩充完整的数据资产配置库（包含所有项目的详情数据）
const projectData = {
    "font-youth": {
        title: "原创字体设计font-youth",
        intro: "商业艺术字形实验性推演与字库孵化。",
        type: "Typeface Design / Experimental",
        date: "Created in Dec 2025",
        images: [
            "https://raw.githubusercontent.com/tt52-hh/4everL_2514/main/font1.png",
            "https://raw.githubusercontent.com/tt52-hh/4everL_2514/main/font2.png"
        ]
    },
    "xiaohongshu": {
        title: "小红书自媒体运营",
        intro: "自媒体视觉风格孵化与跨平台内容运营实践。",
        type: "Social Media / Content Strategy",
        date: "Ongoing 2026",
        images: [
            // 这里以后可以换成你小红书的复盘图链接
            "https://raw.githubusercontent.com/tt52-hh/4everL_2514/main/font1.png" 
        ]
    },
    "ai-narrative": {
        title: "AI视觉叙事项目",
        intro: "基于人工智能的内容生成与概念视觉流。探索《影子不见的时候》等前沿抽象美学叙事。",
        type: "AI Generation / Visual Storyboard",
        date: "Completed in Mar 2026",
        images: [
            "https://raw.githubusercontent.com/tt52-hh/4everL_2514/main/font1.png"
        ]
    },
    "guansi-app": {
        title: "数字服务类APP '观寺' UI设计",
        intro: "传统文化可视化表达。针对寺庙数字化转型的传统美学移动端界面交互系统设计。",
        type: "UIUX Design / Cultural Visualization",
        date: "Completed in Apr 2026",
        images: [
            "https://raw.githubusercontent.com/tt52-hh/4everL_2514/main/font1.png"
        ]
    },
    "offline-design": {
        title: "线下视觉设计实践",
        intro: "实体空间与线下媒介的视觉传达落地演练。",
        type: "Graphic Design / Exhibition",
        date: "Created in Nov 2025",
        images: [
            "https://raw.githubusercontent.com/tt52-hh/4everL_2514/main/font2.png"
        ]
    }
};

// 2. 核心渲染核心：负责把数据塞进网页对应的盒子里
function renderProjectDetail(id) {
    const data = projectData[id];
    if (!data) return;

    // 填入文字
    document.getElementById("detailTitle").innerText = data.title;
    document.getElementById("detailIntro").innerText = data.intro;
    document.getElementById("detailType").innerText = data.type;
    document.getElementById("detailDate").innerText = data.date;

    // 渲染左侧图片流
    const imgBox = document.getElementById("detailImagesBox");
    imgBox.innerHTML = ""; // 先清空旧图
    data.images.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = data.title;
        imgBox.appendChild(img);
    });

    // 🌟 动态重构右侧侧边栏导航状态
    updateSidebarNav(id);

    // 优雅将滚动条抽回详情页最顶端，防止切歌时停在半路
    document.getElementById("projectDetailOverlay").scrollTop = 0;
}

// 🌟 核心新功能：动态刷新右侧导航的灰色激活状态
function updateSidebarNav(currentId) {
    const navItems = document.querySelectorAll(".detail-sidebar-item");
    navItems.forEach(item => {
        const projectId = item.getAttribute("data-project-id");
        if (projectId === currentId) {
            item.classList.add("current-active");
        } else {
            item.classList.remove("current-active");
        }
    });
}

// 3. 全局监听打开与关闭
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("projectDetailOverlay");
    const closeBtn = document.getElementById("closeDetailBtn");

    // 监听主页所有带 data-project-id 的作品链接
    document.querySelectorAll("[data-project-id]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.getAttribute("data-project-id");
            
            // 渲染数据并拉开幕布
            renderProjectDetail(id);
            overlay.style.display = "block";
            document.body.style.overflow = "hidden"; // 锁死底层主页滚动
        });
    });

    // 监听关闭按钮
    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.style.display = "none";
        document.body.style.overflow = ""; // 释放主页滚动
    });

    // 🌟 额外增加：点击顶部大标题「TT Portfolio」一键格式化重置回大主页
    const logoHomeBtn = document.getElementById("logoHomeBtn");
    if(logoHomeBtn) {
        logoHomeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            overlay.style.display = "none";
            document.body.style.overflow = "";
            window.scrollTo({ top: 0, behavior: 'smooth' }); // 顺滑滚回大主页最顶部
        });
    }
});
