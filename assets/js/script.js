// TODOS:
// 1. Create a key listener
// 2. Connect key press to play beat
// 3. Create a database of beats
// Database of beats

let beats = {
    "a": 'assets/audio/Piano Chord 331.mp3',
    "s": 'assets/audio/Piano Chord 209.mp3',
    "d": 'assets/audio/Piano Chord 208.mp3',
    "f": 'assets/audio/Drum Sticks Hit 3.mp3',
    "g": 'assets/audio/Drum Snare Roll.mp3',
    "h": 'assets/audio/PREL Musical 57.mp3',
    "j": 'assets/audio/Cymbal Suspended 2.mp3',
    "k": 'assets/audio/Musical Compos 33.mp3',
    "l": 'assets/audio/Musical Orches 4.mp3',
}

// Play the beat on key press
const playBeat = (buttonKey) => {
    var audio = new Audio()
    audio.currentTime = 0
    audio.src = beats[buttonKey]
    audio.play()
}

// Key listener
document.addEventListener("keydown", (event) => {
    let eventKey = event.key.toLocaleLowerCase()
    if (!beats.hasOwnProperty(eventKey)) {
        return false
    }
    playBeat(eventKey)
})