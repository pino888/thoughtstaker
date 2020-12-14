//localStorage.clear('logSave')
//localStorage.clear('newestDiv')
const input = document.querySelector('#input-field');
const button = document.getElementById('save');
let log = document.querySelector('.log');
let currentDiv = document.getElementById("div0");
const firstDateStamp = document.getElementById("date-stamp-0");
let strike = document.querySelectorAll(".strike");
let copy = document.querySelectorAll(".copy");
const firstDate = new Date();
firstDateStamp.innerHTML = firstDate;
let numberOfEntries = 0;

// For future development
/*let savedData = {
    content: log.innerHTML,
    divNumber: numberOfEntries
}*/

let logSave = JSON.parse(localStorage.getItem("logSave"));
let newestDiv = localStorage.getItem("newestDiv");

if (logSave != null) {
    log.innerHTML = logSave
}

if (newestDiv != null) {
    numberOfEntries = newestDiv;
    currentDiv = document.getElementById(`div${numberOfEntries}`);
}


setInterval(() => {
    if(input === document.activeElement && window.matchMedia("(max-width: 768px)").matches){
        log.style.display = 'none';
    }else{
        log.style.display = 'block';
    }
}, 500)

addStrikeButton();
addCopyButton();

function addElement () { 
    const now = new Date();
    const year = now.getFullYear();
    const options = { month: 'long'};
    const month = new Intl.DateTimeFormat('en-US', options).format(now);
    const day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    hour = addZero(hour);
    minute = addZero(minute);
    const dateStamp = day+' '+month+' '+year+' '+hour+':'+minute;
    // create a new div element with datestamp and content
    numberOfEntries++;
    const newDiv = document.createElement("div");
    newDiv.classList.add("entry");
    newDiv.id = `div${numberOfEntries}`;
    const staticDiv = document.createElement("div");
    staticDiv.classList.add("static");
    const newSpan = document.createElement("span");
    newSpan.id = `date-stamp-${numberOfEntries}`;
    newSpan.innerHTML = dateStamp;
    const newContent = document.createTextNode(input.value);
    // create line through button
    const newStrike = document.createElement("img");
    newStrike.classList.add("strike");
    newStrike.src = './resources/scribble.png';
    const newCopy = document.createElement("img");
    newCopy.classList.add("copy");
    newCopy.src = './resources/clipboard.png';
    
    // add the text node, date stamp and button to the newly created div
    newDiv.appendChild(staticDiv);
    staticDiv.appendChild(newStrike);
    staticDiv.appendChild(newCopy);
    staticDiv.appendChild(newSpan);
    newDiv.appendChild(newContent);
    input.value = '';
    //input.focus();
  
    // add the newly created element and its content with buttons into the DOM 
    log.insertBefore(newDiv, currentDiv);
    currentDiv = document.getElementById(newDiv.id);
    addStrikeButton();
    addCopyButton();

    saveState();
}

function saveState() {
    localStorage.setItem('logSave', JSON.stringify(log.innerHTML));
    localStorage.setItem('newestDiv', numberOfEntries);
}

addZero = (time) => {
    if(time < 10) {
        time = "0" + time;
    }
    return time;
}

button.onmouseup = addElement;

returnKey = (event) => {
    var x = event.which || event.keyCode;
    if (x == 13) {
        button.onmouseup();
        input.blur();
    }
}

function addStrikeButton() {
    strike = document.querySelectorAll(".strike");
    for (i = 0; i < strike.length; i++){
        strike[i].onmouseup = strikeThrough;
    }
}

function strikeThrough() {
    if (this.parentElement.parentElement.dataset.state == 'true'){
        this.parentElement.parentElement.style.textDecoration = 'none';
        this.parentElement.parentElement.setAttribute("data-state", false);
        saveState();
    }else{
        this.parentElement.parentElement.style.textDecoration = 'line-through';
        this.parentElement.parentElement.setAttribute("data-state", true);
        saveState();
    }
}

function addCopyButton() {
    copy = document.querySelectorAll(".copy");
    for (i = 0; i < copy.length; i++){
        copy[i].onmouseup = copyEntry;
    }
}

function copyEntry() {
    const copyText = this.parentElement.nextSibling.textContent;
    navigator.clipboard.writeText(copyText);
  }