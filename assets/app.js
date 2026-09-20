/**
 * ====================================================================
 * 🌸 MAIN APP LOGIC (โหมด Massive Giant Heart & Secret Love Note)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG is not loaded. Please check config.js.');
    return;
  }

  // 1. Render All Data from CONFIG
  initRenderData();

  // 2. Massive Giant Heart Click & Petal Wind Blow Dissolve
  initHolyHeartStage();

  // 3. Live Days Counter
  initCounter();

  // 4. Background Particles
  initCanvasBackground();
});

/* ====================================================================
 * 1. RENDER DATA FROM CONFIG
 * ==================================================================== */
function initRenderData() {
  const partnerName = CONFIG.partnerName || "เธอ";
  const yourName = CONFIG.yourName || "เรา";

  document.title = `For ${partnerName} 💖 | Special Someone`;

  // Holy Heart Hint
  if (CONFIG.heartHintText) {
    document.getElementById('heartHintText').textContent = CONFIG.heartHintText;
  }

  // Note Greeting, Body & Signature
  document.getElementById('noteGreeting').textContent = CONFIG.note.greeting || `ถึง ${partnerName}...`;
  document.getElementById('noteBody').innerHTML = (CONFIG.note.body || "").replace(/\n/g, '<br>');
  document.getElementById('noteSignature').textContent = CONFIG.note.signature || `จาก ${yourName} 💖`;

  // Optional Note Photo inside Note
  const photoWrapper = document.getElementById('notePhotoWrapper');
  const photoImg = document.getElementById('notePhoto');
  if (CONFIG.note.photo) {
    photoImg.src = CONFIG.note.photo;
  } else {
    photoWrapper.style.display = 'none';
  }
}

/* ====================================================================
 * 2. MASSIVE GIANT HEART CLICK & PETAL WIND BLOW DISSOLVE
 * ==================================================================== */
function initHolyHeartStage() {
  const holyHeartStage = document.getElementById('holyHeartStage');
  const holyHeartWrapper = document.getElementById('holyHeartWrapper');
  const secretNoteContainer = document.getElementById('secretNoteContainer');
  const holyGiantHeart = document.getElementById('holyGiantHeart');

  let hasOpened = false;

  holyHeartWrapper.addEventListener('click', () => {
    if (hasOpened) return;
    hasOpened = true;

    // Trigger Massive Heart Dissolve Animation
    holyHeartStage.classList.add('dissolving');

    // Create Wind-Blown Flower Petals & Radiant Particles Effect
    createWindBlownPetals(holyGiantHeart);

    // Reveal Secret Love Note smoothly after dissolve
    setTimeout(() => {
      holyHeartStage.classList.add('hidden');
      secretNoteContainer.classList.remove('hidden');

      requestAnimationFrame(() => {
        secretNoteContainer.classList.add('visible');
      });
    }, 900);
  });
}

/* Flower Petal & Radiant Light Particle Effect */
function createWindBlownPetals(sourceElement) {
  const rect = sourceElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const petalTypes = ['🌸', '🌺', '🤍', '💖', '✨', '🍃', '🌷', '🌸', '✨', '💖'];
  const totalPetals = 75;

  for (let i = 0; i < totalPetals; i++) {
    const petal = document.createElement('div');
    petal.className = 'wind-petal';
    petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];

    const startOffsetX = (Math.random() - 0.5) * 160;
    const startOffsetY = (Math.random() - 0.5) * 160;
    
    petal.style.left = (centerX + startOffsetX) + 'px';
    petal.style.top = (centerY + startOffsetY) + 'px';
    petal.style.fontSize = (Math.random() * 26 + 18) + 'px';

    const dxMid = Math.random() * 220 + 100;
    const dyMid = -(Math.random() * 160 + 70);
    const dxEnd = Math.random() * 550 + 280;
    const dyEnd = -(Math.random() * 450 + 180);
    const rotMid = Math.random() * 360;
    const rotEnd = Math.random() * 720 + 360;
    const duration = (Math.random() * 1.3 + 1.8) + 's';
    const delay = (Math.random() * 0.45) + 's';

    petal.style.setProperty('--dx-mid', `${dxMid}px`);
    petal.style.setProperty('--dy-mid', `${dyMid}px`);
    petal.style.setProperty('--dx-end', `${dxEnd}px`);
    petal.style.setProperty('--dy-end', `${dyEnd}px`);
    petal.style.setProperty('--rot-mid', `${rotMid}deg`);
    petal.style.setProperty('--rot-end', `${rotEnd}deg`);
    petal.style.setProperty('--duration', duration);
    petal.style.animationDelay = delay;

    document.body.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 3400);
  }
}

/* ====================================================================
 * 3. LIVE COUNTER
 * ==================================================================== */
function initCounter() {
  const startDateStr = CONFIG.startDate;
  const startDate = new Date(startDateStr);

  function updateTimer() {
    const now = new Date();
    const diffMs = now - startDate;

    if (isNaN(diffMs) || diffMs < 0) {
      document.getElementById('daysCount').textContent = "0";
      document.getElementById('hoursCount').textContent = "00";
      document.getElementById('minutesCount').textContent = "00";
      return;
    }

    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    document.getElementById('daysCount').textContent = days;
    document.getElementById('hoursCount').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutesCount').textContent = minutes < 10 ? '0' + minutes : minutes;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ====================================================================
 * 4. CANVAS BACKGROUND (FLOATING AMBIENT SPARKLES)
 * ==================================================================== */
function initCanvasBackground() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 30;

  class HeartParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 1.2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.4 + 0.2;
      this.color = ['#ffb7c5', '#ff9ebb', '#ffd1dc', '#ffaec9', '#f9c5d1'][Math.floor(Math.random() * 5)];
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.02) * 0.5 + this.speedX;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.font = `${this.size}px sans-serif`;
      ctx.fillText('🤍', this.x, this.y);
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new HeartParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
