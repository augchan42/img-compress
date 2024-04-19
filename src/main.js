import './css/styles.css';
import './css/fonts.css';
import './gtag';

import twitterLogo from './twitter-logo.png';
// Assuming your images are in 'src/img' and you want them copied to 'dist/img'
// This example uses a dynamic require context which Webpack understands
function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

function handleTouchEnd() {
    changeImage();
}

// Assuming 'carousel' is the ID of your carousel element
const carouselElement = document.getElementById('carousel');

// Add event listeners
carouselElement.addEventListener('touchend', handleTouchEnd, false);

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        pauseAutoMove(); // Pause automatic movement on key press

        // Optionally, restart automatic movement after a delay of inactivity
        setTimeout(startAutoMove, 10000); // Wait for 10 seconds of inactivity before resuming

        // Move the carousel based on the key pressed
        if (event.key === "ArrowLeft") {
            changeImage(true); // Show the previous image
        } else if (event.key === "ArrowRight") {
            changeImage(); // Show the next image
        }
    }
});


let currentImageIndex = 0;

function changeImage(previous = false) {
    if (previous) {
        // If 'previous' is true, show the previous image
        // Ensure currentImageIndex never goes below 0
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    } else {
        // If 'previous' is false, show the next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }
    carousel.src = images[currentImageIndex];
}

let autoMoveInterval;
const moveInterval = 5000; // Change image every 5000 milliseconds (5 seconds)

function startAutoMove() {
    // Clear existing interval to avoid duplicates if startAutoMove is called multiple times
    if (autoMoveInterval) clearInterval(autoMoveInterval);

    autoMoveInterval = setInterval(() => {
        changeImage(); // Move to the next image automatically
    }, moveInterval);
}

function pauseAutoMove() {
    if (autoMoveInterval) clearInterval(autoMoveInterval);
}

// // Initialize the carousel with the first image
changeImage();
// Start the automatic movement when the page loads
startAutoMove();

let typingInterval; 

function typeEffect(element, text, interval = 100) {    

    if (typingInterval) {
        clearInterval(typingInterval); // Clear any ongoing typing effect        
    }
    console.log("Clearing text for", element.id); // Debugging
    element.textContent = ""; // Clear the text immediately
    console.log('typeEffect called for', text); // Debug: Check how many times it's called
    const letters = text.split(""); // Split the text into an array of letters
    console.log('letters: ', letters)
    let index = 0; // Start with the first letter

    // Find the cursor element
    const cursorElement = document.querySelector('.cursor');

    if (!cursorElement) {
        console.error('Cursor element not found');
        return; // Exit if cursor element is not found
    }

    typingInterval = setInterval(() => {
        if (index < letters.length) {
            // element.append(letters[index++]); // Append letters to the text span
            // const textNode = document.createTextNode(letters[index++]);            
            // cursorElement.before(textNode);
            element.textContent += text.charAt(index++);
        } else {
            clearInterval(typingInterval); // Stop the interval when all letters are added
        }
    }, interval);
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded called for', event);
    const titles = [
        "Echoes from the Pixelated Depths",
        "Whispers of the Digital Unknown",
        "Cryptic Pixels: Unveiling the 8-Bit Mysteries",
        "The Enigmatic 8-Bit Prophecy",
        "Shadows of the Code: An 8-Bit Enigma",
        "Pixelated Secrets: Beyond the Screen",
        "The Lost Legends of 8-Bit",
        "8-Bit Chronicles: Tales of the Forgotten",
        "Digital Mystique: The 8-Bit Oracle's Vision",
        "Arcane Pixels: Journey into the 8-Bit Abyss",
        "Unraveling the Mysteries of the I-Ching",
        "8 Bit Oracle: Where Pixels Meet Prophecy",
        "The Tao of 8 Bits",
        "Pixel Prophecies: An 8-Bit I-Ching Journey",
        "8 Bit Wisdom: Decoding the Language of Change",
        "Seek Guidance from the 8-Bit Sage",
        "Experience the I-Ching Like Never Before",
        "Find Clarity in a World of 8-Bit Symbolism"
    ];

    // Function to randomly select a title
    const getRandomTitle = () => titles[Math.floor(Math.random() * titles.length)];
    // Your script that depends on DOM elements
    const titleElement = document.getElementById("text");
    // const titleText = "The Enigmatic 8-Bit Prophecy";
    console.log("before typeEffect: ", document.getElementById("text")); // Check the element before update
    typeEffect(titleElement, getRandomTitle(), 100);    
    // titleElement.textContent = getRandomTitle(); // Directly set text content
    console.log("after typeEffect: ", document.getElementById("text")); // Check the element after update
    // Listen for keydown events
    document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            typeEffect(titleElement, getRandomTitle(), 100);
            // titleElement.textContent = getRandomTitle();
        }
    });
    // Event listener for click (desktop)
    titleElement.addEventListener("click", function(event) {
        typeEffect(titleElement, getRandomTitle(), 100);
    });

    titleElement.addEventListener("touchend", function(event) {
        typeEffect(titleElement, getRandomTitle(), 100);
    });    
});

document.getElementById('twitter-logo').src = twitterLogo;

document.addEventListener('DOMContentLoaded', function() {
    const typingSpeed = 50;
    const container = document.getElementById('backstory');
    const paragraphs = container.querySelectorAll('p'); // Get all paragraphs
    let currentParagraphIndex = 0;
    let typingInProgress = false; // Flag to indicate if typing is in progress
    let skipTyping = false; // Flag to indicate if typing should be skipped

    // Create the cursor span once and reuse it
    const cursor = document.createElement('span');
    cursor.className = 'cursor-text';
    cursor.textContent = '|'; // Cursor visual representation

    function typeOutText(text, element, index = 0, callback) {
        if (index < text.length && typingInProgress && !skipTyping) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeOutText(text, element, index + 1, callback), typingSpeed);
        } else {
            // Append the cursor only after finishing typing the paragraph
            element.appendChild(cursor);
            typingInProgress = false;
            skipTyping = false; // Reset skip flag
            if (callback) callback(); // Call the callback function if provided
        }
    }

    function startTypingNextParagraph() {
        if (currentParagraphIndex < paragraphs.length - 1) {
            currentParagraphIndex++;
            const nextParagraph = paragraphs[currentParagraphIndex];
            nextParagraph.textContent = ''; // Clear the next paragraph text content
            typingInProgress = true; // Typing starts
            typeOutText(nextParagraph.getAttribute('data-text'), nextParagraph, 0, startTypingNextParagraph);
        }
    }

    // Function to skip typing animation
    function skipTypingAnimation() {
        if (typingInProgress) {
            skipTyping = true; // Set skip flag
            const currentParagraph = paragraphs[currentParagraphIndex];
            currentParagraph.textContent = currentParagraph.getAttribute('data-text'); // Show full text immediately
            currentParagraph.appendChild(cursor); // Ensure cursor is at the end
            // If typing was not in progress, move to the next paragraph
            if (!typingInProgress) {
                startTypingNextParagraph();
            }
        }
    }

    // Skip typing animation when space bar is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === " " && typingInProgress) {
            event.preventDefault(); // Prevent default space bar action (page scroll)
            skipTypingAnimation();
        }
    });


    let touchStartY = 0;
    let touchEndY = 0;
    const threshold = 10; // Threshold to distinguish between tap and scroll

    document.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function(event) {
        touchEndY = event.changedTouches[0].clientY;

        // Check if the touch movement is within the threshold to consider it a tap
        if (Math.abs(touchStartY - touchEndY) < threshold) {
            // It's a tap, show the paragraph
            skipTypingAnimation();
        }
        // Otherwise, it's a scroll or swipe, do nothing
    }, { passive: true });    

    // Store the original texts in a data attribute and clear paragraphs
    paragraphs.forEach(p => {
        p.setAttribute('data-text', p.textContent); // Store original text in data attribute
        p.textContent = ''; // Clear the text content
    });

    // Start typing with the first paragraph
    if (paragraphs.length > 0) {
        typingInProgress = true; // Typing starts
        const firstParagraph = paragraphs[0];
        typeOutText(firstParagraph.getAttribute('data-text'), firstParagraph, 0, startTypingNextParagraph);
    }
});