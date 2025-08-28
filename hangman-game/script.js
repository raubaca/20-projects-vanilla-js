const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playBtn = document.getElementById('play-button')
const popup = document.getElementById('popup')
const notification = document.getElementById('notification')
const finalMessage = document.getElementById('final-message')
const revealWord = document.getElementById('reveal-word')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard']
let selectedWord = words[Math.floor(Math.random() * words.length)]

let isActive = true

const correctLetters = []
const wrongLetters = []
const messages = {
  win: 'Congratulations! You won! 😃',
  lose: 'You Lost! 😢',
}

const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ''
          }</span>`
      )
      .join('')}
  `

  const innerWord = wordEl.innerText.replace(/\n/g, '')

  if (innerWord === selectedWord) showPopup(messages.win)
}

const showNotification = () => {
  notification.classList.add('show')
  setTimeout(() => notification.classList.remove('show'), 2000)
}

const showPopup = (message, reveal = false) => {
  isActive = false
  finalMessage.innerText = message
  revealWord.innerHTML = reveal ? `...the word was <u>${selectedWord}</u>` : ''
  popup.classList.add('show')
}

const updateWrongLetters = () => {
  wrongLettersEl.innerHTML = `${
    wrongLetters.length > 0
      ? `<p>Wrong</p><span>${wrongLetters.join(', ')}</span>`
      : ''
  }`

  figureParts.forEach((part, idx) => {
    const errors = wrongLetters.length
    if (idx < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })

  if (wrongLetters.length === figureParts.length) showPopup(messages.lose, true)
}

window.addEventListener('keydown', (e) => {
  e.preventDefault()

  if (!isActive || !/[a-zA-Z]/.test(e.key)) return

  const letter = e.key.toLowerCase()

  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter)
      displayWord()
    } else {
      showNotification()
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter)
      updateWrongLetters()
    } else {
      showNotification()
    }
  }
})

playBtn.addEventListener('click', () => {
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]

  displayWord()
  updateWrongLetters()

  popup.classList.remove('show')
  isActive = true
})

displayWord()
