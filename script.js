document.addEventListener('DOMContentLoaded', () => {
    // Element selectors
    const form = document.querySelector('form');
    const inputTask = form.querySelector('input[type="text"]');
    const inputTime = form.querySelector('input[type="number"]');
    const taskList = document.getElementById('task');
    const timerEstudoContainer = document.querySelector('.timer-estudo');
    const timerDiversaoContainer = document.querySelector('.timer-diversao');
    const timerContainer = document.querySelector('.timer');
    const startBtn = document.getElementById('start');

    // Timer state
    let countdownInterval = null;
    let isCountingDown = false;

    // Utility: pad number with leading zero
    const pad = num => num.toString().padStart(2, '0');

    // Utility: get timer values in seconds
    function getTimerSeconds() {
        const h = parseInt(timerContainer.querySelector('.timer-hours').textContent, 10) || 0;
        const m = parseInt(timerContainer.querySelector('.timer-minutes').textContent, 10) || 0;
        const s = parseInt(timerContainer.querySelector('.timer-seconds').textContent, 10) || 0;
        return h * 3600 + m * 60 + s;
    }

    // Utility: set timer display from seconds
    function setTimerFromSeconds(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        timerContainer.querySelector('.timer-hours').textContent = pad(hours);
        timerContainer.querySelector('.timer-minutes').textContent = pad(minutes);
        timerContainer.querySelector('.timer-seconds').textContent = pad(seconds);
    }

    // Update study and fun timers
    function updateTimers(addedMinutes) {
        if (!timerEstudoContainer) {
            alert('Elemento .timer-estudo não encontrado no HTML.');
            return;
        }
        const hoursElem = timerEstudoContainer.querySelector('#hours');
        const minutesElem = timerEstudoContainer.querySelector('#minutes');
        const secondsElem = timerEstudoContainer.querySelector('#seconds');
        if (!hoursElem || !minutesElem || !secondsElem) {
            alert('Elementos de horas, minutos ou segundos não encontrados dentro de .timer-estudo.');
            return;
        }

        let hours = parseInt(hoursElem.textContent, 10) || 0;
        let minutes = parseInt(minutesElem.textContent, 10) || 0;
        let seconds = parseInt(secondsElem.textContent, 10) || 0;

        minutes += addedMinutes;
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;

        hoursElem.textContent = pad(hours);
        minutesElem.textContent = pad(minutes);
        secondsElem.textContent = pad(seconds);

        const totalEstudoSeconds = hours * 3600 + minutes * 60 + seconds;
        const totalDiversaoSeconds = Math.floor(totalEstudoSeconds / 2);

        if (timerDiversaoContainer) {
            const dh = timerDiversaoContainer.querySelector('.diversao-hours');
            const dm = timerDiversaoContainer.querySelector('.diversao-minutes');
            const ds = timerDiversaoContainer.querySelector('.diversao-seconds');
            if (dh && dm && ds) {
                const dHours = Math.floor(totalDiversaoSeconds / 3600);
                const dMinutes = Math.floor((totalDiversaoSeconds % 3600) / 60);
                const dSeconds = totalDiversaoSeconds % 60;
                dh.textContent = pad(dHours);
                dm.textContent = pad(dMinutes);
                ds.textContent = pad(dSeconds);
            }
        }

        // Update main timer
        if (timerContainer) {
            const dHours = Math.floor(totalDiversaoSeconds / 3600);
            const dMinutes = Math.floor((totalDiversaoSeconds % 3600) / 60);
            const dSeconds = totalDiversaoSeconds % 60;
            if (isCountingDown) {
                const currentSeconds = getTimerSeconds();
                const addedSeconds = Math.floor(addedMinutes * 60 / 2);
                setTimerFromSeconds(currentSeconds + addedSeconds);
            } else {
                timerContainer.querySelector('.timer-hours').textContent = pad(dHours);
                timerContainer.querySelector('.timer-minutes').textContent = pad(dMinutes);
                timerContainer.querySelector('.timer-seconds').textContent = pad(dSeconds);
            }
        }
    }

    // Countdown logic
    function startCountdown() {
        if (countdownInterval) return;
        isCountingDown = true;
        startBtn.textContent = 'Pause';
        countdownInterval = setInterval(() => {
            let totalSeconds = getTimerSeconds();
            if (totalSeconds > 0) {
                setTimerFromSeconds(--totalSeconds);
            } else {
                clearInterval(countdownInterval);
                countdownInterval = null;
                isCountingDown = false;
                startBtn.textContent = 'Start';
            }
        }, 1000);
    }

    function stopCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        isCountingDown = false;
        startBtn.textContent = 'Start';
    }

    // Form submit handler
    form.addEventListener('submit', e => {
        e.preventDefault();
        const taskName = inputTask.value.trim();
        const valueTime = parseInt(inputTime.value, 10);

        if (taskName && valueTime > 0) {
            // Add task to list
            const task = document.createElement('li');
            task.textContent = `${taskName} - ${valueTime} minutes`;
            taskList.appendChild(task);

            updateTimers(valueTime);

            inputTask.value = '';
            inputTime.value = '';
        } else {
            alert('Please enter a valid task name and time in minutes.');
        }
    });

    // Start/Pause button handler (optional, if you want to control the timer)
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (isCountingDown) {
                stopCountdown();
            } else {
                startCountdown();
            }
        });
    }
});
