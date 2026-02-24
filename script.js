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
        const spacing = 50;
        ctx.strokeStyle = '#FF4500';
        ctx.lineWidth = 1.5;

        for (let x = spacing / 2; x < canvas.width; x += spacing) {
            for (let y = spacing / 2; y < canvas.height; y += spacing) {
                const dx = mouse.x - x;
                const dy = mouse.y - y;
                const angle = Math.atan2(dy, dx);
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(-8, 0);
                ctx.lineTo(8, 0);
                ctx.stroke();
                ctx.restore();
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}
