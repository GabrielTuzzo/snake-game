const scoreEle = document.querySelector('.score')
const playBoard = document.querySelector('.play-board')
const highScoreEle = document.querySelector('.max-score')

let foodX 
let foodY 
let snakeX 
let snakeY 
let velocityX = 0
let velocityY = 0
let body = []
let setIntervalId
let score = 0

let highScore = localStorage.getItem("high-score") || 0
highScoreEle.innerText = `High Score: ${highScore}`

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 25) + 1
}
const changeSnakePosition = () => {
    snakeX = Math.floor(Math.random() * 30) + 1
    snakeY = Math.floor(Math.random() * 20) + 1
}
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

const startGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        body.push([foodX, foodY])
        score++
        
        highScore = score >= highScore ? score : highScore 
        localStorage.setItem("high-score", highScore)
        highScoreEle.innerText = `High Score: ${highScore}`
        scoreEle.innerText = `Score: ${score}` 
    }
    if (snakeX < 0|| snakeX > 37 || snakeY < 0 || snakeY > 31) {
        alert('Game Over!!!, press OK to continue')
        clearInterval(setIntervalId)
        location.reload()
    }
    body[0] = [snakeX, snakeY]
    
    snakeX += velocityX
    snakeY += velocityY
    
    for (let i = 0; i < body.length; i++) {
        htmlMarkup += `<div class="snake" style="grid-area: ${body[i][1]} / ${body[i][0]}"></div>`
        if (i !== 0 && body[0][1] === body[i][1] && body[0][0] === body[i][0]) {
            alert('Game Over!!!, press OK to continue')
        clearInterval(setIntervalId)
        location.reload()
        }
    }
    for (let i = body.length - 1; i > 0; i--) {
        body[i] = body[i - 1]
    }
    playBoard.innerHTML = htmlMarkup
    
   
}
changeSnakePosition()
changeFoodPosition() 
setIntervalId = setInterval(startGame, 110)
document.addEventListener("keydown", changeDirection)
