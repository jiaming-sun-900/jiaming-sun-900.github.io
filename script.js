const canvas = document.getElementById('vectorField');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let mouse = { x: -1000, y: -1000 };

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
        const spacing = 55;
        ctx.strokeStyle = '#FF4500';
        ctx.lineWidth = 1.2;

        for (let x = spacing / 2; x < canvas.width; x += spacing) {
            for (let y = spacing / 2; y < canvas.height; y += spacing) {
                const angle = Math.atan2(mouse.y - y, mouse.x - x);
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(-7, 0);
                ctx.lineTo(7, 0);
                ctx.lineTo(4, -3); // Engineering arrow head
                ctx.stroke();
                ctx.restore();
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}
