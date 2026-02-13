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

// 1. New variable to track mistakes
let wrongClicks = 0;

// ... (keep your existing variables) ...

// 6. UPDATED ERROR MESSAGE & RESET FUNCTION
function showError() {
    const msg = document.getElementById('lab-error-message');
    wrongClicks++; // Add 1 to the mistake counter

    if (wrongClicks >= 1) {
        // RESET THE PUZZLE
        msg.innerText = "TOO MANY MISTAKES! RESTARTING...";
        msg.style.display = "block";

        setTimeout(() => {
            // 1. Reset counters
            correctClicks = 0;
            wrongClicks = 0;

            // 2. Hide all the green shades
            shade1.style.display = "none";
            shade2.style.display = "none";
            shade3.style.display = "none";

            // 3. Bring the colored bottles back
            orange.style.display = "block";
            blue.style.display = "block";
            purple.style.display = "block";

            // 4. Hide the message
            msg.style.display = "none";
            msg.innerText = "WRONG ORDER! TRY AGAIN."; // Reset text for next time
            
            console.log("Puzzle reset due to mistakes.");
        }, 2000);
    } else {
        // Regular error (first mistake)
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.display = "none";
        }, 2000);
    }
}

// At the top with your other variables
const finalModal = document.getElementById('final-modal-overlay');

// Update your purple.onclick function:
purple.onclick = function() {
   if (correctClicks === 2) {
       correctClicks = 3;
       purple.style.display = "none";
       shade3.style.display = "block";
      
       console.log("Puzzle solved!");
       
       // Show the custom story modal
       finalModal.style.display = "flex"; 
   } else {
       showError();
   }
};