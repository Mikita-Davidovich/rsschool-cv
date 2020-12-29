const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
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
    this.elements.main.classList.add('keyboard' , 'keyboard-hidden');
    this.elements.keysContainer.classList.add('keyboard-keys')
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key');
    //Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer)
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  createKeys () {
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
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspase', 'p', 'enter', '?'].indexOf(key) !== -1;

      keyElement.classList.add('keyboard-key');

      switch (key){
        case 'backspace':
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = createIconsHTML('backspace');
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
            this.triggerEvent('oninput');
          })
          break;  

        case 'caps':
          keyElement.classList.add('keyboard-key-wide', 'keyboard-key-activatable');
          keyElement.innerHTML = createIconsHTML('keyboard_capslock');
          keyElement.addEventListener('click', () => {
            this.toggleCapslock();
            keyElement.classList.toggle('keyboard-key-active', this.properties.capsLock);
          })
          break;
          
        case 'enter':
            keyElement.classList.add('keyboard-key-wide');
            keyElement.innerHTML = createIconsHTML('keyboard_return');
            keyElement.addEventListener('click', () => {
              this.properties.value += '\n';
              this.triggerEvent('oninput');
            })
            break;

        case 'space':
            keyElement.classList.add('keyboard-key-extra-wide');
            keyElement.innerHTML = createIconsHTML('space_bar');
            keyElement.addEventListener('click', () => {
              this.properties.value += ' ';
              this.triggerEvent('oninput');
            })
            break;

        case 'done':
            keyElement.classList.add('keyboard-key-wide' , 'keyboard-key-dark');
            keyElement.innerHTML = createIconsHTML('check_circle');
            keyElement.addEventListener('click', () => {
              this.close();
              this.triggerEvent('onclose');
            })
            break;

        default:
            keyElement.textContent = key.toLowerCase();
            keyElement.addEventListener('click', () => {
              this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
              this.triggerEvent('oninput');
            })
            break;
      }

      fragment.appendChild(keyElement);

      if(insertLineBreak){
        fragment.appendChild(document.createElement('br'));
      }
    })

    return fragment;
  },

  triggerEvent(handlerName){
    if (typeof this.eventHandlers[handlerName] === 'function'){
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapslock(){
    this.properties.capsLock = !this.properties.capsLock;

    for(const key of this.elements.keys){
      if(key.childElementCount === 0){
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }

  },

  open(initialValue, oninput , onclose){
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard-hidden')
  },

  close(){
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard-hidden')
      
  },
}

window.addEventListener('DOMContentLoaded', function() {
  Keyboard.addMainElements();
})