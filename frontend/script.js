// Particle animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#FF6B6B', '#FFD93D', '#6BCB77'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 5 + 2;
        this.speedY = Math.random() * 1 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.y -= this.speedY;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles(num) {
    for (let i = 0; i < num; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles(120);
animate();

// Stress slider dynamic value
const stressSlider = document.getElementById('stress_level');
const stressValue = document.getElementById('stress_value');
stressSlider.addEventListener('input', () => {
    stressValue.textContent = stressSlider.value;
});

// FastAPI integration
document.getElementById('predict-btn').addEventListener('click', async () => {
    const data = {
        age: parseInt(document.getElementById('age').value),
        gender: parseInt(document.getElementById('gender').value),
        sleep_hours: parseFloat(document.getElementById('sleep_hours').value),
        stress_level: parseInt(document.getElementById('stress_level').value),
        weight_kg: parseFloat(document.getElementById('weight_kg').value)
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById('prediction').textContent = result.predict.toFixed(2);
    } catch (error) {
        alert('Error fetching prediction: ' + error);
    }
});
