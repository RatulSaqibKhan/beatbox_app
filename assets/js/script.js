// TODOS:
// 1. Create a key listener
// 2. Connect key press to play beat
// 3. Create a database of beats
// 3. Set the colors programmatically

// Database of beats
const beats = {
    "a": {
        beat: 'assets/audio/Piano Chord 331.mp3',
        color: "#00fffe"
    },
    "s": {
        beat: 'assets/audio/Piano Chord 209.mp3',
        color: "#00fffe"
    },
    "d": {
        beat: 'assets/audio/Piano Chord 208.mp3',
        color: "#00fffe"
    },
    "f": {
        beat: 'assets/audio/Drum Sticks Hit 3.mp3',
        color: "#ff00ff"
    },
    "g": {
        beat: 'assets/audio/Drum Snare Roll.mp3',
        color: "#ff00ff"
    },
    "h": {
        beat: 'assets/audio/PREL Musical 57.mp3',
        color: "#ff00ff"
    },
    "j": {
        beat: 'assets/audio/Cymbal Suspended 2.mp3',
        color: "#ff00ff"
    },
    "k": {
        beat: 'assets/audio/Musical Compos 33.mp3',
        color: "#ffffff"
    },
    "l": {
        beat: 'assets/audio/Musical Orches 4.mp3',
        color: "#ffffff"
    },
}

window.onload = () => {
    setButtons()
}

const setButtons = () => {
    for (let beatKey in beats) {
        let beatElement = document.getElementById(beatKey)
        beatElement.style.borderColor = beats[beatKey].color
        beatElement.addEventListener("transitionend", () => {
            beatElement.style.backgroundColor = "transparent"
            beatElement.style.boxShadow = "none"
        })
    }
}

const onButtonPress = (buttonKey) => {
    let beatElement = document.getElementById(buttonKey)
    beatElement.style.backgroundColor = beats[buttonKey].color
    beatElement.style.boxShadow = `0px 0px 17px 0px ${beats[buttonKey].color}`
} 
// Play the beat on key press
const playBeat = (buttonKey) => {
    var audio = new Audio()
    audio.currentTime = 0
    audio.src = beats[buttonKey].beat
    audio.play()
}

// Key listener
document.addEventListener("keydown", (event) => {
    let eventKey = event.key.toLocaleLowerCase()
    if (!beats.hasOwnProperty(eventKey)) {
        return false
    }
    playBeat(eventKey)
    onButtonPress(eventKey)
})