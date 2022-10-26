function loadData() {
    return fetch('./db.json')
        .then(response => response.json())
}

document.addEventListener('focus', e => console.log(e.target))

const formEl = document.forms.createForm;
formEl.elements.createBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let todoItem = {};
    todoItem.id = String(random(1000, 100000)) ;
    todoItem.title = formEl.elements.title.value;
    todoItem.description = formEl.elements.desc.value;
    todoItem.status = formEl.elements.status.value;
    todoItem.priority = formEl.elements.priority.value;

    const parent = document.querySelector('#cards')
    renderCard(todoItem, parent)

    const data = JSON.parse(localStorage.getItem('data'))
    data.push(todoItem);

    localStorage.setItem('data', JSON.stringify(data))
})

const cards = document.querySelector('#cards')

const addCardBtn = document.querySelector('.new-card');
addCardBtn.addEventListener('click', () => {
    addCardBtn.focused = false;
    formEl.classList.toggle('visible');
    let btnText = addCardBtn.textContent;
    btnText === 'Add new card' ? addCardBtn.textContent = 'Hide Form' : addCardBtn.textContent = 'Add new card'
})


cards.addEventListener('click', e => {
    if (e.target.className === 'close-btn') onCloseBtn();
    if (e.target.className === 'title' || e.target.className === 'description') onTextEdit();
})

cards.addEventListener('change', e => {
    if (e.target.className === 'priority-select') onPriorityChange;
    if (e.target.className === 'select-status') onStatusChange;
})

cards.addEventListener('focusout',  onTextSave)


if (!localStorage.getItem('data')) {
    loadData().then(response => {
        localStorage.setItem('data', JSON.stringify(response));
        renderAllCards(response)
        })
} else {
    const data = JSON.parse(localStorage.getItem('data'))
    renderAllCards(data)
}


function renderAllCards(todoItems) {
    const parent = document.getElementById('cards');
    for (const todoItem of todoItems) {
        renderCard(todoItem, parent)
    }
}

function renderCard(todoItem, parent) {

    const newCard = document.createElement('div');
    newCard.id = todoItem.id;
    newCard.classList.add('card')

    const cardHTMLTemplate = `
    <div class="title" tabindex="0">${todoItem.title}</div>
    <div class="buttons">
        <button class="close-btn">X</button>
    </div>
    <div class="priority">
        <select class = 'priority-select'>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
        </select>
    </div>
    <div class="status">
        <select class="select-status">
            <option value='Todo'>Todo</option>
            <option value='In progress'>In progress</option>
            <option value='Done'>Done</option>
        </select>
    </div>
    <div class="description" tabindex="0" >${todoItem.description}</div>
    `;

    newCard.innerHTML = cardHTMLTemplate;
    parent.append(newCard);
    newCard.querySelector('.select-status').value = todoItem.status;
    newCard.querySelector('.priority-select').value = todoItem.priority;
}

function onTextSave(e) {
    const data = JSON.parse(localStorage.getItem('data'))
    e.target.classList.remove('text-active');
    clickedCard = e.target.closest('.card')
    data.forEach(item => {
        if (clickedCard.id == item.id && e.target.className == 'title') {
            item.title = e.target.textContent;
        } 
        if (clickedCard.id == item.id && e.target.className == 'description') {
            item.description = e.target.textContent;
        } 
        localStorage.setItem('data', JSON.stringify(data))
    })
}

function onTextEdit() {
    const e = event;
    e.target.contentEditable = true;
    e.target.classList.add('text-active');
}

function onStatusChange() {
    const data = JSON.parse(localStorage.getItem('data'))
    data.forEach(todoItem => {
        const clickedCard = event.target.closest('.card');
        if (clickedCard.id === todoItem.id) todoItem.status = event.target.value;
    })
    localStorage.setItem('data', JSON.stringify(data))
}

function onPriorityChange() {
    const data = JSON.parse(localStorage.getItem('data'))
    data.forEach(todoItem => {
        const clickedCard = event.target.closest('.card');
        if (clickedCard.id === todoItem.id) todoItem.priority = event.target.value;
    })
    localStorage.setItem('data', JSON.stringify(data))
}

function onCloseBtn() {
    const data = JSON.parse(localStorage.getItem('data')) 
    const clickedCard = event.target.closest('.card')
    let newData = data.filter(item => item.id !== clickedCard.id);
    clickedCard.remove()
    newData.length === 0 ? localStorage.clear() : localStorage.setItem('data', JSON.stringify(newData) )
}