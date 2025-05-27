document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const inputTask = form.querySelector('input[type="text"]');
    const inputTime = form.querySelector('input[type="number"]');
    const taskList = document.getElementById('task');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = inputTask.value.trim();
        const valueTime = inputTime.value;
        if (taskName && valueTime > 0 && !isNaN(valueTime)) {
            const task = document.createElement('li');
            task.textContent = `${taskName} - ${valueTime} minutes`;
            taskList.appendChild(task);
            inputTask.value = '';
            inputTime.value = '';

            // Get current hours, minutes, and seconds
            // Example: Get elements by ID within a specific class container
            const timerEstudoContainer = document.querySelector('.timer-estudo'); // Replace with your class name

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

            // Helper function to pad numbers with leading zeros
            // This ensures that time values like hours, minutes, and seconds are always displayed as two digits (e.g., "01", "09").
            function pad(num) {
                return num.toString().padStart(2, '0');
            }

            let hours = parseInt(hoursElem.textContent, 10) || 0;
            let minutes = parseInt(minutesElem.textContent, 10) || 0;
            let seconds = parseInt(secondsElem.textContent, 10) || 0;

            // Add the new task time (in minutes)
            minutes += parseInt(valueTime, 10);

            // Convert minutes to hours if over 60
            if (minutes >= 60) {
                hours += Math.floor(minutes / 60);
                minutes = minutes % 60;
            }
            // Update the DOM with padded values
            hoursElem.textContent = pad(hours);
            minutesElem.textContent = pad(minutes);
            secondsElem.textContent = pad(seconds);

            // Get the current study time from .timer-estudo in hours, minutes, and seconds
            const totalEstudoSeconds =
                (parseInt(hoursElem.textContent, 10) || 0) * 3600 +
                (parseInt(minutesElem.textContent, 10) || 0) * 60 +
                (parseInt(secondsElem.textContent, 10) || 0);

            // Divide by 2 for diversão (in seconds)
            let totalDiversaoSeconds = Math.floor(totalEstudoSeconds / 2);

            // Convert back to hours, minutes, seconds
            let diversaoHours = Math.floor(totalDiversaoSeconds / 3600);
            let diversaoMinutes = Math.floor((totalDiversaoSeconds % 3600) / 60);
            let diversaoSeconds = totalDiversaoSeconds % 60;

            const timerDiversaoContainer = document.querySelector('.timer-diversao');
            if (timerDiversaoContainer) {
                const diversaoHoursElem = timerDiversaoContainer.querySelector('.diversao-hours');
                const diversaoMinutesElem = timerDiversaoContainer.querySelector('.diversao-minutes');
                const diversaoSecondsElem = timerDiversaoContainer.querySelector('.diversao-seconds');
                if (diversaoHoursElem && diversaoMinutesElem && diversaoSecondsElem) {
                    diversaoHoursElem.textContent = pad(diversaoHours);
                    diversaoMinutesElem.textContent = pad(diversaoMinutes);
                    diversaoSecondsElem.textContent = pad(diversaoSeconds);
                }
            }

        } else {
            alert('Please enter a valid task name and time in minutes.');
        }
    });
});