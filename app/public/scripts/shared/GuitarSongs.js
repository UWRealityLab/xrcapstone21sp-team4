// song of type
// name: string
// type: SongType
// track: number (only for midi files)
// file: string, path to file
// audio: string, path to file (optional)
/* notes:
 Object mapping from note name (capitalised) to guitar string and fret number
 {
... noteName: [string, fret]
},
handShapes: Object
 */

var SongType = {
    MIDI: 'midi',
    ChordPro: 'chordpro'
}

var GuitarSongs = [
    {
        name: 'Smoke on the Water',
        type: SongType.MIDI,
        file: '../assets/midi/SmokeOnTheWater.mid',
        track: 3,
        audio: '../assets/smoke-on-water-vr.mp3',
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
]