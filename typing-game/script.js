const word = document.getElementById('word');
const textInput = document.getElementById('text');

const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const endGameEl = document.getElementById('end-game');

const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultyEl = document.getElementById('difficulty');

const WORDS = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let randomWord;
let score = 0;
let time = 10;

let difficulty = localStorage.getItem('difficulty') ?? 'medium';
difficultyEl.value = difficulty;

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.textContent = randomWord;
};

const updateScore = () => {
  score++;
  scoreEl.textContent = score;
};

const updateTime = () => {
  time--;
  timeEl.textContent = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

const timeInterval = setInterval(updateTime, 1000);

const gameOver = () => {
  endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endGameEl.style.display = 'flex';
};

textInput.addEventListener('input', (e) => {
  const { value } = e.target;

  if (value === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';

    time += difficulty === 'hard' ? 2 : difficulty === 'medium' ? 3 : 5;

    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  location.reload();
});

addWordToDOM();
textInput.focus();
