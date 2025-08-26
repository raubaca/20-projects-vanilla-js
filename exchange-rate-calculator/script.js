const API_URL = 'https://open.exchangerate-api.com/v6/latest';

const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const swapBtn = document.getElementById('swap');
const rateContainer = document.getElementById('rate');

let rates = {};

const getRates = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    rates = data.rates;
    calculate();
  } catch (error) {
    console.log(error);
  }
};

getRates();

const calculate = () => {
  const currency1 = currencyOne.value;
  const currency2 = currencyTwo.value;
  const rate = rates[currency2] / rates[currency1];

  rateContainer.textContent = `1 ${currency1} = ${rate.toFixed(
    6
  )} ${currency2}`;
  amountTwo.value = (amountOne.value * rate).toFixed(2);
};

const swapCurrency = () => {
  [currencyOne.value, currencyTwo.value] = [
    currencyTwo.value,
    currencyOne.value,
  ];
  amountOne.value = amountTwo.value;
  calculate();
};

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swapCurrency);
