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
        }
    },
    {
        id: 'Thunderstruck',
        name: 'Thunderstruck',
        type: SongType.MIDI,
        file: '../assets/midi/thunderstruck_mod.mid',
        track: 1,
        mode: Mode.Manual, // default
        notes: { // [String, Fret]
            "D#4": [2, 3],
            "F#4": [2, 6],
            "E4": [2, 4],
            "G4": [2, 7],
            "B4": [2, 11],
            "A4": [2, 9],
            "G#4": [2, 8]
        },
        handShapes: {
            "D#4": "ring",
            "F#4": "ring",
            "E4": "ring",
            "G4": "ring",
            "B4": "ring",
            "A4": "ring",
            "G#4": "ring"
        }
    },
    {
        id: 'HotelCalifornia',
        name: 'Hotel California',
        type: SongType.ChordPro,
        file: '../assets/chordpro/HotelCalifornia.chopro',
        notes: {
        },
        handShapes: {
        }
    },
    {
        id: 'Clocks',
        name: 'Clocks Coldplay',
        type: SongType.ChordPro,
        file: '../assets/chordpro/clocks.chopro',
        notes: {
        },
        handShapes: {
        }
    },


    // {
    //     id: 'SmellsLikeTeenSpirit',
    //     name: 'Teen Spirit',
    //     type: SongType.MIDI,
    //     file: '../assets/midi/...',
    //     track: 3,
    //     mode: Mode.Manual, // default
    //     notes: { // [String, Fret]
    //         "E2": [5, 7],
    //         "G2": [5, 10],
    //         "D2": [6, 10],
    //         "C2": [6, 8],
    //         "B1": [6, 7]
    //     },
    //     handShapes: {
    //         "E2": "ring",
    //         "G2": "ring",
    //         "D2": "ring",
    //         "C2": "ring",
    //         "B1": "ring"
    //         /*"D3": "ring",
    //         "F3": "index",
    //         "G3": "ring",
    //         "G#3": "pinkie"*/
    //     }
    // },
    // {
    //     id: 'FeelGoodInc',
    //     name: 'Feel Good, Inc',
    //     type: SongType.MIDI,
    //     file: '../assets/midi/...',
    //     track: 3,
    //     mode: Mode.Manual, // default
    //     notes: { // [String, Fret]
    //         "E2": [5, 7],
    //         "G2": [5, 10],
    //         "D2": [6, 10],
    //         "C2": [6, 8],
    //         "B1": [6, 7]
    //     },
    //     handShapes: {
    //         "E2": "ring",
    //         "G2": "ring",
    //         "D2": "ring",
    //         "C2": "ring",
    //         "B1": "ring"
    //         /*"D3": "ring",
    //         "F3": "index",
    //         "G3": "ring",
    //         "G#3": "pinkie"*/
    //     }
    // },
    // {
    //     id: 'WildThing',
    //     name: 'Wild Thing',
    //     type: SongType.MIDI,
    //     file: '../assets/midi/...',
    //     track: 3,
    //     mode: Mode.Manual, // default
    //     notes: { // [String, Fret]
    //         "E2": [5, 7],
    //         "G2": [5, 10],
    //         "D2": [6, 10],
    //         "C2": [6, 8],
    //         "B1": [6, 7]
    //     },
    //     handShapes: {
    //         "E2": "ring",
    //         "G2": "ring",
    //         "D2": "ring",
    //         "C2": "ring",
    //         "B1": "ring"
    //         /*"D3": "ring",
    //         "F3": "index",
    //         "G3": "ring",
    //         "G#3": "pinkie"*/
    //     }
    // },
    // {
    //     id: 'Lovecats',
    //     name: 'Lovecats',
    //     type: SongType.MIDI,
    //     file: '../assets/midi/...',
    //     track: 3,
    //     mode: Mode.Manual, // default
    //     notes: { // [String, Fret]
    //         "E2": [5, 7],
    //         "G2": [5, 10],
    //         "D2": [6, 10],
    //         "C2": [6, 8],
    //         "B1": [6, 7]
    //     },
    //     handShapes: {
    //         "E2": "ring",
    //         "G2": "ring",
    //         "D2": "ring",
    //         "C2": "ring",
    //         "B1": "ring"
    //         /*"D3": "ring",
    //         "F3": "index",
    //         "G3": "ring",
    //         "G#3": "pinkie"*/
    //     }
    // },
]