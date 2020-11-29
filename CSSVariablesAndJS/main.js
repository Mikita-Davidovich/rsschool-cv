const imputs = document.querySelectorAll('.imput')

function handleUpDate(){
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix);
}

imputs.forEach(imput => imput.addEventListener('change', handleUpDate));
imputs.forEach(imput => imput.addEventListener('mousemove', handleUpDate));
