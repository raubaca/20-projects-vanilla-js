const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
      id: self.crypto.randomUUID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    e.target.reset();
  }
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
const currency = Intl.NumberFormat('en-US').format;

const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text} <span>${sign}${currency(
    Math.abs(transaction.amount)
  )}</span><button class="delete-btn" onclick="removeTransactionById('${
    transaction.id
  }')">&times;</button>`;
  list.appendChild(item);
};

const removeTransactionById = (id) => {
  transactions = transactions.filter((t) => t.id != id);
  updateLocalStorage();
  init();
};

const updateValues = () => {
  const amounts = transactions.map((t) => t.amount);
  const income = amounts.filter((a) => a > 0).reduce((a, c) => (a += c), 0);
  const expense =
    amounts.filter((a) => a < 0).reduce((a, c) => (a += c), 0) * -1;

  balance.textContent = `$${currency(income - expense)}`;
  moneyPlus.textContent = `$${currency(income)}`;
  moneyMinus.textContent = `$${currency(expense)}`;
};

const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

form.addEventListener('submit', addTransaction);

const updateLocalStorage = () =>
  localStorage.setItem('transactions', JSON.stringify(transactions));
