const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

//Options

const ShowAmPm = true;

//Time

function showTime() {
  let today = new Date(),
    hours = today.getHours(),
    minutes = today.getMinutes(),
    seconds = today.getSeconds();

//Set AM or PM

const amPM = hours >= 12 ? 'PM' : 'AM';

//12-hrours format

hours = hours % 12 || 12;

//Output time

time.innerHTML = `${hours}<span>:<span>${addZero(minutes)}<span>:<span>${addZero(seconds)} ${ShowAmPm ? amPM :''}`;
setTimeout(showTime, 1000);
}

//Add zeros

function addZero(n) {
  return (parseInt(n , 10) < 10 ? '0': '') + n;
}

//Set Background Image and Greeting

function setBackgroundGreeting() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    document.body.style.backgroundImage = 'url(../images/morning.jpg)';
    greeting.textContent = 'Good Morning';
  } else if (hour < 18){
    document.body.style.backgroundImage = 'url(../images/afternoon.jpg)';
    greeting.textContent = 'Good Afternoon';
  } else {
    document.body.style.backgroundImage = 'url(../images/nigth.jpg)';
    greeting.textContent = 'Good Evening';
    document.body.style.color = 'white';
  }
}

//Get Name

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Your Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

//Set Name

function setName(e) {
  if(e.type === 'keypress') {
    // Male sure enter is pressed
    if (e.which === 13 || e.code === 13) {
      localStorage.setItem('name' , e.target.innerText);
      name.blur();
    } else {
      localStorage.setItem('name',e.target.innerText);
    }
  }
}

//Get Focus

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Your Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

//Set Focus

function setFocus(e) {
  if (e.type === 'keypress') {
    // Male sure enter is pressed
    if (e.which === 13 || e.code === 13) {
      localStorage.setItem('focus' , e.target.innerText);
      focus.blur();
    } else {
      localStorage.setItem('focus',e.target.innerText);
    }
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Run

showTime();
setBackgroundGreeting();
getName();
getFocus();
