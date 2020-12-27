const scoreBoard = document.querySelector('.score-main');
const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole');
const standartMode = document.querySelector('.standart-mode');
const easeMode = document.querySelector('.ease-mode');
const mediumMode = document.querySelector('.medium-mode');
const hardMode = document.querySelector('.hard-mode');
const extremalMode = document.querySelector('.extremal-mode');
const timer = document.querySelector('.time')
let lastHole;
let timeUp = false;// время истекло
let score = 0;
let sec = 10;
const min = 0;
timer.innerHTML = `${min}:${sec}`;

function randomTime(min, max){
  return  Math.round (Math.random() * (max - min) + min);
}

function randomHole(holes){
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if(lastHole === hole){
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function showMole(min, max){
  const time = randomTime(min, max);
  const hole = randomHole(holes);
  hole.classList.add('active');
  setTimeout(() =>{
    hole.classList.remove('active');
    if(!timeUp) showMole(min, max);
  }, time)
}

function startGame(min, max){
  scoreBoard.textContent = 0;
  timeUp = false;
  showMole(min, max);
  setTimeout(() => timeUp = true, 10000)  
}

function clickOnMole(e){
  if(!e.isTrusted) return;// если действие было вызвано не пользователем
  score++;
  this.parentNode.classList.remove('active');
  scoreBoard.textContent = score;
  localStorage.setItem('Score', scoreBoard.textContent);
}

function getScore (){
  scoreBoard.textContent = localStorage.getItem('Score') === null ? 0 : localStorage.getItem('Score');
}

function startStandartMode(){
  startGame(300, 2000)
}

function startEaseMode(){
  startGame(400, 1500);
}

function startMediumMode(){
  startGame(250, 1000);
}

function startHardMode(){
  startGame(150, 800);
}

function startExtremalMode(){
  startGame(100, 500);
}

function startTimer(){
  if(sec < 0) {
    return
  } else {
  timer.innerHTML = `${min}:${addZero(sec--)}`;
  setTimeout(startTimer, 1000); 
  }
}

function addZero(n) {
  return (parseInt(n , 10) < 10 ? '0': '') + n;
}

moles.forEach(mole => mole.addEventListener('click',clickOnMole));
standartMode.addEventListener('click' , startStandartMode);
standartMode.addEventListener('click' , startTimer);
easeMode.addEventListener('click', startEaseMode);
easeMode.addEventListener('click', startTimer);
mediumMode.addEventListener('click', startMediumMode);
mediumMode.addEventListener('click', startTimer);
hardMode.addEventListener('click', startHardMode);
hardMode.addEventListener('click', startTimer);
extremalMode.addEventListener('click', startExtremalMode);
extremalMode.addEventListener('click', startTimer);
getScore();
addZero();