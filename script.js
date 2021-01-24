"use strict"

const Player = class {
  constructor(id) {
    this.score = 0
    this.currentScore = 0
    this.id = id
  }
}

const player = []
player.push(new Player(0))
player.push(new Player(1))

let currPlayer = player[0]

let gameEnded = false
let pvp = true

const playerName = id => document.querySelector(`#name--${id}`)

let currId, scoreId, playerId

const updateLets = () => {
  currId = document.querySelector(`#current--${currPlayer.id}`)
  scoreId = document.querySelector(`#score--${currPlayer.id}`)
  playerId = document.querySelector(`.player--${currPlayer.id}`)
}

const setScore = () => (currId.textContent = currPlayer.currentScore)

const changePlayer = () => {
  currPlayer.currentScore = 0
  setScore()
  playerId.classList.remove(`player--active`)
  currPlayer === player[0] ? (currPlayer = player[1]) : (currPlayer = player[0])
  updateLets()
  playerId.classList.add(`player--active`)
  if (pvp === false) {
    ai()
  }
}
const logResult = result => {
  currPlayer.currentScore += result
  setScore()
}

const roll = () => {
  const result = Math.ceil(Math.random() * 6)
  document.querySelector(`.dice`).src = `dice-${result}.png`
  if (result !== 1) {
    logResult(result)
  } else {
    changePlayer()
  }
}

const hold = () => {
  currPlayer.score += currPlayer.currentScore
  scoreId.textContent = currPlayer.score
  currPlayer.score >= 100 ? win() : changePlayer()
}

const win = () => {
  if (currPlayer.id === 0) {
    playerId.classList.add(`player--winner`)
    selectPlayerClasses(1).add(`player--looser`)
  } else {
    playerId.classList.add(`player--winner`)
    selectPlayerClasses(0).add(`player--looser`)
  }
  currId.textContent = 0
  gameEnded = true
}

const selectPlayerClasses = id =>
  document.querySelector(`.player--${id}`).classList

const newGame = () => {
  for (let i = 0; i < 2; i++) {
    player[i].score = 0
    player[i].currentScore = 0
    setScore()
    document.querySelector(`#current--${i}`).textContent =
      player[i].currentScore
    document.querySelector(`#score--${i}`).textContent = player[i].score
  }
  currPlayer === player[1] && changePlayer()
  if (selectPlayerClasses(0).contains(`player--winner`)) {
    selectPlayerClasses(0).remove(`player--winner`)
    selectPlayerClasses(1).remove(`player--looser`)
  } else {
    selectPlayerClasses(0).remove(`player--looser`)
    selectPlayerClasses(1).remove(`player--winner`)
  }

  if (pvp) {
    playerName(0).textContent = "PLAYER 1"
    playerName(1).textContent = "PLAYER 2"
  } else {
    playerName(0).textContent = "PLAYER"
    playerName(1).textContent = "COMPUTER"
  }
  gameEnded = false
}

const ai = () => {
  setTimeout(() => {
    if (currPlayer === player[1] && !gameEnded) {
      if (100 - currPlayer.Score <= currPlayer.currentScore) {
        hold()
      } else {
        currPlayer.currentScore >= 20 ? hold() : roll()
        ai()
      }
    }
  }, 500)
}

updateLets()

document.querySelector(`.btn--roll`).addEventListener(`click`, () => {
  if (!pvp) {
    currPlayer === player[0] && !gameEnded && roll()
  } else {
    !gameEnded && roll()
  }
})
document.querySelector(`.btn--hold`).addEventListener(`click`, () => {
  if (!pvp) {
    currPlayer === player[0] && !gameEnded && hold()
  } else {
    !gameEnded && hold()
  }
})
document.querySelector(`.btn--pvp`).addEventListener(`click`, () => {
  pvp = true
  newGame()
})
document.querySelector(`.btn--ai`).addEventListener(`click`, () => {
  pvp = false
  newGame()
})
