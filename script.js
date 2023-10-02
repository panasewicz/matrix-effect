const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = canvas.width / 10; // szerokość każdej kolumny
const drops = []; // przechowuje obecną pozycję spadania każdej kolumny

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // tło
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00'; // kolor liter
    ctx.font = '10px Courier New';

    for (let i = 0; i < drops.length; i++) {
        const text = 'PANASEWICZ'[Math.floor(Math.random() * 'PANASEWICZ'.length)]; // wybierz losową literę
        ctx.fillText(text, i * 10, drops[i] * 10); // rysuj literę

        if (drops[i] * 10 > canvas.height || Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33); // aktualizuj co 33 ms
