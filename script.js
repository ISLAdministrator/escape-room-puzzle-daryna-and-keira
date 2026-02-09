// Keep track of the puzzle progress
let correctClicks = 0;

// Get the elements from the HTML
const room = document.getElementById('room-container');
const greenBeaker = document.getElementById('science-beaker-click');
const orange = document.getElementById('lab-orange-liquid');
const blue = document.getElementById('lab-blue-liquid');
const purple = document.getElementById('lab-purple-liquid');

// 1. CLICK THE GREEN BEAKER TO START
greenBeaker.onclick = function() {
    // Only change the room if we haven't started the puzzle yet
    if (correctClicks === 0) {
        room.style.backgroundImage = "url('2Room.png')";
        console.log("Room changed to the Lab!");
    }
};

// 2. CLICK ORANGE (Step 1)
orange.onclick = function() {
    if (correctClicks === 0) {
        correctClicks = 1;
        orange.style.display = "none"; // Disappear
        greenBeaker.style.opacity = "0.7"; // Fade green a bit
    } else {
        showError();
    }
};

// 3. CLICK BLUE (Step 2)
blue.onclick = function() {
    if (correctClicks === 1) {
        correctClicks = 2;
        blue.style.display = "none"; // Disappear
        greenBeaker.style.opacity = "0.4"; // Fade green more
    } else {
        showError();
    }
};

// 4. CLICK PURPLE (Step 3)
purple.onclick = function() {
    if (correctClicks === 2) {
        correctClicks = 3;
        purple.style.display = "none"; // Disappear
        greenBeaker.style.opacity = "0"; // Green is gone!
        alert("YOU DID IT! The liquid is clear.");
    } else {
        showError();
    }
};

// Function to show the red error text
function showError() {
    const msg = document.getElementById('lab-error-message');
    msg.style.display = "block";
    setTimeout(() => {
        msg.style.display = "none";
    }, 2000);
}