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

    properties: {
        audio: null
    },

    init() {
        // Create main element
        this.elements.main = document.createElement("div");

        // Setup elements
        this.elements.main.classList.add("beatbox")
        this.elements.main.appendChild(this._createBeatButtons())
        // Add to DOM
        document.body.appendChild(this.elements.main)
        // initialize audio
        this.properties.audio = this._initializeAudios()
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

    // Initialize the audios and bind with the button element
    _initializeAudios() {
        var audios = []
        Object.keys(this.beatDetails).forEach(key => {
            let audioButtonElement = document.getElementById(key);
            let audioInstance = new Audio()
            
            audioButtonElement.setAttribute('disabled', true)
            audioInstance.addEventListener("loadeddata", this.enableAudioButton.bind(audioButtonElement), true);

            audioInstance.src = this.beatDetails[key].beatAudioPath
            audios.push({
                'buttonKey': key,
                'audioInstance': audioInstance,
                'src': audioInstance.src
            })
        })
        return audios
    },

    enableAudioButton() {
        this.removeAttribute("disabled"); //reenable the button
    },

    playBeat(buttonKey) {
        this.properties.audio.forEach(key => {
            switch (key.buttonKey) {
                case buttonKey:
                    key.audioInstance.currentTime = 0
                    key.audioInstance.play()
                    break;
                default:
                    break;
            }
        })
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
    document.getElementById(eventKey).click()
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