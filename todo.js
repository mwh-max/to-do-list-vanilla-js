const input = document.querySelector('#todo-input');
const button = document.querySelector('#add-btn');
const list = document.querySelector('#todo-list');
const clear = document.querySelector('#clear-btn');
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        button.click();
    }
})

const prompts = ["What's your main goal today?",
                "Add your top priority ...",
                "Need to remember something?",
                "Write a quick task here!",
                "Anything you forgot to do?"
];

const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
input.placeholder = randomPrompt;

let taskCount = 0;
let tasks = [];
let lastDeletedTask = null;
let lastTaskTime = Date.now();

function addTask(value, taskFromStorage = null) {
    if (value.trim() === '') return;
    lastTaskTime = Date.now();

let taskObj;

if (taskFromStorage) {
  taskObj = taskFromStorage;
  if (taskObj.id > taskCount) {
    taskCount = taskObj.id;
  }
} else {
  taskCount++;
  const displayText = value.trim();
  taskObj = {
    id: taskCount,
    text: displayText,
    done: false,
  };
  tasks.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  
    input.value = '';
    input.placeholder = `Last added: ${taskObj.text}`;
    console.log(`You have added ${taskCount} items to the list.`);
} 

function makeTaskSpan(text, taskObj) {
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    span.addEventListener('click', () => {
        if (span.classList.contains('done')) return;

        const originalText = span.textContent.trim();
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;

        span.replaceWith(input);
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const newText = input.value.trim();
                const newSpan = makeTaskSpan(newText, taskObj);
                taskObj.text = newText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                input.replaceWith(newSpan);

                newSpan.classList.add('edited');
                setTimeout(() => {
                    newSpan.classList.add('edited');
                }, 600);
            } else if (e.key === 'Escape') {
                const restoredSpan = makeTaskSpan(originalText, taskObj);
                input.replaceWith(restoredSpan);
            }
        });
    });
        return span;
}


    const taskSpan = makeTaskSpan(taskObj.text, taskObj);
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', `Delete Task ${taskObj.id}`);
    deleteBtn.textContent = '❌';

    const li = document.createElement('li');
    li.append(`Item #${taskObj.id}: `, taskSpan, deleteBtn);

        if (taskObj.done) {
        taskSpan.classList.add('done');
    }

    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();

        lastDeletedTask = taskObj;
        tasks = tasks.filter(t => t.id !== taskObj.id);  
        localStorage.setItem('tasks', JSON.stringify(tasks))
        
        showUndoOption();
        updateCompletedBanner();
        });
    
    li.addEventListener('click', () => {
        taskSpan.classList.toggle('done');
        taskObj.done = taskSpan.classList.contains('done');
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    list.appendChild(li);

    updateCompletedBanner();
}

button.addEventListener('click', () => {
    addTask(input.value);
});

clear.addEventListener('click', () => {
    taskCount = 0;
    tasks = [];
    list.innerHTML = '';
    localStorage.removeItem('tasks');

    document.getElementById('undo-zone').innerHTML = '';
    document.getElementById('reminder-zone').textContent = '';
    document.getElementById('completion-banner').textContent = '';
});

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('tasks');

    if (saved) {
        tasks = JSON.parse(saved);
        tasks.forEach(task => {
            addTask(null, task);
        });
    }
});

input.addEventListener('focus', () => {
    const newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    input.placeholder = newPrompt;
});

function showUndoOption() {
    const undoZone = document.getElementById('undo-zone');
    undoZone.innerHTML = '';

    const undoBtn = document.createElement('button');
    undoBtn.textContent = 'Undo Delete';

    undoBtn.addEventListener('click', () => {
        if (lastDeletedTask) {
            addTask(lastDeletedTask.text, lastDeletedTask);
            lastDeletedTask = null;
            undoZone.innerHTML = '';
        }
    });

    undoZone.appendChild(undoBtn);

    setTimeout(() => {
        undoZone.innerHTML = '';
        lastDeletedTask = null;
    }, 8000);
}

setInterval(() => {
    const now = Date.now();
    const secondsSinceLast = Math.floor((now - lastTaskTime) / 1000);

    const  reminderZone = document.getElementById('reminder-zone');

    if (secondsSinceLast >= 30) {
        reminderZone.textContent = "Still there? Add something you meant to do.";
    } else {
        reminderZone.textContent = "";
    }
}, 5000);

function updateCompletedBanner() {
    const banner = document.getElementById('completion-banner');
    const done = tasks.filter(t => t.done).length;
    const total = tasks.length;

    if (total > 0) {
        banner.textContent = `You've completed ${done} out of ${total} tasks.`;
    } else {
        banner.textContent = '';
    }
}