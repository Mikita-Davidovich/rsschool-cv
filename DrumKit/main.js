//Play Song

function playSound (e) {
  const audio = document.querySelector(`audio[data-key = '${e.keyCode}']`);
  const key = document.querySelector(`.key[data-key = '${e.keyCode}']`);
  if(!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('active');
}

//Remove Transition

function removeTransition(e) {
  if(e.propertyName === 'transform') return;
  this.classList.remove('active');  
}
//Play song when i click 
function mouseClick(e) {
  const audio = document.querySelector(`audio[data-key="${e.currentTarget.dataset.key}"]`);
  audio.currentTime = 0;
  audio.play();
  this.classList.add('active');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
keys.forEach(key => key.addEventListener('click', mouseClick));


window.addEventListener('keydown' ,playSound);



