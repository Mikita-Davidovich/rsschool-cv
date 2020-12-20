const player = document.querySelector('.player'),
      video = player.querySelector('.video'),
      progress = player.querySelector('.progress'),
      progressBar = player.querySelector('.progress-filled'),
      toggle = player.querySelector('.toggle'),
      skipButtons = player.querySelectorAll(`[data-skip]`),
      ranges = player.querySelectorAll('.player-slider'),
      fullScreen = player.querySelector('.full-screen');

function togglePlay() {
  video.paused ? video.play() : video.pause();
}
function updateButton() {
  toggle.textContent = video.paused ? '►' : '| |';
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() { 
  video[this.name] = this.value;// Что то я не понял как это работает.
}
function handleProgress() {
  const persent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${persent}%`;
}
function rewind(e) {
  const rewindTime  = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = rewindTime;
}
function getFullScreen() {
  const nowFullScreen = document.fullscreenElement;
  nowFullScreen ? document.exitFullscreen() : player.requestFullscreen();
}
function changeIconFullScreen(){
  const icon = document.querySelector('.full-screen .fas');
  const nowFullScreen = document.fullscreenElement;
  if(!nowFullScreen){
    icon.classList.add('fa-compress');
    icon.classList.remove('fa-expand');
  } else {
    icon.classList.remove('fa-compress');
    icon.classList.add('fa-expand');
  }
}

fullScreen.addEventListener('click',getFullScreen);
fullScreen.addEventListener('click',changeIconFullScreen);

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', rewind);
progress.addEventListener('mousemove', (e) => mausedown && rewind(e));
progress.addEventListener('mouseup', () => mausedown = false);
progress.addEventListener('mousedown', () => mausedown = true);

