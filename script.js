// 1. SETUP - Identify all elements
let correctClicks = 0;

const room = document.getElementById('room-container');
const greenBeaker = document.getElementById('science-beaker-click');

// The three shade images
const shade1 = document.getElementById('green-shade-1');
const shade2 = document.getElementById('green-shade-2');
const shade3 = document.getElementById('green-shade-3');

// The three puzzle bottles
const orange = document.getElementById('lab-orange-liquid');
const blue = document.getElementById('lab-blue-liquid');
const purple = document.getElementById('lab-purple-liquid');

// 2. THE FIRST CLICK - Transition to the Lab
greenBeaker.onclick = function() {
    // Only works at the very start (correctClicks is 0)
    if (correctClicks === 0 && room.style.backgroundImage !== 'url("2Room.png")') {
        room.style.backgroundImage = "url('2Room.png')";
        
        // Show the puzzle bottles
        orange.style.display = "block";
        blue.style.display = "block";
        purple.style.display = "block";
        
        console.log("Welcome to the Lab! Follow the order: Orange, Blue, Purple.");
    }
};

// 3. ORANGE CLICK (Step 1)
orange.onclick = function() {
   if (correctClicks === 0) {
       correctClicks = 1;
       orange.style.display = "none"; // Hide bottle
       shade1.style.display = "block"; // Show first shade
       console.log("Correct! Shade 1 active.");
   } else {
       showError();
   }
};


// 4. BLUE CLICK (Step 2)
blue.onclick = function() {
   if (correctClicks === 1) {
       correctClicks = 2;
       blue.style.display = "none"; // Hide bottle
       shade2.style.display = "block"; // Show second shade on top
       console.log("Correct! Shade 2 active.");
   } else {
       showError();
   }
};   
// 5. PURPLE CLICK (Step 3 - Final)
purple.onclick = function() {
   if (correctClicks === 2) {
       correctClicks = 3;
       purple.style.display = "none"; // Hide bottle
       shade3.style.display = "block"; // Show last shade on top
      
       console.log("Puzzle solved!");
       alert("The experiment is a success! You created the antidote!");
   } else {
       showError();
   }
};


// 6. ERROR MESSAGE FUNCTION
function showError() {
    const msg = document.getElementById('lab-error-message');
    if (msg) {
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.display = "none";
        }, 2000);
    }
}