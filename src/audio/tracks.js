import { stack, note, s } from '@strudel/web';

// All tracks use pure synthesis - no drum samples
// Matching the original Web Audio vibe with frequency sweeps and noise

// 1. BOOM BAP CLASSIC - 90s Hip Hop
export function boomBapClassic() {
  return stack(
    // Kick - sine with pitch drop (like original)
    note('c1 ~ ~ ~ c1 ~ c1 ~')
      .s('sine')
      .gain(0.7)
      .lpf(200)
      .decay(0.25)
      .sustain(0),
    // Snare - noise burst
    note('~ ~ c4 ~ ~ ~ c4 ~')
      .s('sawtooth')
      .gain(0.4)
      .hpf(1500)
      .decay(0.15)
      .sustain(0)
      .crush(6),
    // Hats - high noise
    note('g6*8')
      .s('sawtooth')
      .gain(0.12)
      .hpf(8000)
      .decay(0.04)
      .sustain(0),
    // Bass line
    note('a1 a1 c2 d2')
      .s('sawtooth')
      .gain(0.35)
      .lpf(400)
      .decay(0.2)
      .sustain(0.4),
    // Rhodes chords
    note('<a2,c3,e3> ~ <g2,b2,d3> ~')
      .s('triangle')
      .gain(0.1)
      .attack(0.05)
      .decay(0.4)
      .sustain(0.2)
      .lpf(2000)
  ).cpm(90).play();
}

// 2. LOFI NIGHTS - Lofi Chill
export function lofiNights() {
  return stack(
    // Soft kick
    note('c1 ~ ~ ~ c1 ~ c1 ~')
      .s('sine')
      .gain(0.5)
      .lpf(150)
      .decay(0.3)
      .sustain(0),
    // Muted snare
    note('~ ~ c3 ~ ~ ~ c3 ~')
      .s('triangle')
      .gain(0.25)
      .hpf(800)
      .lpf(3000)
      .decay(0.12)
      .sustain(0),
    // Soft hats
    note('e6*8')
      .s('sawtooth')
      .gain(0.06)
      .hpf(6000)
      .lpf(12000)
      .decay(0.03)
      .sustain(0),
    // Warm piano chords - detuned for lofi
    note('<e3,g3,b3> <d3,f3,a3> <c3,e3,g3> <d3,f3,a3>')
      .s('triangle')
      .gain(0.12)
      .attack(0.08)
      .decay(0.6)
      .sustain(0.25)
      .lpf(1200)
      .room(0.4),
    // Sub bass
    note('e2 d2 c2 d2')
      .s('sine')
      .gain(0.3)
      .lpf(300)
      .decay(0.4)
      .sustain(0.3)
  ).cpm(75).play();
}

// 3. TRAP HOUSE - Trap
export function trapHouse() {
  return stack(
    // 808 kick with pitch drop
    note('g0 ~ ~ g0 ~ ~ g0 ~')
      .s('sine')
      .gain(0.8)
      .lpf(120)
      .decay(0.4)
      .sustain(0.1),
    // Sharp snare
    note('~ ~ ~ ~ c4 ~ ~ ~')
      .s('sawtooth')
      .gain(0.45)
      .hpf(2000)
      .decay(0.2)
      .sustain(0)
      .crush(8),
    // Rolling hats
    note('a6*16')
      .s('sawtooth')
      .gain(0.1)
      .hpf(9000)
      .decay(0.02)
      .sustain(0),
    // Deep 808 bass
    note('g1 ~ ~ g1 ~ ~ a1 ~')
      .s('sine')
      .gain(0.6)
      .lpf(180)
      .decay(0.5)
      .sustain(0.2),
    // Dark pad
    note('g2,bb2,d3')
      .s('sawtooth')
      .gain(0.05)
      .lpf(500)
      .attack(0.4)
      .release(1.2)
  ).cpm(140).play();
}

// 4. JAZZ CAFE - Jazzy Hip Hop
export function jazzCafe() {
  return stack(
    // Soft kick
    note('c1 ~ ~ ~ c1 ~ ~ ~')
      .s('sine')
      .gain(0.4)
      .lpf(120)
      .decay(0.2)
      .sustain(0),
    // Brush snare
    note('~ ~ c3 ~ ~ ~ c3 ~')
      .s('triangle')
      .gain(0.2)
      .hpf(600)
      .lpf(4000)
      .decay(0.1)
      .sustain(0),
    // Ride cymbal - metallic
    note('~ e5 ~ e5 ~ e5 ~ e5')
      .s('square')
      .gain(0.06)
      .hpf(4000)
      .decay(0.15)
      .sustain(0),
    // Jazz chords (ii-V-I)
    note('<d3,f3,a3,c4> <g2,b2,d3,f3> <c3,e3,g3,b3> <c3,e3,g3,b3>')
      .s('triangle')
      .gain(0.1)
      .attack(0.06)
      .decay(0.5)
      .sustain(0.25)
      .lpf(2200)
      .room(0.3),
    // Walking bass
    note('d2 f2 g2 a2 c3 a2 g2 f2')
      .s('triangle')
      .gain(0.28)
      .lpf(500)
      .decay(0.15)
      .sustain(0.4)
  ).cpm(85).play();
}

// 5. DARK DRILL - UK Drill
export function darkDrill() {
  return stack(
    // Drill kick
    note('c1 ~ ~ ~ ~ ~ c1 ~')
      .s('sine')
      .gain(0.7)
      .lpf(150)
      .decay(0.3)
      .sustain(0),
    // Hard snare
    note('~ ~ c4 ~ ~ ~ ~ c4')
      .s('sawtooth')
      .gain(0.4)
      .hpf(1800)
      .decay(0.15)
      .sustain(0)
      .crush(7),
    // Triplet hats (drill signature)
    note('b6*12')
      .s('sawtooth')
      .gain(0.12)
      .hpf(8500)
      .decay(0.025)
      .sustain(0),
    // Sliding 808
    note('d#1 ~ ~ d#1 ~ f1 ~ ~')
      .s('sine')
      .gain(0.65)
      .lpf(140)
      .decay(0.45)
      .sustain(0.15),
    // Dark strings
    note('d#3,f#3,a#3')
      .s('sawtooth')
      .gain(0.04)
      .lpf(700)
      .attack(0.6)
      .release(2.0)
  ).cpm(145).play();
}

// 6. FUNK SOUL BROTHER - Old School Funk
export function funkSoul() {
  return stack(
    // Funky kick
    note('c1 ~ ~ ~ c1 ~ c1 ~')
      .s('sine')
      .gain(0.6)
      .lpf(180)
      .decay(0.2)
      .sustain(0),
    // Snappy snare
    note('~ ~ c4 ~ ~ ~ c4 ~')
      .s('sawtooth')
      .gain(0.35)
      .hpf(1200)
      .decay(0.1)
      .sustain(0),
    // Hats
    note('g6*8')
      .s('sawtooth')
      .gain(0.1)
      .hpf(7500)
      .decay(0.03)
      .sustain(0),
    // Slap bass
    note('e2 ~ g2 a2 ~ ~ e2 ~')
      .s('sawtooth')
      .gain(0.3)
      .lpf(700)
      .decay(0.12)
      .sustain(0.25),
    // Funky clavinet
    note('e4 ~ ~ e4 ~ g4 ~ ~')
      .s('square')
      .gain(0.08)
      .lpf(2200)
      .decay(0.08)
      .sustain(0),
    // Brass stabs
    note('~ ~ <e4,g4,b4> ~')
      .s('sawtooth')
      .gain(0.06)
      .lpf(2800)
      .attack(0.02)
      .decay(0.2)
      .sustain(0.1)
  ).cpm(100).play();
}

// 7. CLOUD WALKING - Cloud Rap
export function cloudWalking() {
  return stack(
    // Sparse deep kick
    note('c1 ~ ~ ~ ~ ~ c1 ~')
      .s('sine')
      .gain(0.55)
      .lpf(100)
      .decay(0.5)
      .sustain(0),
    // Clap with space
    note('~ ~ c3 ~')
      .s('triangle')
      .gain(0.2)
      .hpf(800)
      .decay(0.15)
      .sustain(0)
      .room(0.6),
    // Dreamy pad
    note('<c3,e3,g3,b3> <a2,c3,e3,g3>')
      .s('triangle')
      .gain(0.08)
      .attack(1.0)
      .release(2.5)
      .lpf(1400)
      .room(0.7)
      .slow(2),
    // Ethereal melody
    note('g4 ~ e4 ~ ~ ~ b4 ~')
      .s('sine')
      .gain(0.07)
      .delay(0.4)
      .delaytime(0.5)
      .delayfeedback(0.5)
      .lpf(2200)
      .slow(2),
    // Sub bass
    note('c2 ~ ~ ~ a1 ~ ~ ~')
      .s('sine')
      .gain(0.4)
      .lpf(180)
      .decay(0.6)
      .sustain(0.2)
      .slow(2)
  ).cpm(70).play();
}

// 8. DUSTY CRATES - Boom Bap
export function dustyCrates() {
  return stack(
    // Classic kick
    note('c1 ~ ~ ~ c1 ~ c1 ~')
      .s('sine')
      .gain(0.6)
      .lpf(180)
      .decay(0.25)
      .sustain(0),
    // Punchy snare
    note('~ ~ c4 ~ ~ ~ c4 ~')
      .s('sawtooth')
      .gain(0.38)
      .hpf(1400)
      .lpf(5000)
      .decay(0.12)
      .sustain(0)
      .crush(10),
    // Gritty hats
    note('f6*8')
      .s('sawtooth')
      .gain(0.1)
      .hpf(6500)
      .decay(0.035)
      .sustain(0)
      .crush(12),
    // Gritty bass
    note('a1 a1 c2 d2 a1 a1 e2 d2')
      .s('sawtooth')
      .gain(0.25)
      .lpf(320)
      .crush(14),
    // Sample-style chop
    note('<a3,c4,e4> ~ ~ <g3,b3,d4>')
      .s('square')
      .gain(0.05)
      .lpf(1600)
      .decay(0.12)
      .sustain(0.08)
      .crush(11)
  ).cpm(88).play();
}

// 9. TRAP SOUL VIBES - Trap Soul
export function trapSoul() {
  return stack(
    // Soft 808 kick
    note('c1 ~ ~ ~ ~ ~ ~ ~')
      .s('sine')
      .gain(0.5)
      .lpf(130)
      .decay(0.35)
      .sustain(0.1),
    // Gentle snare
    note('~ ~ ~ ~ c3 ~ ~ ~')
      .s('triangle')
      .gain(0.25)
      .hpf(1200)
      .decay(0.18)
      .sustain(0),
    // Subtle hats
    note('a6*16')
      .s('sawtooth')
      .gain(0.06)
      .hpf(9000)
      .decay(0.025)
      .sustain(0),
    // Long 808
    note('f1 ~ ~ ~ ~ ~ ~ ~')
      .s('sine')
      .gain(0.5)
      .lpf(140)
      .decay(1.2)
      .sustain(0.15),
    // R&B keys
    note('<f3,a3,c4> <eb3,g3,bb3> <db3,f3,ab3> <eb3,g3,bb3>')
      .s('triangle')
      .gain(0.1)
      .attack(0.12)
      .decay(0.6)
      .sustain(0.35)
      .lpf(1800)
      .room(0.4),
    // Airy vocal synth
    note('~ c5 ~ ~ ~ ab4 ~ ~')
      .s('sine')
      .gain(0.06)
      .room(0.5)
      .delay(0.25)
      .delaytime(0.375)
  ).cpm(65).play();
}

// 10. PHONK DRIFT - Phonk
export function phonkDrift() {
  return stack(
    // Heavy kick
    note('c1 ~ c1 ~ c1 ~ c1 ~')
      .s('sine')
      .gain(0.75)
      .lpf(160)
      .decay(0.3)
      .sustain(0),
    // Hard snare
    note('~ ~ c4 ~ ~ ~ c4 ~')
      .s('sawtooth')
      .gain(0.45)
      .hpf(2200)
      .decay(0.1)
      .sustain(0)
      .crush(6),
    // Cowbell-like (phonk signature)
    note('~ e5 ~ e5 ~ e5 ~ e5')
      .s('square')
      .gain(0.12)
      .hpf(2000)
      .lpf(5000)
      .decay(0.06)
      .sustain(0),
    // Dark bass
    note('d1 ~ ~ d1 ~ ~ e1 ~')
      .s('sawtooth')
      .gain(0.45)
      .lpf(180)
      .distort(1.2),
    // Eerie melody
    note('d4 ~ f4 ~ e4 ~ ~ ~')
      .s('sawtooth')
      .gain(0.07)
      .lpf(1400)
      .decay(0.12)
      .sustain(0)
  ).cpm(130).play();
}

// 11. NEO SOUL SUNSET - Neo Soul
export function neoSoul() {
  return stack(
    // Laid back kick
    note('c1 ~ ~ ~ c1 ~ ~ ~')
      .s('sine')
      .gain(0.45)
      .lpf(140)
      .decay(0.25)
      .sustain(0),
    // Soft snare
    note('~ ~ c3 ~ ~ ~ c3 ~')
      .s('triangle')
      .gain(0.22)
      .hpf(900)
      .lpf(4000)
      .decay(0.1)
      .sustain(0),
    // Ghost hats
    note('~ g6 ~ g6 ~ g6 ~ g6')
      .s('sawtooth')
      .gain(0.05)
      .hpf(8000)
      .decay(0.03)
      .sustain(0),
    // Rich chord voicings
    note('<d3,f#3,a3,c4> <c3,e3,g3,b3> <bb2,d3,f3,a3> <a2,c#3,e3,g3>')
      .s('triangle')
      .gain(0.12)
      .attack(0.08)
      .decay(0.6)
      .sustain(0.35)
      .lpf(2000)
      .room(0.35),
    // Warm bass
    note('d2 ~ c2 ~ bb1 ~ a1 ~')
      .s('triangle')
      .gain(0.3)
      .lpf(450)
      .decay(0.2)
      .sustain(0.35)
  ).cpm(95).play();
}

// 12. MIDNIGHT TOFU RUN - Night Drive
export function midnightRun() {
  return stack(
    // Driving kick
    note('c1 ~ ~ ~ c1 ~ c1 ~')
      .s('sine')
      .gain(0.6)
      .lpf(170)
      .decay(0.25)
      .sustain(0),
    // Snare
    note('~ ~ c4 ~ ~ ~ c4 ~')
      .s('sawtooth')
      .gain(0.32)
      .hpf(1600)
      .decay(0.12)
      .sustain(0),
    // Hats
    note('g6*8')
      .s('sawtooth')
      .gain(0.1)
      .hpf(7500)
      .decay(0.03)
      .sustain(0),
    // Synthwave bass
    note('e2 e2 g2 a2 e2 e2 b2 a2')
      .s('sawtooth')
      .gain(0.28)
      .lpf(380)
      .decay(0.18)
      .sustain(0.35),
    // Retro pad
    note('e3,g3,b3')
      .s('sawtooth')
      .gain(0.06)
      .lpf(1100)
      .attack(0.35)
      .release(1.8),
    // Lead synth
    note('b4 ~ g4 ~ a4 ~ e4 ~')
      .s('sawtooth')
      .gain(0.09)
      .lpf(2200)
      .decay(0.12)
      .sustain(0.45)
      .delay(0.15)
      .delaytime(0.25),
    // Arp texture
    note('e4 g4 b4 e5')
      .s('square')
      .fast(4)
      .gain(0.025)
      .lpf(900)
      .decay(0.04)
      .sustain(0)
  ).cpm(82).play();
}

// Track metadata
export const tracks = [
  { id: 1, title: "BOOM BAP CLASSIC", genre: "90s Hip Hop", bpm: 90, pattern: boomBapClassic },
  { id: 2, title: "LOFI NIGHTS", genre: "Lofi Chill", bpm: 75, pattern: lofiNights },
  { id: 3, title: "TRAP HOUSE", genre: "Trap", bpm: 140, pattern: trapHouse },
  { id: 4, title: "JAZZ CAFE", genre: "Jazzy Hip Hop", bpm: 85, pattern: jazzCafe },
  { id: 5, title: "DARK DRILL", genre: "UK Drill", bpm: 145, pattern: darkDrill },
  { id: 6, title: "FUNK SOUL BROTHER", genre: "Old School Funk", bpm: 100, pattern: funkSoul },
  { id: 7, title: "CLOUD WALKING", genre: "Cloud Rap", bpm: 70, pattern: cloudWalking },
  { id: 8, title: "DUSTY CRATES", genre: "Boom Bap", bpm: 88, pattern: dustyCrates },
  { id: 9, title: "TRAP SOUL VIBES", genre: "Trap Soul", bpm: 65, pattern: trapSoul },
  { id: 10, title: "PHONK DRIFT", genre: "Phonk", bpm: 130, pattern: phonkDrift },
  { id: 11, title: "NEO SOUL SUNSET", genre: "Neo Soul", bpm: 95, pattern: neoSoul },
  { id: 12, title: "MIDNIGHT TOFU RUN", genre: "Night Drive", bpm: 82, pattern: midnightRun }
];
