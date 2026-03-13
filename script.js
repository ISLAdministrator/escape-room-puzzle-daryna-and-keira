// 1. SETUP - Variables and Counters
let correctClicks = 0;
let wrongClicks = 0;

// Identify Room and Main Beaker
const room = document.getElementById('room-container');
const greenBeaker = document.getElementById('science-beaker-click');

// Identify Audio Elements
// Using 'new Audio' for the error sound makes it play instantly on every click
const errorSound = new Audio('error.wav'); 
const bgMusic = document.getElementById('bg-music');

// Identify the Story Modal and its button
const finalModal = document.getElementById('final-modal-overlay');
const nextLevelBtn = document.getElementById('next-level-btn');

// Identify the three shade images (the progress visuals)
const shade1 = document.getElementById('green-shade-1');
const shade2 = document.getElementById('green-shade-2');
const shade3 = document.getElementById('green-shade-3');

// Identify the three puzzle bottles
const orange = document.getElementById('lab-orange-liquid');
const blue = document.getElementById('lab-blue-liquid');
const purple = document.getElementById('lab-purple-liquid');

// 2. THE FIRST CLICK - Entering the Lab and Starting Music
if (greenBeaker) {
    greenBeaker.onclick = function() {
        // Only run this once to enter the lab
        if (correctClicks === 0 && room.style.backgroundImage !== 'url("2Room.png")') {
            // Start the background atmosphere music
            if (bgMusic) {
                bgMusic.volume = 0.4; // Set to 40% so it's atmospheric
                bgMusic.play().catch(error => {
                    console.log("Audio playback was blocked. Click again to enable sound.");
                });
            }
            
            // Change the room background
            room.style.backgroundImage = "url('2Room.png')";
            
            // Show the puzzle bottles
            orange.style.display = "block";
            blue.style.display = "block";
            purple.style.display = "block";
            
            console.log("Lab Entered. Music Started.");
        }
    };
}

// 3. BOTTLE CLICK LOGIC (The Puzzle Order: Orange -> Blue -> Purple)
orange.onclick = function() {
   if (correctClicks === 0) {
       correctClicks = 1;
       orange.style.display = "none";
       shade1.style.display = "block";
       console.log("Correct: Orange added.");
   } else {
       showError();
   }
};

blue.onclick = function() {
   if (correctClicks === 1) {
       correctClicks = 2;
       blue.style.display = "none";
       shade2.style.display = "block";
       console.log("Correct: Blue added.");
   } else {
       showError();
   }
};   

purple.onclick = function() {
   if (correctClicks === 2) {
       correctClicks = 3;
       purple.style.display = "none";
       shade3.style.display = "block";
       
       console.log("Puzzle solved!");
       // Success! Show the custom story modal
       if (finalModal) {
           finalModal.style.display = "flex";
       }
   } else {
       showError();
   }
};

// 4. THE ERROR FUNCTION (Plays sound and handles mistakes)
function showError() {
    const msg = document.getElementById('lab-error-message');
    
    // Play the mistake sound (error.wav)
    if (errorSound) {
        errorSound.currentTime = 0; // Rewind to start for instant replay
        errorSound.play().catch(e => console.log("Error sound failed to play."));
    }

    wrongClicks++; 

    // If they make 2 mistakes, reset the whole lab
    if (wrongClicks >= 2) {
        if (msg) {
            msg.innerText = "TOO MANY MISTAKES! RESTARTING...";
            msg.style.display = "block";
        }
        // Wait 2 seconds then reset the puzzle
        setTimeout(resetPuzzle, 2000);
    } else {
        // First mistake message
        if (msg) {
            msg.style.display = "block";
            setTimeout(() => { msg.style.display = "none"; }, 2000);
        }
    }
}

// 5. RESET FUNCTION (Clears progress and brings bottles back)
function resetPuzzle() {
    correctClicks = 0;
    wrongClicks = 0;
    
    // Hide all progress shades
    shade1.style.display = "none";
    shade2.style.display = "none";
    shade3.style.display = "none";
    
    // Bring the bottles back
    orange.style.display = "block";
    blue.style.display = "block";
    purple.style.display = "block";
    
    // Hide the error message text
    const msg = document.getElementById('lab-error-message');
    if (msg) {
        msg.style.display = "none";
        msg.innerText = "WRONG ORDER! TRY AGAIN.";
    }
    console.log("Puzzle reset.");
}

// 6. EXIT LOGIC - Stopping music when leaving
if (nextLevelBtn) {
    nextLevelBtn.onclick = function() {
        console.log("Leaving Lab. Stopping background music.");
        if (bgMusic) {
            bgMusic.pause();
        }
    };
}
