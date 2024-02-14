// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';


/*
import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(<h1>Hello world!</h1>, document.getElementById("root"))
*/

/*
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("app");
const root = createRoot(container)
root.render(<App />);
*/

/*
import * as keylib from './functions.js';

//console.log('xxxxxxxxxxxxxxxxxxxxxxxx',overlayHeader)
const overlayHeader = document.getElementById("overlayHeader");
console.log(overlayHeader.innerHTML);
overlayHeader.innerHTML = "new yourTextHere";
console.log(overlayHeader.innerHTML);
//document.getElementById("overlayHeader").innerHTML = "yourTextHere";

//console.log('xxxxxxxxxxxxxxxxxxxxxxxx', overlayHeader.innerHTM);
*/

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

