const Beatbox = {
    // Define the library for beats
    beatDetails: {
        "a": {
            beatAudioPath: 'assets/audio/Piano Chord 331.mp3',
            classList: ["button", "button-border-aqua"],
            activeClass: "button-active-aqua"
        },
        "s": {
            beatAudioPath: 'assets/audio/Piano Chord 209.mp3',
            classList: ["button", "button-border-aqua"],
            activeClass: "button-active-aqua"
        },
        "d": {
            beatAudioPath: 'assets/audio/Piano Chord 208.mp3',
            classList: ["button", "button-border-aqua"],
            activeClass: "button-active-aqua"
        },
        "f": {
            beatAudioPath: 'assets/audio/Drum Sticks Hit 3.mp3',
            classList: ["button", "button-border-golden"],
            activeClass: "button-active-golden"
        },
        "g": {
            beatAudioPath: 'assets/audio/Drum Snare Roll.mp3',
            classList: ["button", "button-border-golden"],
            activeClass: "button-active-golden"
        },
        "h": {
            beatAudioPath: 'assets/audio/PREL Musical 57.mp3',
            classList: ["button", "button-border-golden"],
            activeClass: "button-active-golden"
        },
        "j": {
            beatAudioPath: 'assets/audio/Cymbal Suspended 2.mp3',
            classList: ["button", "button-border-golden"],
            activeClass: "button-active-golden"
        },
        "k": {
            beatAudioPath: 'assets/audio/Musical Compos 33.mp3',
            classList: ["button", "button-border-white"],
            activeClass: "button-active-white"
        },
        "l": {
            beatAudioPath: 'assets/audio/Musical Orches 4.mp3',
            classList: ["button", "button-border-white"],
            activeClass: "button-active-white"
        },
    },

    // Define Elements
    elements: {
        main: null,
        beatsContainer: null,
        beatButton: null
    },

    init() {
        // Create main element
        this.elements.main = document.createElement("div");

        // Setup elements
        this.elements.main.classList.add("beatbox")
        this.elements.main.appendChild(this._createBeatButtons())
        // Add to DOM
        document.body.appendChild(this.elements.main)
    },

    // This will create all the beat buttons
    _createBeatButtons() {
        const fragment = document.createDocumentFragment();
        Object.keys(this.beatDetails).forEach(key => {
            let beatElement = document.createElement("div")
            let beatButtonElement = document.createElement("div")
            let beatDetail = this.beatDetails[key]

            beatDetail.classList.forEach(classKey => {
                beatButtonElement.classList.add(classKey)
            })

            beatButtonElement.setAttribute("id", key)
            // Setup beat element
            beatElement.classList.add("beat")
            beatButtonElement.textContent = key.toUpperCase()

            beatButtonElement.addEventListener("click", (event) => {
                this.playBeat(key)
                beatButtonElement.classList.add(beatDetail.activeClass)
            })

            beatButtonElement.addEventListener("transitionend", (event) => {
                beatButtonElement.classList.remove(beatDetail.activeClass)
            })

            beatElement.appendChild(beatButtonElement)

            fragment.appendChild(beatElement)
        })
        return fragment
    },

    playBeat(buttonKey) {
        var audio = new Audio()
        audio.currentTime = 0
        audio.src = this.beatDetails[buttonKey].beatAudioPath
        audio.play()
    },

    onButtonPress(buttonKey) {
        let beatButtonElement = document.getElementById(buttonKey)
        let beatDetail = this.beatDetails[buttonKey]
        beatButtonElement.classList.add(beatDetail.activeClass)
    },

    onButtonUp(buttonKey) {
        let beatButtonElement = document.getElementById(buttonKey)
        let beatDetail = this.beatDetails[buttonKey]
        beatButtonElement.classList.remove(beatDetail.activeClass)
    }
}

document.addEventListener("keydown", (event) => {
    let eventKey = event.key.toLocaleLowerCase()
    if (!Beatbox.beatDetails.hasOwnProperty(eventKey)) {
        return false
    }
    Beatbox.playBeat(eventKey)
    Beatbox.onButtonPress(eventKey)
})

document.addEventListener("keyup", (event) => {
    let eventKey = event.key.toLocaleLowerCase()
    if (!Beatbox.beatDetails.hasOwnProperty(eventKey)) {
        return false
    }
    Beatbox.onButtonUp(eventKey)
})

window.addEventListener("DOMContentLoaded", () => {
    Beatbox.init()
})