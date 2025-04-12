let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "aqua", "brown"];

let started = false;
let level = 0;

let h4 = document.querySelector("h4");

// Start game on key press
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        levelUp(); // Start the first level
    }
});

// Flashing animation for Simon's sequence
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flashing animation when user clicks a button
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// Increments level and shows new color in sequence
function levelUp() {
    userSeq = []; // Clear user input for new level
    level++;
    h4.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq); // For debugging

    // Flash the sequence so far with delay
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            btnFlash(btn);
        }, index * 500);
    });
}

// Check user input against game sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000); // Proceed to next level
        }
    } else {
        h4.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "antiquewhite";
        }, 150);

        reset(); // Reset game only when wrong input
    }
}

// Handles user button clicks
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userColor); // For debugging

    checkAns(userSeq.length - 1);
}

// Add event listener to all color buttons
let btnAll = document.querySelectorAll(".btn");
for (let btn of btnAll) {
    btn.addEventListener("click", btnPress);
}

// Reset game state after Game Over
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


