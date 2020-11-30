const panels = document.querySelectorAll('.panels');
const anotherWords = document.querySelector('.another-word');

//Open

function toggleOpen() {
  this.classList.toggle('open');
}

//Active

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
