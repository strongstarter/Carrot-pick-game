'use strict'

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME__DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false; //게임이 시작되었는지 안되었는지를 알고있는 아이(변수)하나와, 
let score = 0;//최종적으로 점수를 기억하는 변수와,
let timer = undefined;//총 얼만큼의 시간이 남았는지를 기억하고 있는 변수가 있어야겠죠? 
//게임이 시작하지 않으면 timer가 undefined이다가, 게임이 시작되면 timer가 기억되고 있어야함.

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});

function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame(){

}

function showStopButton() {
    const item = gameBtn.querySelector('.fas');
    item.classList.add('fa-stop');
    item.classList.remove('fa-play');
}

function showTimerAndScore () {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME__DURATION_SEC;
    updateTimerText(remainingTimeSec); //시작하기전에 초기 시간 5초로 업데이트를 해줘야겠지 
    timer = setInterval = (() => {
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            return;
        } 
        updateTimerText(--remainingTimeSec); //만약 0초가 아니라면 (=게임이 계속 돌아가고 있다면)첨엔 5초였다가 4초, 3초...표기하게끔
    }, 1000);    
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
    // 게임이 시작할 때마다(reset될때마다)텅텅비게 만들어준다. 
    field.innerHTML = '';
    //게임 시작하면 score에 rabbit count값으로 초기화. 
    gameScore.innerText = CARROT_COUNT;
    //벌레와 당근을 생성한 뒤 field에 추가해줌
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


