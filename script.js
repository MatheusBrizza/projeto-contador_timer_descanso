document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const input = form.querySelector('input[type="text"]');
    const taskList = document.getElementById('task');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const value = input.value.trim();
        if (value) {
            const li = document.createElement('li');
            li.textContent = value;
            taskList.appendChild(li);
            input.value = '';
        }
    });
});