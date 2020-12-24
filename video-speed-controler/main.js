const video = document.querySelector('.video'),
      speed = document.querySelector('.speed'),
      speedBar = document.querySelector('.speed-bar');

function speedController(e) {
  const y = e.pageY - speed.offsetTop,// pageY расстояние от верха документа до курсора - смещение сверху относительно родителя
        percent = y / speed.offsetHeight,
        min = 0.4,
        max = 4,
        height = Math.round(percent * 100) + '%',
        playbackRate = percent * (max - min) + min;//получение скорости воспроизведения в пределах от 0,4 до 4
  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(2) + 'x';
  video.playbackRate = playbackRate;
}

speed.addEventListener('mousemove', speedController);
