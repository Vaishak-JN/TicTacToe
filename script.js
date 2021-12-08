const xClass = "x";
const oClass = "o";

const x_turn = document.getElementById("x-turn")
const o_turn = document.getElementById("o-turn")

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const restartBtn = document.getElementById("restartButton")

const turn = document.getElementById("turn")

let oTurn

const cellElements = document.querySelectorAll("[data-cell]")
// console.log([...cellElements])
const board = document.getElementById("board")
// board.classList.add(xClass)

restartBtn.addEventListener("click", startGame)

startGame()
// restartBtn.addEventListener("click", startGame)

function startGame() {
    oTurn = false

    oTurn ? o_turn.classList.add("nxtTurn") : x_turn.classList.add("nxtTurn")
    oTurn ? x_turn.classList.remove("nxtTurn") : o_turn.classList.remove("nxtTurn")


    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setBoardHoverClass()

    winningMessageElement.classList.remove("show")
}

function handleClick(e) {

    const cell = e.target
    const currentClass = oTurn ? oClass : xClass

    oTurn ? x_turn.classList.add("nxtTurn") : o_turn.classList.add("nxtTurn")
    oTurn ? o_turn.classList.remove("nxtTurn") : x_turn.classList.remove("nxtTurn")

    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        // console.log("winner")
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = `DRAW`
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O" : "X"} WINS!!!`
    }
    winningMessageElement.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)

    if (oTurn) {
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(i => {
            return cellElements[i].classList.contains(currentClass)
        })
    })
}