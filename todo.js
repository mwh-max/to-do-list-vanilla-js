
const input = document.querySelector('#todo-input');
const button = document.querySelector('#add-btn');
const list = document.querySelector('#todo-list');
const clear = document.querySelector('#clear-btn');
let taskCount = 0;

function addTask(value) {
    if (value.trim() === '') return;

    taskCount++;
    const displayText = value.trim();
    const li = document.createElement('li');
    li.innerHTML = `Item #${taskCount}: <span class="task-text">${displayText}</span> <button class="delete-btn">X</button>`;

    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });

    const taskSpan = li.querySelector('.task-text');

    taskSpan.addEventListener('click', () => {
        if (taskSpan.classList.contains('done')) return;

        const originalText = taskSpan.textContent.trim();
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        input.size = originalText.length + 5;
        
        taskSpan.replaceWith(input);
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const newText = input.value.trim();
                taskSpan.textContent = newText;
                input.replaceWith(taskSpan);
            }
        });
    });

    li.addEventListener('click', () => {
        taskSpan.classList.toggle('done');
    });

    list.appendChild(li);
    input.value = '';
    input.placeholder = `Last added: ${displayText}`;
    console.log(`You have added ${taskCount} items to the list.`);
}

button.addEventListener('click', () => {
    addTask(input.value);
});

clear.addEventListener('click', () => {
    taskCount = 0;
    list.innerHTML = '';
});