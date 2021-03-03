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

const popUp = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');
const popUpText = document.querySelector('.pop-up__message');


let started = false; //게임이 시작되었는지 안되었는지를 알고있는 아이(변수)하나와, 
let score = 0;//최종적으로 점수를 기억하는 변수와,
let timer = undefined;//총 얼만큼의 시간이 남았는지를 기억하고 있는 변수가 있어야겠죠? 
//게임이 시작하지 않으면 timer가 undefined이다가, 게임이 시작되면 timer가 기억되고 있어야함.


//아이템마다 리스너를 등록하는 것이 아니라, 이벤트 위임을 이용해서 필드 안에서 클릭이 발생하면,
// 어떤 것이  클릭됐냐에 따라, 기능을 수행할 것이다. 

field.addEventListener('click', onFieldClick); // (event) => onFieldClick(event)가 생략된 것임. 


gameBtn.addEventListener('click', () => {
    if(started) { //게임이 시작되면, stopGame 해준다. 
        stopGame();
    } else {
        startGame(); //게임이 종료되면 startGame해준다. 
    }
    started = !started;
});

popUpRefresh.addEventListener('click', () => {
    initGame();
    popUp.classList.add('pop-up--hide');
    startGame();
    showStopButton();
    
})

function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame(){
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY!');
}

function showStopButton() {
    const item = gameBtn.querySelector('.fas');
    item.classList.add('fa-stop');
    item.classList.remove('fa-play');
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore () {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME__DURATION_SEC;
    updateTimerText(remainingTimeSec); //시작하기전에 초기 시간 5초로 업데이트를 해줘야겠지 
    timer = setInterval(() => {
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            return;
        } 
        updateTimerText(--remainingTimeSec); //만약 0초가 아니라면 (=게임이 계속 돌아가고 있다면)첨엔 5초였다가 4초, 3초...표기하게끔
    }, 1000);    
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
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

function onFieldClick(event) {
if(!started) { //만약 게임이 시작되지 않으면 
    return; //함수를 빠르게 나간다. 
}
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
