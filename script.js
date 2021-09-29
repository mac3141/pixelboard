const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const SQUARES = 500;
const WIDTH = 20;
const HEIGHT = SQUARES / WIDTH;

const container = document.getElementById("container");

let activeIndex = 217;

for(let i=0; i < SQUARES; i++) {
    const square = document.createElement('div');
    square.classList.add("square");

    // on mouseover, add random color
    square.addEventListener( 'mouseover', () => setColor(square));

    // on mouseout, remove color
    square.addEventListener('mouseout', ()=> removeColor(square));
    
    container.appendChild(square);
}

function getRandomColor() {
    return colors[ Math.floor( Math.random() * colors.length) ];
}

function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.background = "#1d1d1d";
    element.style.boxShadow = `0 0 2px #1d1d1d, 0 0 10px #1d1d1d`;
}

function clear() {
    const squares = document.getElementsByClassName("square");

    for( let square of squares) {
        removeColor( square);
    }
}

function blink() {
    const squares = document.getElementsByClassName("square");

    for( let square of squares) {
        setTimeout( ()=> setColor(square), 100);
        setTimeout( ()=> removeColor(square), 2000);
    }
}

function getSquareByIndex(index) {
    const squares = document.getElementsByClassName("square");

    return squares[index];
}

document.addEventListener('keypress', function( event ) {

    if( event.code === "Space" ) {
        console.log("SPACE");
        clear();
    }

    if( event.code === "Enter") {
        blink();
    }


    if( event.key == 'a') {
        if ( activeIndex % WIDTH === 0) {
            activeIndex += WIDTH;    
        }
        activeIndex = activeIndex - 1;
        
        setColor(  getSquareByIndex(activeIndex) );
    }


});