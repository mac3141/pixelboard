const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const SQUARES = 500;
const WIDTH = 20;
const HEIGHT = SQUARES / WIDTH;

const container = document.getElementById("container");

let activeIndex = 250;

for (let i = 0; i < SQUARES; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // on mouseover, add random color
    square.addEventListener("mouseover", () => setColor(square));

    // on mouseout, remove color
    square.addEventListener("mouseout", () => removeColor(square));

    container.appendChild(square);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.background = "#1d1d1d";
    element.style.boxShadow = "0 0 2px #1d1d1d";
}

function clear() {
    const squares = document.getElementsByClassName("square");

    for (let square of squares) {
        removeColor(square);
    }

    activeIndex = 250;
}

function blink() {
    const squares = document.getElementsByClassName("square");

    for (let square of squares) {
        setColor(square);
        setTimeout(() => removeColor(square), 750);
    }
}

function getSquareByIndex(index) {
    const squares = document.getElementsByClassName("square");

    return squares[index];
}

document.addEventListener("keypress", function (event) {
    // Clear board
    if (event.key == "c" || event.key == "C") {
        console.log("c");
        clear();
    }

    // Make entire board blink
    if (event.code === "Enter") {
        console.log("ENTER")
        blink();
    }

    // Move left
    if (event.key == "a" || event.key == "A") {
        if (activeIndex % WIDTH === 0) {
            activeIndex += WIDTH;
        }

        activeIndex -= 1;

        setColor(getSquareByIndex(activeIndex));
    }

    // Move right
    if (event.key == "d" || event.key == "D") {
        if ((activeIndex + 1) % WIDTH === 0) {
            activeIndex -= WIDTH;
        }

        activeIndex += 1;

        setColor(getSquareByIndex(activeIndex));
    }

    // Move up
    if (event.key == "w" || event.key == "W") {
        if (activeIndex < WIDTH) {
            activeIndex += HEIGHT * WIDTH;
        }

        activeIndex -= WIDTH;

        setColor(getSquareByIndex(activeIndex));
    }

    // FIXME: Move down
    if (event.key == "s" || event.key == "S") {
        if (activeIndex > SQUARES - WIDTH) {
            activeIndex = (activeIndex % HEIGHT) - HEIGHT;
        }

        activeIndex += WIDTH;

        setColor(getSquareByIndex(activeIndex));
    }
});