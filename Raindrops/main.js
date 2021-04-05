const buttons = document.querySelectorAll('.button-number');
const screen = document.querySelector('.screen');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const play = document.querySelector('.play');
const howToPlay = document.querySelector('.how-to-play');
const videoHowToPlay = document.querySelector('.how-to-play-video')
const firstPage = document.querySelector('.first-page');
const wrapper = document.querySelector('.wrapper');
const enter = document.querySelector('.enter');
const scoreTable = document.querySelector('.score');
const yourTotalScore = document.querySelector('.your-total-score');
const songWin = document.querySelector('.song-win');
const songError = document.querySelector('.song-fail');
const songEndGame = document.querySelector('.song-end-game');
const mainRainDrop = document.querySelector('.main-rain-drop');
const wave = document.querySelector('.first-wave');
const wave2 = document.querySelector('.second-wave');
const playAgain = document.querySelector('.play-again');
const exit = document.querySelector('.exit');
const mainPage = document.querySelector('.main-wrapper');
const isNumberRegExp =/^[0-9]$/;

let createRainDrop;
let createBonusRainDrop;
let score = 0;
let dropTouchWave = 0;

function removeFirstPage() {
  firstPage.classList.remove('active');
  firstPage.classList.add('not-active');
}

function addFirstPage(){
  firstPage.classList.add('active')
  yourTotalScore.style.display = 'none';
  dropTouchWave = 0;
  score = 0;
  scoreTable.textContent = score;
}

function numberPress() {
  for(let button of buttons){
    button.addEventListener('click' , () => {
      screen.value += button.value;
    });
  }
}

function clearScreen() {
  return screen.value = '';
}

clear.addEventListener('click', () => {
  clearScreen();
});

function deleteElementOnScreen() {
  return screen.value = screen.value.substring(0, screen.value.length - 1);
}

del.addEventListener('click', () => {
  deleteElementOnScreen();
});

function chekForNumber(number) {
  let isNumber = isNumberRegExp.test(number);
  if (!isNumber) return;
  screen.value += number;
}

function useKeyboard(e) {
  chekForNumber(e.key);
  if (e.which === 8) {
    deleteElementOnScreen();
  }
  else if (e.which === 46) {
    clearScreen();
  }
  else if (e.which === 13) {
    clearScreenAfterClickEnterAndRemoveDrop();
  }
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomOperator() {
  const arrOperators = ['+', '-', '*', '/'];
  let randomOperator = arrOperators[Math.floor(Math.random() * arrOperators.length)];
  return randomOperator;
}

function createEquation(min, max) {
  let x = getRandomNumber(min, max);
  const z = getRandomOperator();
  const y = getRandomNumber(min, max);
  if (z === '/' && x % y !== 0 ) {
    x = y * Math.floor(Math.random()* 10); 
    return x + z + y;
  } else if (x >= y) {
    return x + z + y; 
  } else {
    return y + z + x;
  }
}

function createDrop() {
  const drop = document.createElement('div');
  drop.classList.add('rain-drop');
  let equation = createEquation(1, 10);
  if (score < 10) {
    equation;
  } else if (score >= 10 && score <= 40) {
    equation = createEquation(1, 15);
  } else {
    equation = createEquation(1, 25);
  }
  drop.setAttribute('data-value', new Function(`return ${equation}`)());
  mainRainDrop.appendChild(drop);
  drop.style.left = Math.random() * 60 + '%';
  drop.append(equation);
}

function createBonusDrop() {
  const bonusDrop = document.createElement('div');
  bonusDrop.classList.add('bonus-drop');
  let equation = createEquation(1, 10);
  bonusDrop.setAttribute('data-value', new Function(`return ${equation}`)());
  mainRainDrop.appendChild(bonusDrop);
  bonusDrop.style.left = Math.random() * 60 + '%';
  bonusDrop.append(equation);
}

function removeDrop() {
  const rainDrop = document.querySelector('.rain-drop');
  mainRainDrop.removeChild(rainDrop);
}

function removeBonusDrop() {
  const bonusDrop = document.querySelector('.bonus-drop');
  mainRainDrop.removeChild(bonusDrop);
}

function clearScreenAfterClickEnterAndRemoveDrop() {
  const rainDrop = document.querySelector('.rain-drop');
  const bonusDrop = document.querySelector('.bonus-drop');
  if (rainDrop && rainDrop.getAttribute('data-value') === screen.value ) {
  rainDrop.classList.add('explosion');
  songWin.play();
  setTimeout(removeDrop,100);
  score++;
  scoreTable.textContent = score;
  screen.value = '';
  rainDrop.textContent = '';
  } else if (bonusDrop && bonusDrop.getAttribute('data-value') === screen.value) {
    deleteAllWhenBonusDrop();
    songWin.play();
    score += 3;
    scoreTable.textContent = score;
    screen.value = '';
    bonusDrop.textContent = '';
  } else if ((bonusDrop || rainDrop) && (rainDrop.getAttribute('data-value') !== screen.value || bonusDrop.getAttribute('data-value') !== screen.value)) {
    songError.play();
    score--;
    scoreTable.textContent = score;
    screen.value = '';
  }
}

function removeDropWhenDropTouchWave(){
  let heightOfWave;
  const waveSizes = wave.getBoundingClientRect();
  const topOfWave = Math.floor(waveSizes.top);

  const rainDrop = document.querySelector('.rain-drop');
  const rainDropSizes = rainDrop ? rainDrop.getBoundingClientRect(): 0;
  const bottomOfDrop = Math.floor(rainDropSizes.bottom);

  const bonusRainDrop = document.querySelector('.bonus-drop');
  const bonusRainDropSizes = bonusRainDrop ? bonusRainDrop.getBoundingClientRect(): 0;
  const bottomOfBonusRainDrop = Math.floor(bonusRainDropSizes.bottom) 

  if (dropTouchWave === 0 && (bottomOfDrop >= topOfWave || bottomOfBonusRainDrop >= topOfWave)) {
    heightOfWave = '35%';
    deleteAllWhenDropTouchWave(heightOfWave);
    songError.play();
    score -= 3;
    scoreTable.textContent = score;
  } else if (dropTouchWave === 1 && (bottomOfDrop >= topOfWave || bottomOfBonusRainDrop >= topOfWave)) {
    heightOfWave = '50%';
    deleteAllWhenDropTouchWave(heightOfWave);
    songError.play();
    score -= 3;
    scoreTable.textContent = score;
  } else if (dropTouchWave === 2 && (bottomOfDrop >= topOfWave || bottomOfBonusRainDrop >= topOfWave)) {
    heightOfWave = '70%';
    deleteAllWhenDropTouchWave(heightOfWave);
    songError.play();
    score -= 3;
    scoreTable.textContent = score;
  } else if (dropTouchWave >= 3 && (bottomOfDrop >= topOfWave || bottomOfBonusRainDrop >= topOfWave)) {
    heightOfWave = '25%';
    songEndGame.play();
    score -= 3;
    scoreTable.textContent = score;
    deleteAllWhenDropTouchWave(heightOfWave);
    clearInterval(createRainDrop);
    clearInterval(createBonusRainDrop);
    setTimeout(() =>{
      yourTotalScore.style.display = 'flex';
    },3000);
  }
}

function deleteAllWhenDropTouchWave(heightOfWave) {
  dropTouchWave++;
  const bonusDrop = document.querySelector('.bonus-drop');
  const rainDrops = document.querySelectorAll('.rain-drop');

  wave.style.cssText = `--wave-height: ${heightOfWave} `;
  wave2.style.cssText = `--wave-height: ${heightOfWave}`;
  
  rainDrops.forEach((rainDrop) => {
    rainDrop.textContent = '';
    rainDrop.classList.add('explosion');
    setTimeout(() => mainRainDrop.removeChild(rainDrop), 100);
  })

  if (bonusDrop) {
    bonusDrop.textContent = '';
    bonusDrop.classList.add('explosion');
    setTimeout(() => mainRainDrop.removeChild(bonusDrop), 100);
  }
}

function deleteAllWhenBonusDrop() {
  const rainDrops = document.querySelectorAll('.rain-drop');
  const bonusDrop = document.querySelector('.bonus-drop');

  rainDrops.forEach((rainDrop) => {
    rainDrop.textContent = '';
    rainDrop.classList.add('explosion');
    setTimeout(() => mainRainDrop.removeChild(rainDrop), 100);
  })

  bonusDrop.classList.add('explosion');
  bonusDrop.textContent = '';
    setTimeout(() => mainRainDrop.removeChild(bonusDrop),100);
}

function startGame() {
  removeFirstPage();
  createRainDrop = setInterval(createDrop,3000);
  createBonusRainDrop = setInterval(createBonusDrop,15000);
}

function clickButtonPlayAgain(){
  yourTotalScore.style.display = 'none';
  dropTouchWave = 0;
  score = 0;
  scoreTable.textContent = score;
}

function whenVideoEnded(){
  mainPage.classList.remove('main-wrapper-not-active');
  mainPage.classList.add('main-wrapper');
  videoHowToPlay.classList.remove('how-to-play-video-active');
  videoHowToPlay.classList.add('how-to-play-video');
  firstPage.classList.remove('not-active');
  firstPage.classList.add('active');
}

function whenClickHowToPlay(){
  mainPage.classList.add('main-wrapper-not-active');
  videoHowToPlay.classList.add('how-to-play-video-active');
  videoHowToPlay.play();
}

numberPress();
clearScreen();
deleteElementOnScreen();
window.addEventListener('keydown', useKeyboard);
setInterval(removeDropWhenDropTouchWave,500);
enter.addEventListener('click', clearScreenAfterClickEnterAndRemoveDrop);
videoHowToPlay.addEventListener('ended', whenVideoEnded);
exit.addEventListener('click',addFirstPage);
play.addEventListener('click', startGame);
howToPlay.addEventListener('click',()=>{
  removeFirstPage();
  whenClickHowToPlay();
})
playAgain.addEventListener('click', () => {
  startGame();
  clickButtonPlayAgain();
});
