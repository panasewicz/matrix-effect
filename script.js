const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const word = "PANASEWICZ";
let letters = Array.from(word);
const drops = Array(word.length).fill(-1);
const dropSpeeds = Array(word.length).fill(0);
let displayTime = 0;

ctx.font = '26px "Courier New bold"';

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00';

    let additionalOffset = 0;

    for (let i = 0; i < letters.length; i++) {
        let xOffset = i * 26 + additionalOffset;

        if (letters[i] === "I") {
            additionalOffset += 5;  // Dodajemy dodatkowy odstęp dla litery "I" i dla wszystkich kolejnych liter
        }

        if (drops[i] < (canvas.height / 4) && drops[i] >= 0) {
            ctx.fillText(letters[i], xOffset, drops[i]);
            drops[i] += dropSpeeds[i];
        } else if (drops[i] >= (canvas.height / 4) && drops[i] !== -1) {
            ctx.fillText(letters[i], xOffset, canvas.height / 4);
        }
    }

    // Start next letter drop
    for (let i = 0; i < letters.length; i++) {
        if (drops[i] === -1 && (i === 0 || drops[i - 1] > 75)) {
            drops[i] = 0;
            dropSpeeds[i] = Math.random() * 5 + 5;
            break;
        }
    }

    // Check if all letters are at 1/4 of the screen
    if (drops.every(d => d >= canvas.height / 4 || d === -1)) {
        displayTime++;

        if (displayTime >= 60) {
            // Reset for next cycle after 3 seconds
            for (let i = 0; i < letters.length; i++) {
                drops[i] = -1;
                dropSpeeds[i] = 0;
            }
            displayTime = 0;
        }
    }
}

setInterval(drawMatrix, 50);  // 20 frames per second


