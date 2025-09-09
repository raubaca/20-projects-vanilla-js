const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];

let dragStartIndex;

// Randomize list
const createList = () => {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
};

// Drag events
const dragStart = (e) =>
  (dragStartIndex = +e.currentTarget.closest('li').getAttribute('data-index'));

const dragEnter = (e) => e.currentTarget.classList.add('over');

const dragLeave = (e) => e.currentTarget.classList.remove('over');

const dragOver = (e) => e.preventDefault();

const dragDrop = (e) => {
  const dragEndIndex = +e.currentTarget.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  e.currentTarget.classList.remove('over');
};

// Swap persons in drop event
const swapItems = (fromIndex, toIndex) => {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

// Check list's order
const checkOrder = () =>
  listItems.forEach((item, i) => {
    const personName = item.querySelector('.person-name').textContent.trim();
    if (personName !== richestPeople[i]) {
      item.classList.add('wrong');
    } else {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  });

const addEventListeners = () => {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = draggableList.querySelectorAll('li');

  draggables.forEach((draggable) =>
    draggable.addEventListener('dragstart', dragStart)
  );

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
};

checkBtn.addEventListener('click', checkOrder);

createList();
addEventListeners();
