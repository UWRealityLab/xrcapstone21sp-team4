// song of type
// id: string
// name: string
// type: SongType
// track: number (only for midi files)
// file: string, path to file
// audio: string, path to file (optional)
// mode: Mode
/* notes:
 Object mapping from note name (capitalised) to guitar string and fret number
 {
... noteName: [string, fret]
},
handShapes: Object
 */

// todo: make this into a module

var SongType = {
    MIDI: 'midi',
    ChordPro: 'chordpro'
}

var Mode = {
    Manual: 'manual',
    Autoplay: 'autoplay'
}

var GuitarSongs = [
    {
        id: 'SmokeOnTheWater',
        name: 'Smoke on the Water',
        type: SongType.MIDI,
        file: '../assets/midi/SmokeOnTheWater.mid',
        track: 3,
        audio: '../assets/smoke-on-water-vr.mp3',
        mode: Mode.Manual, // default
        notes: {
            "D3": [5, 5],
            "F3": [4, 3],
            "G3": [ 4, 5],
            "G#3": [4, 6]
        },
        handShapes: {
            "D3": "ring",
            "F3": "index",
            "G3": "ring",
            "G#3": "pinkie"
        }
    },
    {
        id: 'SevenNationArmy',
        name: '7 Nation Army',
        type: SongType.MIDI,
        file: '../assets/midi/SevenNationArmy_mod.mid',
        track: 3,
        mode: Mode.Manual, // default
        notes: {
            "E2": [5, 7],
            "G2": [5, 10],
            "D2": [6, 10],
            "C2": [6, 8],
            "B1": [6, 7]
        },
        handShapes: {
            "E2": "ring",
            "G2": "ring",
            "D2": "ring",
            "C2": "ring",
            "B1": "ring"
            /*"D3": "ring",
            "F3": "index",
            "G3": "ring",
            "G#3": "pinkie"*/
        }
    },
]