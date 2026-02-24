const canvas = document.getElementById('vectorField');
const ctx = canvas.getContext('2d');
let mouse = { x: -100, y: -100 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', resize);
resize();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const spacing = 40;
    ctx.strokeStyle = '#FF4500';
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            const angle = Math.atan2(mouse.y - y, mouse.x - x);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-5, 0);
            ctx.lineTo(5, 0);
            ctx.lineTo(2, -2); // Arrow head
            ctx.stroke();
            ctx.restore();
        }
    }
    requestAnimationFrame(draw);
}

draw();
