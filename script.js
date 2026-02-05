const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const gif = document.getElementById('valentineGif');
const buttonsContainer = document.querySelector('.buttons');

let currentFontSize = 1.2; // Default font size in rem
let clickCount = 0;

// Message chain for the No button
const messages = [
    "Are you sure?",
    "Really sure?",
    "Think again",
    "Last chance",
    "Surely not?",
    "You might regret this",
    "Give it another thought",
    "Are you absolutely certain",
    "This could be a mistake",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

let messageIndex = 0;

// Logic for clicking "No"
noBtn.addEventListener('click', () => {
    clickCount++;

    // 1. Change text
    noBtn.innerHTML = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // 2. Increase Yes button size
    currentFontSize += 1.5;
    // Important: we change font size which grows element
    yesBtn.style.fontSize = `${currentFontSize}rem`;

    // 3. Move No button logic
    if (clickCount >= 1) {
        // Bootstrap d-flex flex-wrap gap-3 mt-4 mb-5 is already applying row layout by default
        // To stack them we can just change flex-direction in JS style override
        buttonsContainer.style.flexDirection = 'column';

        // Push No button down
        // We add increasing margin to push it further down
        const currentMargin = 50 * (clickCount);
        noBtn.style.marginTop = `${currentMargin}px`;
    }
});

// Logic for clicking "Yes"
yesBtn.addEventListener('click', () => {
    question.innerHTML = "Yay!!! I love you! ❤️";
    gif.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";

    launchConfetti();

    // Hide No button
    noBtn.style.display = 'none';

    // Reset layout for final view
    yesBtn.style.fontSize = '2rem';
    // Remove margin if any was set
    // buttonsContainer.style.flexDirection = 'row'; 
});

function launchConfetti() {
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Interval that runs forever
    setInterval(function () {
        var particleCount = 50; // Constant amount every tick

        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Floating Hearts Background Logic
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-bg');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 10 + 's'; // 10-15s
    heart.style.fontSize = Math.random() * 20 + 10 + 'px'; // 10-30px

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000); // Remove after animation
}

// Create a new heart every 400ms
setInterval(createFloatingHeart, 400);


// Cursor Trail Logic
document.addEventListener('mousemove', function (e) {
    // Throttling to prevent too many elements
    if (Math.random() < 0.9) return;

    const heart = document.createElement('div');
    heart.classList.add('cursor-heart');
    heart.innerHTML = '✨'; // Sparkles or hearts
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

// Relationship Clock Logic
// Date: August 24, 2025 12:00:00 (Corrected by user)
const startDate = new Date('August 24, 2025 12:00:00').getTime();

function updateClock() {
    const now = new Date().getTime();
    const distance = now - startDate;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update HTML
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call
