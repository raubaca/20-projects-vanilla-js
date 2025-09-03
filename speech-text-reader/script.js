const main = document.getElementById('main');
const textBox = document.getElementById('text-box');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
const synth = window.speechSynthesis;

let voices = [];

const populateVoiceList = () => {
  voices = synth.getVoices();

  for (const voice of voices) {
    const option = document.createElement('option');
    option.textContent = `${voice.name} ${voice.lang}`;

    if (voice.default) {
      option.textContent += ' - DEFAULT';
    }

    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  }
};

populateVoiceList();

// Message
const message = new SpeechSynthesisUtterance();

const setTextMessage = (text) => (message.text = text);

const speakText = () => synth.speak(message);

const setVoice = (e) => {
  const selectedOption = e.target.selectedOptions[0].getAttribute('data-name');
  message.voice = voices.find((voice) => voice.name === selectedOption);
};

// Create boxes
const createBox = (item, i) => {
  const { image, text } = item;

  const box = document.createElement('div');
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}">
    <p class="info">${text}</p> 
  `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
};

const readMessage = () => {
  if (textarea.value.trim() === '') return;
  setTextMessage(textarea.value);
  speakText();
};

data.forEach(createBox);

synth.addEventListener('voiceschanged', populateVoiceList);

toggleBtn.addEventListener('click', () => textBox.classList.add('show'));
closeBtn.addEventListener('click', () => textBox.classList.remove('show'));
readBtn.addEventListener('click', readMessage);
voiceSelect.addEventListener('change', setVoice);
