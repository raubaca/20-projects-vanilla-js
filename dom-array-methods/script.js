const pushBtn = document.getElementById('push');
const mapBtn = document.getElementById('map');
const filterBtn = document.getElementById('filter');
const sortBtn = document.getElementById('sort');
const reduceBtn = document.getElementById('reduce');

const list = document.getElementById('list');

let users = [];

const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addUser(newUser);
};

// .push()
const addUser = (user) => {
  users.push(user);
  updateDOM();
};

// .map()
const doubleMoney = () => {
  users = users.map((user) => ({
    ...user,
    money: user.money * 2,
  }));
  updateDOM();
};

// .filter()
const showOnlyMillionaries = () => {
  users = users.filter((user) => user.money > 999999);
  updateDOM();
};

// .sort()
const sortByRichest = () => {
  users.sort((a, b) => b.money - a.money);
  updateDOM();
};

// .reduce()
const calculateWealth = () => {
  const total = users.reduce((acc, curr) => acc + curr.money, 0);
  let li = document.querySelector('.total') || null;
  if (li !== null) {
    return;
  }
  li = document.createElement('li');
  li.classList.add('total');
  li.innerHTML = `<strong>Total</strong> $${formatMoney(total)}`;
  list.appendChild(li);
};

const updateDOM = (providedData = users) => {
  let html = '';
  providedData.forEach((item) => {
    html += `<li><strong>${item.name}</strong> $${formatMoney(
      item.money
    )}</li>`;
  });
  list.innerHTML = html;
};

// https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/
const currency = Intl.NumberFormat('en-US');
const formatMoney = currency.format;

pushBtn.addEventListener('click', getRandomUser);
mapBtn.addEventListener('click', doubleMoney);
filterBtn.addEventListener('click', showOnlyMillionaries);
sortBtn.addEventListener('click', sortByRichest);
reduceBtn.addEventListener('click', calculateWealth);
