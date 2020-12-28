const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandeles: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: '',
    capsLock: false
  },

  addMainElements(){
    //Create elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div')
    //Add class
    this.elements.main.classList.add('keyboard' , '1keyboard-hidden');
    this.elements.keysContainer.classList.add('keyboard-keys')
    //Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer)
    document.body.appendChild(this.elements.main);
  },

  createKeys(){
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
    ];

    const createIconsHTML = (icon_name) => {
      return `<i class = "material-icons">${icon_name}</i>`;
    }
    keyLayout.forEach(key => {
      const keyElement = document.createElement('button')
    })
  }
}

window.addEventListener('DOMContentLoaded', function() {
  Keyboard.addMainElements();
})