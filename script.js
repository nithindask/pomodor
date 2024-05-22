let timer;
let timeLeft = 1500; // 25 minutes
let isRunning = false;
let swipeStartY = 0;

function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('play-icon').style.display = 'inline';
        document.getElementById('pause-icon').style.display = 'none';
    } else {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        document.getElementById('play-icon').style.display = 'none';
        document.getElementById('pause-icon').style.display = 'inline';
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        displayTime();
    } else {
        clearInterval(timer);
        timeLeft = 300; // 5 minutes
        displayTime();
        setTimeout(startShortBreak, 1000); // Start the 5-minute break
    }
}

function startShortBreak() {
    timer = setInterval(updateShortBreak, 1000);
}

function updateShortBreak() {
    if (timeLeft > 0) {
        timeLeft--;
        displayTime();
    } else {
        clearInterval(timer);
        timeLeft = 1500; // Reset to 25 minutes for the next session
        displayTime();
        toggleTimer(); // Start the next session
    }
}

function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function closeHelp() {
    document.getElementById('help-box').style.display = 'none';
}

document.addEventListener('fullscreenchange', function(event) {
    if (!document.fullscreenElement) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('play-icon').style.display = 'inline';
        document.getElementById('pause-icon').style.display = 'none';
    }
});

document.addEventListener('keydown', function(event) {
    if (isRunning) {
        if (event.key === "ArrowUp") {
            timeLeft += 60;
            displayTime();
        } else if (event.key === "ArrowDown") {
            clearInterval(timer);
            isRunning = false;
            timeLeft = 1500; // Reset to 25 minutes
            displayTime();
            document.getElementById('play-icon').style.display = 'inline'; // Show play icon
            document.getElementById('pause-icon').style.display = 'none'; // Hide pause icon
        }
    }
});

document.addEventListener('touchstart', function(event) {
    swipeStartY = event.touches[0].clientY;
}, false);

document.addEventListener('touchend', function(event) {
    let swipeEndY = event.changedTouches[0].clientY;
    let swipeYDiff = swipeEndY - swipeStartY;

    if (swipeYDiff > 50) { // Swiped down
        clearInterval(timer);
        isRunning = false;
        timeLeft = 1500; // Reset to 25 minutes
        displayTime();
        document.getElementById('play-icon').style.display = 'inline'; // Show play icon
        document.getElementById('pause-icon').style.display = 'none'; // Hide pause icon
    } else if (swipeYDiff < -50) { // Swiped up
        timeLeft += 60; // Add one minute
        displayTime();
    }
}, false);

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Update theme toggle button icon
    const themeToggle = document.querySelector('.theme-toggle');
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
    }
}
