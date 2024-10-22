
let cronometroInterval;
let startTime;
let running = false;

document.getElementById("select-cronometro").addEventListener("click", () => {
    document.getElementById("cronometro-container").classList.remove("hidden");
    document.getElementById("temporizador-container").classList.add("hidden");
});

document.getElementById("select-temporizador").addEventListener("click", () => {
    document.getElementById("temporizador-container").classList.remove("hidden");
    document.getElementById("cronometro-container").classList.add("hidden");
});

// Cronometro functionality
document.getElementById("cronometro-start").addEventListener("click", () => {
    if (!running) {
        startTime = Date.now();
        cronometroInterval = setInterval(updateCronometro, 10);
        running = true;
        document.getElementById("cronometro-start").textContent = "Stop";
    } else {
        clearInterval(cronometroInterval);
        running = false;
        document.getElementById("cronometro-start").textContent = "Start";
    }
});

document.getElementById("cronometro-clear").addEventListener("click", () => {
    clearInterval(cronometroInterval);
    document.getElementById("cronometro-display").textContent = "00:00:00:000";
    running = false;
    document.getElementById("cronometro-start").textContent = "Start";
});

function updateCronometro() {
    const elapsedTime = Date.now() - startTime;
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 60000) % 60;
    const hours = Math.floor(elapsedTime / 3600000);
    
    document.getElementById("cronometro-display").textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

// Temporizador functionality
let temporizadorInterval;
document.getElementById("temporizador-start").addEventListener("click", () => {
    const inputSeconds = document.getElementById("temporizador-input").value;
    let countdownTime = inputSeconds * 1000;  // Convert to milliseconds
    if (temporizadorInterval) clearInterval(temporizadorInterval);
    
    temporizadorInterval = setInterval(() => {
        if (countdownTime <= 0) {
            clearInterval(temporizadorInterval);
            document.getElementById("temporizador-display").textContent = "00:00:00";
            alert("Time's up!");
        } else {
            countdownTime -= 1000;
            const seconds = Math.floor(countdownTime / 1000) % 60;
            const minutes = Math.floor(countdownTime / 60000) % 60;
            const hours = Math.floor(countdownTime / 3600000);
            
            document.getElementById("temporizador-display").textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
});

document.getElementById("temporizador-clear").addEventListener("click", () => {
    clearInterval(temporizadorInterval);
    document.getElementById("temporizador-display").textContent = "00:00:00";
});
