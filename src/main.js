import { audioManager } from './audio/AudioManager.js';
import { tracks } from './audio/tracks.js';

let currentTrack = null;
let isPlaying = false;
let animationId = null;

// DOM elements
const tracklist = document.getElementById('tracklist');
const nowTitle = document.getElementById('nowTitle');
const nowSub = document.getElementById('nowSub');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const visualizer = document.getElementById('visualizer');

// Initialize
function init() {
  renderTracklist();
  setupControls();
  setupVisualizer();
}

function renderTracklist() {
  tracklist.innerHTML = tracks.map(t => `
    <div class="track" data-id="${t.id}">
      <div class="track-num">${String(t.id).padStart(2, '0')}</div>
      <div class="track-info">
        <div class="track-title">${t.title}</div>
        <div class="track-genre">${t.genre}</div>
      </div>
      <div class="track-bpm">${t.bpm} BPM</div>
    </div>
  `).join('');
  
  tracklist.querySelectorAll('.track').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.id);
      playTrack(id);
    });
  });
}

function setupControls() {
  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
}

function setupVisualizer() {
  for (let i = 0; i < 32; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = '5px';
    visualizer.appendChild(bar);
  }
}

function updateVisualizer() {
  if (!isPlaying) return;
  const bars = visualizer.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    const h = Math.random() * 40 + 5;
    bar.style.height = h + 'px';
  });
  animationId = requestAnimationFrame(updateVisualizer);
}

function togglePlay() {
  if (isPlaying) {
    stopPlayback();
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
  stopPlayback();
  
  currentTrack = tracks.find(t => t.id === id);
  isPlaying = true;
  
  // Update UI
  nowTitle.textContent = currentTrack.title;
  nowSub.textContent = `${currentTrack.genre} • ${currentTrack.bpm} BPM`;
  playBtn.textContent = '⏸';
  
  document.querySelectorAll('.track').forEach(el => {
    el.classList.toggle('playing', parseInt(el.dataset.id) === id);
  });
  
  // Start Strudel pattern
  audioManager.playTrack(currentTrack.pattern);
  
  // Start visualizer
  updateVisualizer();
}

function stopPlayback() {
  isPlaying = false;
  audioManager.stop();
  playBtn.textContent = '▶';
  if (animationId) cancelAnimationFrame(animationId);
  visualizer.querySelectorAll('.bar').forEach(b => b.style.height = '5px');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
