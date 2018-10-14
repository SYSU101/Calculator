const tags = ['7', '8', '9', '/',
              '4', '5', '6', '*',
              '1', '2', '3', '-',
              '0', '.', '←', '+',
              '(', ')', 'CE','='];

const keyboard = document.getElementById('keyboard');
const screen = document.getElementsByTagName('span');
let buffer = '0';
let ans = false;

const refresh = () => {
  if (buffer.length > 23) {
    screen[1].innerText = buffer.substring(0, 23);
    screen[0].innerText = buffer.substring(23);
  } else {
    screen[1].innerText = '';
    screen[0].innerText = buffer;
  }
}
const clicked = tag => {
  switch (tag) {
    case '=':
      if (isNaN(buffer)) {
        try {
          buffer = eval(buffer);
          ans = true;
        } catch (e) {
          buffer = '0';
          window.alert('算术表达式非法!');
        }
      }
      break;
    case '←':
      buffer = buffer.substring(0, buffer.length-1);
      if (buffer === '') buffer = '0';
      break;
    case 'CE':
      buffer = '0';
      break;
    default:
      if (ans) {
        ans = false;
        buffer = '0';
      }
      if ((!isNaN(tag) || tag === '(') && buffer === '0') {
        buffer = '';
      }
      if (buffer.length < 46) {
        buffer = buffer + tag;
      }
      break;
  }
  refresh();
}

for (let tag of tags) {
  button = document.createElement('button');
  button.innerText = tag;
  button.onclick = () => clicked(tag);
  keyboard.appendChild(button);
}
