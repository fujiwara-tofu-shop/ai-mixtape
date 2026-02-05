// AI MIXTAPE - 12 Procedurally Generated Beats
// No samples, pure Web Audio API synthesis

const tracks = [
  { id: 1, title: "BOOM BAP CLASSIC", genre: "90s Hip Hop", bpm: 90, generator: boomBapClassic },
  { id: 2, title: "LOFI NIGHTS", genre: "Lofi Chill", bpm: 75, generator: lofiNights },
  { id: 3, title: "TRAP HOUSE", genre: "Trap", bpm: 140, generator: trapHouse },
  { id: 4, title: "JAZZ CAFE", genre: "Jazzy Hip Hop", bpm: 85, generator: jazzCafe },
  { id: 5, title: "DARK DRILL", genre: "UK Drill", bpm: 145, generator: darkDrill },
  { id: 6, title: "FUNK SOUL BROTHER", genre: "Old School Funk", bpm: 100, generator: funkSoul },
  { id: 7, title: "CLOUD WALKING", genre: "Cloud Rap", bpm: 70, generator: cloudWalking },
  { id: 8, title: "DUSTY CRATES", genre: "Boom Bap", bpm: 88, generator: dustyCrates },
  { id: 9, title: "TRAP SOUL VIBES", genre: "Trap Soul", bpm: 65, generator: trapSoul },
  { id: 10, title: "PHONK DRIFT", genre: "Phonk", bpm: 130, generator: phonkDrift },
  { id: 11, title: "NEO SOUL SUNSET", genre: "Neo Soul", bpm: 95, generator: neoSoul },
  { id: 12, title: "MIDNIGHT TOFU RUN", genre: "Night Drive", bpm: 82, generator: midnightRun }
];

let audioCtx = null;
let currentTrack = null;
let isPlaying = false;
let stopFunctions = [];
let animationId = null;

// Initialize
function init() {
  renderTracklist();
  setupControls();
  setupVisualizer();
}

function renderTracklist() {
  const list = document.getElementById('tracklist');
  list.innerHTML = tracks.map(t => `
    <div class="track" data-id="${t.id}">
      <div class="track-num">${String(t.id).padStart(2, '0')}</div>
      <div class="track-info">
        <div class="track-title">${t.title}</div>
        <div class="track-genre">${t.genre}</div>
      </div>
      <div class="track-bpm">${t.bpm} BPM</div>
    </div>
  `).join('');
  
  list.querySelectorAll('.track').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.id);
      playTrack(id);
    });
  });
}

function setupControls() {
  document.getElementById('playBtn').addEventListener('click', togglePlay);
  document.getElementById('prevBtn').addEventListener('click', prevTrack);
  document.getElementById('nextBtn').addEventListener('click', nextTrack);
}

function setupVisualizer() {
  const viz = document.getElementById('visualizer');
  for (let i = 0; i < 32; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = '5px';
    viz.appendChild(bar);
  }
}

function updateVisualizer() {
  if (!isPlaying) return;
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    const h = Math.random() * 40 + 5;
    bar.style.height = h + 'px';
  });
  animationId = requestAnimationFrame(updateVisualizer);
}

function togglePlay() {
  if (isPlaying) {
    stopAll();
  } else if (currentTrack) {
    playTrack(currentTrack.id);
  } else {
    playTrack(1);
  }
}

function prevTrack() {
  if (!currentTrack) return playTrack(1);
  const idx = tracks.findIndex(t => t.id === currentTrack.id);
  const prev = idx > 0 ? tracks[idx - 1] : tracks[tracks.length - 1];
  playTrack(prev.id);
}

function nextTrack() {
  if (!currentTrack) return playTrack(1);
  const idx = tracks.findIndex(t => t.id === currentTrack.id);
  const next = idx < tracks.length - 1 ? tracks[idx + 1] : tracks[0];
  playTrack(next.id);
}

function playTrack(id) {
  stopAll();
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  currentTrack = tracks.find(t => t.id === id);
  isPlaying = true;
  
  // Update UI
  document.getElementById('nowTitle').textContent = currentTrack.title;
  document.getElementById('nowSub').textContent = `${currentTrack.genre} • ${currentTrack.bpm} BPM`;
  document.getElementById('playBtn').textContent = '⏸';
  
  document.querySelectorAll('.track').forEach(el => {
    el.classList.toggle('playing', parseInt(el.dataset.id) === id);
  });
  
  // Start beat
  const stopFn = currentTrack.generator(audioCtx, currentTrack.bpm);
  stopFunctions.push(stopFn);
  
  updateVisualizer();
}

function stopAll() {
  isPlaying = false;
  stopFunctions.forEach(fn => fn && fn());
  stopFunctions = [];
  document.getElementById('playBtn').textContent = '▶';
  if (animationId) cancelAnimationFrame(animationId);
  document.querySelectorAll('.bar').forEach(b => b.style.height = '5px');
}

// ========== BEAT GENERATORS ==========

function createMaster(ctx) {
  const master = ctx.createGain();
  master.gain.value = 0.3;
  master.connect(ctx.destination);
  return master;
}

// 1. BOOM BAP CLASSIC
function boomBapClassic(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.25);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1.5);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1500;
    const gain = ctx.createGain();
    gain.gain.value = 0.6;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time, open = false) {
    const noise = ctx.createBufferSource();
    const len = ctx.sampleRate * (open ? 0.15 : 0.04);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 2);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8000;
    const gain = ctx.createGain();
    gain.gain.value = 0.2;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function bass(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.setValueAtTime(0.5, time + beatTime * 0.9);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + beatTime);
  }
  
  const bassNotes = [55, 55, 73.42, 82.41];
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const bn = bassNotes[bar % bassNotes.length];
    
    kick(t); hat(t); bass(t, bn);
    hat(t + beatTime * 0.5);
    snare(t + beatTime); hat(t + beatTime);
    kick(t + beatTime * 1.5); hat(t + beatTime * 1.5);
    kick(t + beatTime * 2); hat(t + beatTime * 2); bass(t + beatTime * 2, bn * 1.5);
    hat(t + beatTime * 2.5);
    snare(t + beatTime * 3); hat(t + beatTime * 3, true);
    kick(t + beatTime * 3.5);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 2. LOFI NIGHTS
function lofiNights(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  // Vinyl crackle
  const crackleGain = ctx.createGain();
  crackleGain.gain.value = 0.08;
  crackleGain.connect(master);
  
  function crackle() {
    if (!running) return;
    if (Math.random() > 0.7) {
      const noise = ctx.createBufferSource();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.random();
      noise.buffer = buffer;
      noise.connect(crackleGain);
      noise.start();
    }
    setTimeout(crackle, 50 + Math.random() * 100);
  }
  crackle();
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);
    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.3);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 2);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 1;
    const gain = ctx.createGain();
    gain.gain.value = 0.35;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 3);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;
    const gain = ctx.createGain();
    gain.gain.value = 0.1;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  // Lofi piano chord
  function chord(time, notes) {
    const chordGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    chordGain.gain.setValueAtTime(0.15, time);
    chordGain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 3.5);
    filter.connect(chordGain);
    chordGain.connect(master);
    
    notes.forEach(f => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = f * (0.998 + Math.random() * 0.004);
      osc.connect(filter);
      osc.start(time);
      osc.stop(time + beatTime * 4);
    });
  }
  
  const chords = [
    [164.81, 196, 246.94, 293.66], // Em7
    [146.83, 185, 220, 277.18],    // Dm7
    [130.81, 164.81, 196, 246.94], // Cmaj7
    [146.83, 174.61, 220, 261.63]  // Dm
  ];
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    
    kick(t);
    if (bar % 2 === 0) chord(t, chords[Math.floor(bar/2) % chords.length]);
    hat(t + beatTime * 0.5);
    snare(t + beatTime); hat(t + beatTime);
    hat(t + beatTime * 1.5);
    kick(t + beatTime * 2); hat(t + beatTime * 2);
    hat(t + beatTime * 2.5);
    snare(t + beatTime * 3);
    kick(t + beatTime * 3.5); hat(t + beatTime * 3.5);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 3. TRAP HOUSE
function trapHouse(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(200, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);
    gain.gain.setValueAtTime(1.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.4);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    const gain = ctx.createGain();
    gain.gain.value = 0.5;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 4);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 9000;
    const gain = ctx.createGain();
    gain.gain.value = 0.15;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function bass808(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.8);
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.8);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.8);
  }
  
  let step = 0;
  const bassPattern = [55, 0, 0, 55, 0, 0, 55, 0, 55, 0, 0, 0, 55, 0, 55, 0];
  const kickPattern = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0];
  const snarePattern = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
  const hatPattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const sixteenth = beatTime / 4;
    
    for (let i = 0; i < 16; i++) {
      const time = t + sixteenth * i;
      if (kickPattern[i]) kick(time);
      if (snarePattern[i]) snare(time);
      if (hatPattern[i]) hat(time);
      if (bassPattern[i]) bass808(time, bassPattern[i]);
    }
    
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 4. JAZZ CAFE
function jazzCafe(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(100, time);
    osc.frequency.exponentialRampToValueAtTime(50, time + 0.08);
    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.2);
  }
  
  function brush(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function ride(time) {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 400;
    osc2.type = 'triangle';
    osc2.frequency.value = 412;
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.3);
    osc2.stop(time + 0.3);
  }
  
  function bass(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 0.9);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + beatTime);
  }
  
  function piano(time, notes) {
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2500;
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 1);
    filter.connect(gain);
    gain.connect(master);
    notes.forEach(f => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = f;
      osc.connect(filter);
      osc.start(time);
      osc.stop(time + 1);
    });
  }
  
  const chords = [
    [261.63, 329.63, 392, 493.88],   // Cmaj7
    [220, 277.18, 329.63, 415.30],   // Am7
    [293.66, 349.23, 440, 523.25],   // Dm7
    [392, 493.88, 587.33, 739.99]    // G7
  ];
  const bassNotes = [65.41, 55, 73.42, 98];
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const swing = beatTime * 0.15;
    
    kick(t);
    ride(t);
    bass(t, bassNotes[bar % 4]);
    if (bar % 2 === 0) piano(t, chords[(bar/2) % 4]);
    
    ride(t + beatTime * 0.5 + swing);
    brush(t + beatTime);
    ride(t + beatTime);
    ride(t + beatTime * 1.5 + swing);
    kick(t + beatTime * 2);
    ride(t + beatTime * 2);
    bass(t + beatTime * 2, bassNotes[bar % 4] * 1.5);
    ride(t + beatTime * 2.5 + swing);
    brush(t + beatTime * 3);
    ride(t + beatTime * 3);
    ride(t + beatTime * 3.5 + swing);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 5. DARK DRILL
function darkDrill(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.3);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1.2);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1800;
    const gain = ctx.createGain();
    gain.gain.value = 0.45;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time, accent = false) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.025, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 3);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8500;
    const gain = ctx.createGain();
    gain.gain.value = accent ? 0.18 : 0.1;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function bass(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.3);
  }
  
  // UK Drill sliding 808
  const slidePattern = [
    { note: 36.71, slide: false },
    { note: 36.71, slide: false },
    { note: 41.20, slide: true },
    { note: 36.71, slide: false }
  ];
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const triplet = beatTime / 3;
    
    // Drill hi-hat pattern (triplet feel)
    for (let i = 0; i < 12; i++) {
      hat(t + triplet * i, i % 3 === 0);
    }
    
    kick(t);
    bass(t, slidePattern[bar % 4].note);
    snare(t + beatTime);
    kick(t + beatTime * 1.75);
    snare(t + beatTime * 3);
    kick(t + beatTime * 3.5);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 6. FUNK SOUL BROTHER
function funkSoul(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.1);
    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.25);
  }
  
  function snare(time, ghost = false) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1.5);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1200;
    const gain = ctx.createGain();
    gain.gain.value = ghost ? 0.15 : 0.4;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time, open = false) {
    const noise = ctx.createBufferSource();
    const len = ctx.sampleRate * (open ? 0.12 : 0.03);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, open ? 1 : 3);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7500;
    const gain = ctx.createGain();
    gain.gain.value = open ? 0.15 : 0.12;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function bass(time, freq, dur) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 3;
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.setValueAtTime(0.4, time + dur - 0.03);
    gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + dur);
  }
  
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const eighth = beatTime / 2;
    
    // Funky syncopated pattern
    kick(t); hat(t);
    bass(t, 55, eighth * 1.5);
    hat(t + eighth);
    snare(t + beatTime); hat(t + beatTime);
    snare(t + beatTime + eighth, true); hat(t + beatTime + eighth);
    kick(t + beatTime * 1.75);
    bass(t + beatTime * 1.75, 82.41, eighth);
    kick(t + beatTime * 2); hat(t + beatTime * 2, true);
    bass(t + beatTime * 2, 55, eighth);
    hat(t + beatTime * 2 + eighth);
    snare(t + beatTime * 3); hat(t + beatTime * 3);
    kick(t + beatTime * 3.25);
    bass(t + beatTime * 3.25, 73.42, eighth);
    hat(t + beatTime * 3.5);
    kick(t + beatTime * 3.75);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 7. CLOUD WALKING
function cloudWalking(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  // Reverb simulation
  const convolver = ctx.createConvolver();
  const reverbLen = ctx.sampleRate * 2;
  const reverbBuffer = ctx.createBuffer(2, reverbLen, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = reverbBuffer.getChannelData(ch);
    for (let i = 0; i < reverbLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/reverbLen, 2);
    }
  }
  convolver.buffer = reverbBuffer;
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.3;
  convolver.connect(reverbGain);
  reverbGain.connect(master);
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(80, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.2);
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.5);
  }
  
  function clap(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 2);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1500;
    filter.Q.value = 1;
    const gain = ctx.createGain();
    gain.gain.value = 0.3;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    gain.connect(convolver);
    noise.start(time);
  }
  
  function pad(time, notes) {
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.setValueAtTime(0.08, time + beatTime * 7);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 8);
    filter.connect(gain);
    gain.connect(master);
    gain.connect(convolver);
    
    notes.forEach(f => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc.type = 'sine';
      osc2.type = 'sine';
      osc.frequency.value = f;
      osc2.frequency.value = f * 1.003;
      osc.connect(filter);
      osc2.connect(filter);
      osc.start(time);
      osc2.start(time);
      osc.stop(time + beatTime * 8);
      osc2.stop(time + beatTime * 8);
    });
  }
  
  const chords = [
    [130.81, 164.81, 196, 246.94],
    [123.47, 155.56, 185, 233.08],
    [110, 138.59, 164.81, 207.65],
    [116.54, 146.83, 174.61, 220]
  ];
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    
    kick(t);
    if (bar % 2 === 0) pad(t, chords[(bar/2) % 4]);
    clap(t + beatTime * 2);
    kick(t + beatTime * 2.5);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 8. DUSTY CRATES
function dustyCrates(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  // Extra dusty vinyl
  const dustGain = ctx.createGain();
  dustGain.gain.value = 0.12;
  dustGain.connect(master);
  
  function dust() {
    if (!running) return;
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.01, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.random() * 0.5;
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    noise.connect(filter);
    filter.connect(dustGain);
    noise.start();
    setTimeout(dust, 30 + Math.random() * 70);
  }
  dust();
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
    gain.gain.setValueAtTime(0.85, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.25);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1.8);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.value = 0.45;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.035, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 2.5);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6500;
    const gain = ctx.createGain();
    gain.gain.value = 0.12;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function bass(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    filter.type = 'lowpass';
    filter.frequency.value = 350;
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 0.8);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + beatTime);
  }
  
  const bassLine = [55, 55, 82.41, 73.42, 55, 55, 82.41, 61.74];
  let step = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    
    kick(t); hat(t);
    bass(t, bassLine[step % 8]);
    hat(t + beatTime * 0.5);
    snare(t + beatTime); hat(t + beatTime);
    kick(t + beatTime * 1.5); hat(t + beatTime * 1.5);
    kick(t + beatTime * 2); hat(t + beatTime * 2);
    bass(t + beatTime * 2, bassLine[step % 8] * 1.5);
    hat(t + beatTime * 2.5);
    snare(t + beatTime * 3); hat(t + beatTime * 3);
    hat(t + beatTime * 3.5);
    
    step++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 9. TRAP SOUL VIBES
function trapSoul(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(100, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.15);
    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.4);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1.2);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1400;
    const gain = ctx.createGain();
    gain.gain.value = 0.35;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.025, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 4);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 9000;
    const gain = ctx.createGain();
    gain.gain.value = 0.1;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function bass808(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 1);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 1);
  }
  
  function keys(time, notes) {
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1800;
    gain.gain.setValueAtTime(0.1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 3);
    filter.connect(gain);
    gain.connect(master);
    notes.forEach(f => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(filter);
      osc.start(time);
      osc.stop(time + beatTime * 3);
    });
  }
  
  const chords = [
    [261.63, 311.13, 392],
    [233.08, 277.18, 349.23],
    [220, 261.63, 329.63],
    [246.94, 293.66, 369.99]
  ];
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const sixteenth = beatTime / 4;
    
    kick(t);
    bass808(t, 55);
    if (bar % 2 === 0) keys(t, chords[(bar/2) % 4]);
    for (let i = 0; i < 16; i++) hat(t + sixteenth * i);
    snare(t + beatTime);
    kick(t + beatTime * 1.75);
    kick(t + beatTime * 2.5);
    snare(t + beatTime * 3);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 10. PHONK DRIFT
function phonkDrift(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(200, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);
    gain.gain.setValueAtTime(1.1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.35);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2500;
    const gain = ctx.createGain();
    gain.gain.value = 0.55;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function cowbell(time) {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc2.type = 'square';
    osc.frequency.value = 587;
    osc2.frequency.value = 845;
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.08);
    osc2.stop(time + 0.08);
  }
  
  function bass(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    filter.type = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value = 8;
    gain.gain.setValueAtTime(0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.4);
  }
  
  // Dark synth stab
  function stab(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, time);
    filter.frequency.exponentialRampToValueAtTime(200, time + 0.2);
    filter.Q.value = 5;
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.2);
  }
  
  let bar = 0;
  const stabNotes = [146.83, 138.59, 130.81, 123.47];
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const eighth = beatTime / 2;
    
    kick(t);
    bass(t, 36.71);
    cowbell(t);
    if (bar % 4 === 0) stab(t, stabNotes[(bar/4) % 4]);
    cowbell(t + eighth);
    snare(t + beatTime);
    cowbell(t + beatTime);
    kick(t + beatTime + eighth);
    cowbell(t + beatTime + eighth);
    kick(t + beatTime * 2);
    cowbell(t + beatTime * 2);
    bass(t + beatTime * 2, 36.71);
    cowbell(t + beatTime * 2 + eighth);
    snare(t + beatTime * 3);
    cowbell(t + beatTime * 3);
    kick(t + beatTime * 3 + eighth);
    cowbell(t + beatTime * 3 + eighth);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 11. NEO SOUL SUNSET
function neoSoul(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.1);
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.25);
  }
  
  function snare(time, ghost = false) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 2);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2200;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.value = ghost ? 0.15 : 0.35;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time, open = false) {
    const noise = ctx.createBufferSource();
    const len = ctx.sampleRate * (open ? 0.1 : 0.03);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, open ? 1.5 : 3);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8000;
    const gain = ctx.createGain();
    gain.gain.value = 0.1;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function rhodes(time, notes) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 3);
    gain.connect(master);
    
    notes.forEach(freq => {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc.type = 'sine';
      osc2.type = 'sine';
      osc.frequency.value = freq;
      osc2.frequency.value = freq * 2;
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.value = 0.3;
      osc.connect(gain);
      osc2.connect(osc2Gain);
      osc2Gain.connect(gain);
      osc.start(time);
      osc2.start(time);
      osc.stop(time + beatTime * 3);
      osc2.stop(time + beatTime * 3);
    });
  }
  
  function bass(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 0.9);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + beatTime);
  }
  
  const chords = [
    [293.66, 349.23, 440, 523.25],   // Dm9
    [261.63, 329.63, 392, 493.88],   // Cmaj9
    [233.08, 293.66, 349.23, 440],   // Bbmaj7
    [220, 277.18, 329.63, 415.30]    // Am9
  ];
  const bassNotes = [73.42, 65.41, 58.27, 55];
  let bar = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    const swing = beatTime * 0.12;
    
    kick(t); hat(t);
    bass(t, bassNotes[bar % 4]);
    rhodes(t, chords[bar % 4]);
    hat(t + beatTime * 0.5 + swing);
    snare(t + beatTime, true); hat(t + beatTime);
    hat(t + beatTime * 1.5 + swing);
    kick(t + beatTime * 2); hat(t + beatTime * 2, true);
    bass(t + beatTime * 2, bassNotes[bar % 4] * 1.5);
    hat(t + beatTime * 2.5 + swing);
    snare(t + beatTime * 3); hat(t + beatTime * 3);
    kick(t + beatTime * 3.5);
    hat(t + beatTime * 3.5 + swing);
    
    bar++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// 12. MIDNIGHT TOFU RUN
function midnightRun(ctx, bpm) {
  const master = createMaster(ctx);
  const beatTime = 60 / bpm;
  let running = true;
  
  function kick(time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
    gain.gain.setValueAtTime(0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + 0.3);
  }
  
  function snare(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 1.5);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1600;
    const gain = ctx.createGain();
    gain.gain.value = 0.4;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function hat(time) {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/data.length, 3);
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7500;
    const gain = ctx.createGain();
    gain.gain.value = 0.12;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(time);
  }
  
  function bass(time, freq) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    filter.Q.value = 4;
    gain.gain.setValueAtTime(0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 0.9);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + beatTime);
  }
  
  // Synthwave lead
  function lead(time, freq) {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 1.005;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, time);
    filter.frequency.exponentialRampToValueAtTime(500, time + beatTime * 2);
    filter.Q.value = 3;
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + beatTime * 2);
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc2.start(time);
    osc.stop(time + beatTime * 2);
    osc2.stop(time + beatTime * 2);
  }
  
  // Pad
  const padGain = ctx.createGain();
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 600;
  padGain.gain.value = 0.08;
  padFilter.connect(padGain);
  padGain.connect(master);
  
  [164.81, 196, 246.94, 293.66].forEach(f => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = f;
    osc.connect(padFilter);
    osc.start();
  });
  
  const bassLine = [55, 55, 82.41, 73.42, 55, 55, 82.41, 61.74];
  const leadNotes = [329.63, 392, 493.88, 440, 392, 329.63, 293.66, 329.63];
  let step = 0;
  
  function schedule() {
    if (!running) return;
    const t = ctx.currentTime + 0.05;
    
    kick(t); hat(t);
    bass(t, bassLine[step % 8]);
    if (step % 4 === 0) lead(t, leadNotes[(step/4) % 8]);
    hat(t + beatTime * 0.5);
    snare(t + beatTime); hat(t + beatTime);
    kick(t + beatTime * 1.5); hat(t + beatTime * 1.5);
    kick(t + beatTime * 2); hat(t + beatTime * 2);
    bass(t + beatTime * 2, bassLine[step % 8] * 1.5);
    hat(t + beatTime * 2.5);
    snare(t + beatTime * 3); hat(t + beatTime * 3);
    hat(t + beatTime * 3.5);
    
    step++;
    setTimeout(schedule, beatTime * 4 * 1000 - 50);
  }
  
  schedule();
  return () => { running = false; };
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
