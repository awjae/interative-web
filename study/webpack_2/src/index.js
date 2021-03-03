import msg from './assets/contents.js'
import './style.css';

// document.write(msg);
const div = document.createElement('div');
div.innerText = msg;
document.body.appendChild(div);