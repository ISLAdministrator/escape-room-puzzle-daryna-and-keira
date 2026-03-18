let correctClicks = 0;
let wrongClicks = 0;

// Identify Room and Main Elements
const room = document.getElementById('room-container');
const greenBeaker = document.getElementById('science-beaker-click');
const finalModal = document.getElementById('final-modal-overlay');

// Identify Audio Elements from your HTML
const errorSound = new Audio('error.wav'); 
const bgMusic = document.getElementById('bg-music');
const successSound = document.getElementById('success-sound');

// Identify the three shade images (the progress visuals)
const shade1 = document.getElementById('green-shade-1');
const shade2 = document.getElementById('green-shade-2');
const shade3 = document.getElementById('green-shade-3');

// Identify the three puzzle bottles (Hitboxes)
const orange = document.getElementById('lab-orange-liquid');
const blue = document.getElementById('lab-blue-liquid');
const purple = document.getElementById('lab-purple-liquid');

// 2. THE FIRST CLICK - Entering the Lab and Starting Music
if (greenBeaker) {
    greenBeaker.onclick = function() {
        if (correctClicks === 0 && room.style.backgroundImage !== 'url("2Room.png")') {
            // Start the background atmosphere music
            if (bgMusic) {
                bgMusic.volume = 0.4; 
                bgMusic.play().catch(e => console.log("Music blocked by browser until next click."));
            }
            room.style.backgroundImage = "url('2Room.png')";
            orange.style.display = "block";
            blue.style.display = "block";
            purple.style.display = "block";
        }
    };
}

// 3. PUZZLE LOGIC - Checking the Sequence
orange.onclick = function() { handleBottleClick(1, orange, shade1); };
blue.onclick = function() { handleBottleClick(2, blue, shade2); };
purple.onclick = function() { handleBottleClick(3, purple, shade3); };

function handleBottleClick(order, bottleElement, shadeElement) {
    if (correctClicks + 1 === order) {
        correctClicks++;
        bottleElement.style.display = "none"; 
        shadeElement.style.display = "block"; 
        checkSuccess();
    } else {
        handleError();
    }
}

function checkSuccess() {
    if (correctClicks === 3) {
        // --- NEW CHANGE ---
        // Play the success sound!
        if (successSound) {
            successSound.play().catch(e => console.log("Success sound failed."));
        }
        
        // Show the final message after a tiny delay
        setTimeout(() => {
            finalModal.style.display = "flex";
        }, 500);
    }
}

function handleError() {
    const msg = document.getElementById('lab-error-message');
    if (errorSound) {
        errorSound.play().catch(e => console.log("Error sound failed."));
    }

    wrongClicks++; 

    if (wrongClicks >= 2) {
        if (msg) {
            msg.innerText = "TOO MANY MISTAKES! RESTARTING...";
            msg.style.display = "block";
        }
        setTimeout(resetPuzzle, 2000);
    } else {
        if (msg) {
            msg.style.display = "block";
            setTimeout(() => { msg.style.display = "none"; }, 2000);
        }
    }
}

function resetPuzzle() {
    correctClicks = 0;
    wrongClicks = 0;
    shade1.style.display = "none";
    shade2.style.display = "none";
    shade3.style.display = "none";
    orange.style.display = "block";
    blue.style.display = "block";
    purple.style.display = "block";
    const msg = document.getElementById('lab-error-message');
    if (msg) {
        msg.style.display = "none";
        msg.innerText = "WRONG ORDER! TRY AGAIN.";
    }
}