// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

// Create an example popover2
document.querySelectorAll('[data-bs-toggle="popover2"]')
  .forEach(popover2 => {
    new Popover(popover2)
  })

// check if key is setup
if (localStorage.getItem("keyset")) {
  let keyset = localStorage.getItem("name");
  console.log('localStorage.getItem.keyset:', keyset);
} else {
  console.log('localStorage.getItem.keyset: false');
}

