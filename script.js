const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionBox = document.getElementById('question-box');
const successBox = document.getElementById('success-box');

let yesScale = 1;
const phrases = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
];

let phraseIndex = 0;

noBtn.addEventListener('click', () => {
    // Make YES button bigger
    yesScale += 0.5;
    yesBtn.style.transform = `scale(${yesScale})`;
    
    // Optional: Make NO button move or text change? 
    // Let's change text for extra goofiness
    phraseIndex = (phraseIndex + 1) % phrases.length;
    noBtn.innerText = phrases[phraseIndex];

    // Optional: Reset NO button size to avoid it taking too much attention, 
    // or let it stay standard size while YES grows.
});

yesBtn.addEventListener('click', () => {
    questionBox.classList.add('hidden');
    successBox.classList.remove('hidden');
    
    // Add some confetti if we can? 
    // For now, simplicity is key, the CSS animation handles the pop-in.
    document.body.style.backgroundColor = "#4ecdc4"; // Change bg to success color
});
