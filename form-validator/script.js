const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, msg) => {
  input.parentElement.classList.add('error');
  input.nextElementSibling.textContent = msg;
};

const showSuccess = (input) => {
  input.parentElement.classList.remove('error');
  input.parentElement.classList.add('success');
};

const checkRequired = (inputs) =>
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.trim().length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkEmail = (email) => {
  if (validateEmail(email.value)) {
    showSuccess(email);
  } else {
    showError(email, 'Email is not valid');
  }
};

const checkPasswordsMatch = (password1, password2) => {
  if (password1.value !== password2.value) {
    showError(password2, "Passwords don't match");
  }
};

const getFieldName = (input) =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
