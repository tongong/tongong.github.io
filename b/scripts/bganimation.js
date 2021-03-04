let PARTNUM;
const MDIST = 200;

let particles = [];
window.addEventListener("load", function() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.height = canvas.clientHeight;
        canvas.width = canvas.clientWidth;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    PARTNUM = (canvas.height + 200) * (canvas.width + 200) / 20000;

    console.log(PARTNUM);
    for (let i = 0; i < PARTNUM; i++) {
        particles.push({
            posX: Math.random() * canvas.width,
            posY: Math.random() * canvas.height,
            speedX: 5 * (Math.random() - 0.5),
            speedY: 5 * (Math.random() - 0.5),
        });
    }

    window.setInterval( () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#57cc8a';

        particles.forEach(p => {
            // render connections
            particles.forEach(s => {
                let dist = Math.hypot(p.posX-s.posX, p.posY-s.posY);
                if (s != p && dist < MDIST) {
                    ctx.globalAlpha = (1 - dist / MDIST) / 2;
                    ctx.beginPath();
                    ctx.moveTo(p.posX - 100, p.posY - 100);
                    ctx.lineTo(s.posX - 100, s.posY - 100);
                    ctx.stroke();
                }
            });

            // move
            p.posX += p.speedX;
            p.posY += p.speedY;

            // catch escaping particles
            if (p.posX > (canvas.width + 200) || p.posY > (canvas.height + 200) || p.posX < 0 || p.posY < 0) {
                switch (Math.floor(Math.random() * 4)) {
                    case 0:
                        p.posX = Math.random() * (canvas.width + 200);
                        p.posY = 0;
                        break;
                    case 1:
                        p.posX = Math.random() * (canvas.width + 200);
                        p.posY = (canvas.height + 200);
                        break;
                    case 2:
                        p.posX = 0;
                        p.posY = Math.random() * (canvas.height + 200);
                        break;
                    case 3:
                        p.posX = (canvas.width + 200);
                        p.posY = Math.random() * (canvas.height + 200);
                        break;
                }
            }
        });
    }, 10);
});
