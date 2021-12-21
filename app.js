const screen = document.querySelectorAll('.screen')
const board = document.querySelector('.board')
const startBtn = document.querySelector('.start')
const time = document.querySelector('.time-list')
const timeElem = document.querySelector('#time')

let timeRemaine = 0
let score = 0

const colors = [{
    bgc: 'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)'
},
{
    bgc: 'linear-gradient(90deg, #ace316 0%, #86c70e 47%, #84ca12 100%)'
},
{
    bgc: 'linear-gradient(90deg, #e316a5 0%, #c70e8f 47%, #af337c 100%)'
},
]

//класс экрана 
function startGame(num) {
    screen[num].classList.add('up')
}

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    startGame(0)
})

time.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        //получаем атрибут времени и делаем его интом
        timeRemaine = parseInt(e.target.getAttribute('data-time'))
        startGame(1)

        timeElem.innerHTML = `00:${timeRemaine}`
        timerID = setInterval(decTime, 1000)
        
        gameID = setInterval(createCircle, 2000)
        createCircle()
    }
})

function createCircle() {
    const circle = document.createElement('div')
    const sizeCircle = getRandomNumber(8, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - (sizeCircle * 3))
    const y = getRandomNumber(0, height - (sizeCircle * 3))
    const randomColor = getRandomNumber(0, 3)
    

    circle.style.background = `${colors[randomColor].bgc}`
    circle.style.width = `${sizeCircle}px`
    circle.style.height = `${sizeCircle}px`
    circle.classList.add('circle')
    setTimeout(() => {
        circle.remove()
    }, 4000)

    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

//добавляем доп кружки
function extraCircle() {
    setInterval(createCircle, 2000);
}


board.addEventListener('click', event => {
    //если есть класс круг то тогда только работает клик 
    if (event.target.classList.contains('circle')) {
        event.target.remove()
        createCircle()
        score++
    }
})

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function decTime() {
    if (timeRemaine === 0) {
        finishGame()
    } else {
        let current = --timeRemaine
        if (current < 10) {
            current = `0${current}`
        }
        timeElem.innerHTML = `00:${current}`
    }
}

function finishGame() {
    timeElem.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: ${score} </h1>
     <div class ="retry">↻</div>`
    clearInterval(timerID)
    clearInterval(gameID)
    const retry = document.querySelector('.retry')
    retry.addEventListener('click', retryGame)
}

function retryGame() {
    timeElem.parentNode.classList.remove('hide')
    screen[1].classList.remove('up')
    score = 0
    clearBoard()
}

function clearBoard() {
    board.innerHTML = ''
}