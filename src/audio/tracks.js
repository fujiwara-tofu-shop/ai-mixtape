import { stack, note, s } from '@strudel/web';

// 1. BOOM BAP CLASSIC - 90s Hip Hop
export function boomBapClassic() {
  return stack(
    // Dusty drums
    s('bd ~ sd ~, hh*8')
      .gain(0.35),
    // Muted bass
    note('a1 a1 c2 d2')
      .s('triangle')
      .gain(0.3)
      .lpf(400),
    // Rhodes-style keys
    note('<a2,c3,e3> ~ <g2,b2,d3> ~')
      .s('sine')
      .gain(0.12)
      .attack(0.05)
      .decay(0.3)
      .sustain(0.2)
      .room(0.3)
      .lpf(2000),
    // Scratchy texture
    note('~ e4 ~ ~')
      .s('square')
      .gain(0.04)
      .lpf(1500)
      .decay(0.05)
      .sustain(0)
  ).cpm(90).play();
}

// 2. LOFI NIGHTS - Lofi Chill
export function lofiNights() {
  return stack(
    // Soft kick and snare
    s('bd ~ sd ~')
      .gain(0.25),
    // Muted hats
    s('hh*8')
      .gain(0.08)
      .lpf(3000),
    // Warm piano chords
    note('<e3,g3,b3> <d3,f3,a3> <c3,e3,g3> <d3,f3,a3>')
      .s('sine')
      .gain(0.1)
      .attack(0.1)
      .decay(0.5)
      .sustain(0.3)
      .release(1.0)
      .room(0.5)
      .lpf(1200),
    // Subtle bass
    note('e2 d2 c2 d2')
      .s('triangle')
      .gain(0.18)
      .lpf(350)
  ).cpm(75).play();
}

// 3. TRAP HOUSE - Trap
export function trapHouse() {
  return stack(
    // 808 kick pattern
    s('bd ~ ~ bd ~ ~ bd ~')
      .gain(0.45),
    // Snare on 2 and 4
    s('~ ~ ~ ~ sd ~ ~ ~')
      .gain(0.4),
    // Rolling hats
    s('hh*16')
      .gain(0.12),
    // Deep 808 bass
    note('g1 ~ ~ g1 ~ ~ a1 ~')
      .s('sine')
      .gain(0.5)
      .lpf(200)
      .decay(0.6)
      .sustain(0.3),
    // Dark pad
    note('g2,bb2,d3')
      .s('sawtooth')
      .gain(0.06)
      .lpf(600)
      .attack(0.3)
      .release(1.0)
      .room(0.4)
  ).cpm(140).play();
}

// 4. JAZZ CAFE - Jazzy Hip Hop
export function jazzCafe() {
  return stack(
    // Brushed drums
    s('bd ~ sd ~')
      .gain(0.2),
    // Ride cymbal swing
    s('~ hh ~ hh')
      .gain(0.1)
      .lpf(6000),
    // Jazz chords (ii-V-I)
    note('<d3,f3,a3,c4> <g2,b2,d3,f3> <c3,e3,g3,b3> <c3,e3,g3,b3>')
      .s('sine')
      .gain(0.12)
      .attack(0.08)
      .decay(0.4)
      .sustain(0.3)
      .room(0.4)
      .lpf(2500),
    // Walking bass
    note('d2 f2 g2 a2 c3 a2 g2 f2')
      .s('triangle')
      .gain(0.22)
      .lpf(600),
    // Sparse piano melody
    note('~ a4 ~ ~ ~ f4 ~ ~')
      .s('triangle')
      .gain(0.08)
      .decay(0.2)
      .sustain(0.1)
      .room(0.5)
  ).cpm(85).play();
}

// 5. DARK DRILL - UK Drill
export function darkDrill() {
  return stack(
    // Drill kick pattern
    s('bd ~ ~ ~ ~ ~ bd ~')
      .gain(0.4),
    // Snare hits
    s('~ ~ sd ~ ~ ~ ~ sd')
      .gain(0.35),
    // Triplet hats (drill signature)
    s('hh*12')
      .gain(0.15),
    // Sliding 808
    note('d#1 ~ ~ d#1 ~ f1 ~ ~')
      .s('sine')
      .gain(0.5)
      .lpf(150)
      .decay(0.5),
    // Dark strings
    note('d#3,f#3,a#3')
      .s('sawtooth')
      .gain(0.05)
      .lpf(800)
      .attack(0.5)
      .release(2.0)
      .room(0.6)
  ).cpm(145).play();
}

// 6. FUNK SOUL BROTHER - Old School Funk
export function funkSoul() {
  return stack(
    // Funky drums
    s('bd ~ sd ~, hh*8')
      .gain(0.3),
    // Syncopated claps
    s('~ ~ ~ cp')
      .gain(0.15),
    // Slap bass
    note('e2 ~ g2 a2 ~ ~ e2 ~')
      .s('sawtooth')
      .gain(0.25)
      .lpf(800)
      .decay(0.15)
      .sustain(0.2),
    // Funky clavinet
    note('e4 ~ ~ e4 ~ g4 ~ ~')
      .s('square')
      .gain(0.1)
      .lpf(2000)
      .decay(0.1)
      .sustain(0),
    // Brass stabs
    note('~ ~ <e4,g4,b4> ~')
      .s('sawtooth')
      .gain(0.08)
      .lpf(3000)
      .decay(0.2)
      .sustain(0.1)
  ).cpm(100).play();
}

// 7. CLOUD WALKING - Cloud Rap
export function cloudWalking() {
  return stack(
    // Sparse kick
    s('bd ~ ~ ~ ~ ~ bd ~')
      .gain(0.35),
    // Clap with verb
    s('~ ~ cp ~')
      .gain(0.2)
      .room(0.6)
      .roomsize(8),
    // Dreamy pad
    note('<c3,e3,g3,b3> <a2,c3,e3,g3>')
      .s('sine')
      .gain(0.1)
      .attack(0.8)
      .release(2.0)
      .room(0.7)
      .roomsize(6)
      .lpf(1500)
      .slow(2),
    // Ethereal melody
    note('g4 ~ e4 ~ ~ ~ b4 ~')
      .s('triangle')
      .gain(0.08)
      .delay(0.4)
      .delaytime(0.5)
      .delayfeedback(0.5)
      .room(0.5)
      .lpf(2000)
      .slow(2),
    // Sub bass
    note('c2 ~ ~ ~ a1 ~ ~ ~')
      .s('sine')
      .gain(0.3)
      .lpf(200)
      .slow(2)
  ).cpm(70).play();
}

// 8. DUSTY CRATES - Boom Bap
export function dustyCrates() {
  return stack(
    // Classic boom bap drums
    s('bd ~ sd ~, hh*8')
      .gain(0.32),
    // Gritty bass
    note('a1 a1 c2 d2 a1 a1 e2 d2')
      .s('sawtooth')
      .gain(0.2)
      .lpf(350)
      .crush(12),
    // Filtered sample-style chop
    note('<a3,c4,e4> ~ ~ <g3,b3,d4>')
      .s('square')
      .gain(0.06)
      .lpf(1800)
      .decay(0.15)
      .sustain(0.1)
      .crush(10),
    // Vinyl crackle texture (high noise)
    s('hh?')
      .gain(0.02)
      .lpf(8000)
      .hpf(4000)
  ).cpm(88).play();
}

// 9. TRAP SOUL VIBES - Trap Soul
export function trapSoul() {
  return stack(
    // Soft trap drums
    s('bd ~ ~ ~ sd ~ ~ ~')
      .gain(0.3),
    // Subtle hats
    s('hh*16')
      .gain(0.08),
    // Long 808
    note('f1 ~ ~ ~ ~ ~ ~ ~')
      .s('sine')
      .gain(0.4)
      .lpf(150)
      .decay(1.5)
      .sustain(0.2),
    // R&B keys
    note('<f3,a3,c4> <eb3,g3,bb3> <db3,f3,ab3> <eb3,g3,bb3>')
      .s('sine')
      .gain(0.12)
      .attack(0.15)
      .decay(0.5)
      .sustain(0.4)
      .release(1.0)
      .room(0.5)
      .lpf(2000),
    // Airy vocal-like synth
    note('~ c5 ~ ~ ~ ab4 ~ ~')
      .s('triangle')
      .gain(0.06)
      .room(0.6)
      .delay(0.3)
      .delaytime(0.375)
  ).cpm(65).play();
}

// 10. PHONK DRIFT - Phonk
export function phonkDrift() {
  return stack(
    // Heavy kick
    s('bd ~ bd ~ bd ~ bd ~')
      .gain(0.45),
    // Snare
    s('~ ~ sd ~ ~ ~ sd ~')
      .gain(0.4),
    // Cowbell (phonk signature)
    s('~ hh:3 ~ hh:3 ~ hh:3 ~ hh:3')
      .gain(0.2)
      .lpf(4000),
    // Dark bass
    note('d1 ~ ~ d1 ~ ~ e1 ~')
      .s('sawtooth')
      .gain(0.35)
      .lpf(200)
      .distort(1.5),
    // Eerie melody
    note('d4 ~ f4 ~ e4 ~ ~ ~')
      .s('sawtooth')
      .gain(0.08)
      .lpf(1500)
      .decay(0.15)
      .sustain(0)
      .room(0.3)
  ).cpm(130).play();
}

// 11. NEO SOUL SUNSET - Neo Soul
export function neoSoul() {
  return stack(
    // Laid back drums
    s('bd ~ sd ~')
      .gain(0.22),
    // Ghost notes
    s('~ hh ~ hh ~ hh ~ hh')
      .gain(0.08),
    // Rich chord voicings
    note('<d3,f#3,a3,c4> <c3,e3,g3,b3> <bb2,d3,f3,a3> <a2,c#3,e3,g3>')
      .s('sine')
      .gain(0.14)
      .attack(0.1)
      .decay(0.5)
      .sustain(0.4)
      .release(1.2)
      .room(0.4)
      .lpf(2200),
    // Warm bass
    note('d2 ~ c2 ~ bb1 ~ a1 ~')
      .s('sine')
      .gain(0.25)
      .lpf(500),
    // Subtle guitar-like arp
    note('d4 f#4 a4 c5')
      .s('triangle')
      .fast(2)
      .gain(0.04)
      .lpf(1500)
      .decay(0.1)
      .sustain(0)
      .room(0.3)
  ).cpm(95).play();
}

// 12. MIDNIGHT TOFU RUN - Night Drive
export function midnightRun() {
  return stack(
    // Driving drums
    s('bd ~ sd ~, hh*8')
      .gain(0.3),
    // Synthwave bass
    note('e2 e2 g2 a2 e2 e2 b2 a2')
      .s('sawtooth')
      .gain(0.22)
      .lpf(400)
      .decay(0.2)
      .sustain(0.3),
    // Retro pad
    note('e3,g3,b3')
      .s('sawtooth')
      .gain(0.08)
      .lpf(1200)
      .attack(0.3)
      .release(1.5)
      .room(0.5),
    // Lead synth
    note('b4 ~ g4 ~ a4 ~ e4 ~')
      .s('sawtooth')
      .gain(0.1)
      .lpf('<2000 2500 3000 2500>')
      .decay(0.15)
      .sustain(0.4)
      .room(0.3)
      .delay(0.2)
      .delaytime(0.25),
    // Arp texture
    note('e4 g4 b4 e5')
      .s('square')
      .fast(4)
      .gain(0.03)
      .lpf(1000)
      .decay(0.05)
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
