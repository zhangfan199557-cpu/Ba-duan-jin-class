let currentPage = 1;
const totalPages = 11; 

function updateUI() {
    document.getElementById('page-counter').innerText = `Page ${currentPage} / ${totalPages}`;
    document.getElementById('progress').style.width = `${(currentPage / totalPages) * 100}%`;
    
    const backBtn = document.getElementById('btn-back');
    const nextBtn = document.getElementById('btn-next');

    // 封面页特殊逻辑
    if (currentPage === 1) {
        backBtn.style.visibility = 'hidden';
        nextBtn.style.display = 'none'; 
    } else {
        backBtn.style.visibility = 'visible';
        nextBtn.style.display = 'block';
        
        // 预备式没有题，直接放行
        if (currentPage === 2) {
            enableNext();
        } else {
            // 其他页面进来先锁死，等答对题
            disableNext();
        }
    }

    if (currentPage === totalPages) {
        nextBtn.innerText = "Finish Lesson";
    } else {
        nextBtn.innerText = "Next Page";
    }
}

function disableNext() {
    const btn = document.getElementById('btn-next');
    btn.disabled = true;
    btn.style.opacity = "0.3";
    btn.style.cursor = "not-allowed";
}

function enableNext() {
    const btn = document.getElementById('btn-next');
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
}

function goNext() {
    if (currentPage < totalPages) {
        // 正常往后翻页
        document.getElementById(`page-${currentPage}`).classList.remove('active');
        currentPage++;
        document.getElementById(`page-${currentPage}`).classList.add('active');
        updateUI();
        window.scrollTo(0, 0);
    } else if (currentPage === totalPages) {
        // 🚨 这里是新加的终极闭环逻辑！🚨
        // 当在最后一页点击 "Finish Lesson" 时：
        alert("🌟 Congratulations! You have successfully completed the Ba Duan Jin Masterclass! 🌟");
        
        // 弹窗结束后，自动回到第一页（封面）
        document.getElementById(`page-${currentPage}`).classList.remove('active');
        currentPage = 1;
        document.getElementById(`page-1`).classList.add('active');
        updateUI();
        window.scrollTo(0, 0);
    }
}

function goBack() {
    if (currentPage > 1) {
        document.getElementById(`page-${currentPage}`).classList.remove('active');
        currentPage--;
        document.getElementById(`page-${currentPage}`).classList.add('active');
        updateUI();
        window.scrollTo(0, 0);
    }
}

// 加强版答题逻辑：带星星和反馈
function checkAnswer(btn, isCorrect, feedbackMessage) {
    const feedbackText = btn.parentElement.nextElementSibling;
    feedbackText.style.display = "block";

    if (isCorrect) {
        btn.classList.add('correct');
        // 插入星星动画和正确提示
        feedbackText.innerHTML = `<span class="badge-star">🌟</span> <b>Excellent!</b> <br> ${feedbackMessage}`;
        feedbackText.style.color = "#4a755e";
        enableNext();
    } else {
        btn.classList.add('wrong');
        // 幽默/鼓励提示
        feedbackText.innerHTML = `❌ <b>Almost there!</b> <br> ${feedbackMessage}`;
        feedbackText.style.color = "#8a2522";
        // 给学生1.5秒阅读时间，然后恢复按钮颜色，允许重新尝试
        setTimeout(() => btn.classList.remove('wrong'), 1500);
    }
}

const breathText = document.getElementById('breath-text');
setInterval(() => {
    if(breathText) {
        if (breathText.innerText.includes("Inhale")) {
            breathText.innerText = "Exhale (Relax)";
        } else {
            breathText.innerText = "Inhale (Push Up)";
        }
    }
}, 4000);

window.onload = () => updateUI();