const enter = document.querySelector('.text-input');
const btn = document.querySelector('.add');
const ul = document.querySelector('.list');
const voidTxt = document.querySelector('.void');

function saveTodo(){
    const todos = [];
    const listItems = ul.querySelectorAll('.list-block');

    listItems.forEach(item => {
        const text = item.querySelector('.list-text').textContent;
        const isCompleted = item.classList.contains('complete-list');
        todos.push({text, isCompleted});
    });

    localStorage.setItem('todos', JSON.stringify(todos));
};

function loadTodo() {
    const savedTodos = localStorage.getItem('todos');

    if(savedTodos){
        const todos = JSON.parse(savedTodos);

        todos.forEach(todos => {
            createTodoElement(todos.text, todos.isCompleted);
        });
    }
};

function createTodoElement(text, isCompleted = false){
    const li = document.createElement('li');
    li.classList.add('list-block');

    if(isCompleted){
        li.classList.add('complete-list');
    }

    const liTxt = document.createElement('p');
    liTxt.classList.add('list-text');
    liTxt.textContent = text;

    const btnBlock = document.createElement('div');
    btnBlock.classList.add('butt-block');

    const cplBtn = document.createElement('button');
    cplBtn.classList.add('complete');   
    cplBtn.textContent = '☑︎';
    cplBtn.addEventListener('click', () => {
        li.classList.toggle('complete-list');
        saveTodo();
        listCheck();
    })

    const delBtn = document.createElement('button');
    delBtn.classList.add('del');
    delBtn.textContent = '✖︎';
    delBtn.addEventListener('click', () => {
        ul.removeChild(li);
        saveTodo();
        listCheck();
    });

    ul.appendChild(li);
    li.appendChild(liTxt);
    li.appendChild(btnBlock);
    btnBlock.appendChild(cplBtn);
    btnBlock.appendChild(delBtn);
}

function delAll(){
  ul.innerHTML = '';
  localStorage.removeItem('todos');
  listCheck();
}

function listCheck(){
  voidTxt.style.display = ul.children.length === 0 ? 'inline' : 'none';
};

loadTodo();
listCheck();

// LIST ADD EVENT

btn.addEventListener('click', () => {
  
  if(!enter.value.trim()) return;
  
  createTodoElement(enter.value);
  saveTodo();
  listCheck();
  
  enter.value = '';
});

enter.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      btn.click();
    }
});

const clearBtn = document.querySelector('.clear-all');
if (clearBtn) {
  clearBtn.addEventListener('click', delAll);
}

// FILTER

const filterButtons = document.querySelectorAll('[data-filter]');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        filterButtons.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');

        const filter = btn.dataset.filter;
        const listItems = document.querySelectorAll('.list-block');

        listItems.forEach(item => {
            const isCompleted = item.classList.contains('complete-list');

            if(filter === 'all'){
                item.style.display = '';
            } else if(filter === 'active'){
                item.style.display = isCompleted ? 'none' : '';
            } else if(filter === 'completed'){
                item.style.display = isCompleted ? '' : 'none';
            };
        });
    });
});

function changeColor(){
    document.body.classList.toggle('theme-dark');
    saveTodo();
}