// Sam branch
AFRAME.registerComponent('chord-keys', {
    init: async function() {
        this.scene = document.querySelector("a-scene");
        const firstPos = document.querySelector('#first').object3D.position.clone();
        const secondPos = document.querySelector('#second').object3D.position.clone();
        const thirdPos = document.querySelector('#third').object3D.position.clone();

        //new note:
        // notes: string[]
        // start: number
        // end: number
        const times = [
            /*{"note": "D3", "start": 0, "end": 0.5},
            {"note": "F3", "start": 0.5, "end": 1.2},
            {"note": "G3", "start": 1.2, "end": 2},
            {"note": "D3", "start": 2, "end": 2.5},
            {"note": "F3", "start": 2.5, "end": 3.2},
            {"note": "G#3", "start": 3.2, "end": 3.52},
            {"note": "G3", "start": 3.43, "end": 4.5},
            {"note": "D3", "start": 4.5, "end": 4.9},
            {"note": "F3", "start": 4.9, "end": 5.6},
            {"note": "G3", "start": 5.6, "end": 6.4},
            {"note": "F3", "start": 6.4, "end": 6.9},
            {"note": "D3", "start": 6.9, "end": 8.5},*/
        ];

        // invariant: uppercase names
        const freqsDirectory = {
            "D3": 146.83,
            "F3": 174.61,
            "G3": 196.00,
            "G#3": 207.65
        };


        // MIDI stuff

        // load song (TODO: need more logic here to load specific songs)
        const midi = await Midi.fromUrl("../assets/midi/DEEP_PURPLE_-_Smoke_on_the_water__KAR.mid");

        console.log('midi loaded');

        // ***
        // I don't know if we want to use the midi track for audio as well or if the sync with
        // the recording will be close enough to be usable. It's like a synth version kind of.
        // but we could totally use a tonal.js instrument they have a pretty wide range of instruments
        // yeah
        // ***

        // was talking to Sam about this earlier ^

        // file name (included in the first track)
        const name = midi.name

        // get tracks (TODO: how to distinguish between the tracks. Is there a version of sotw with named tracks?)

        // In the DEEP_PURPLE file the tracks of interest are 2 and 3
        // Repeating edited measures 8 to 11 until I figure out an idiomatic way of distinguishing transposed melodies
        let track = midi.tracks[3]; // todo: make a way to change this
            // array of notes
        const midiNotes = track.notes;
            // for (int i = 0; i < notes.length; i++) {
                // track.notes[i];
            // }

        let startTime = midiNotes[0].time;

        for (let midiNote of midiNotes) {
            // console.log('note: '+JSON.stringify(midiNote));
            let noteName = midiNote.name.toUpperCase();
            let noteStart = (midiNote.time - startTime);

            if(times.length>0 && times[times.length-1].start === noteStart){
                // add to existing note
                times[times.length-1].notes.push(noteName);
            }else{
                // create new note
                let note = {
                    notes: [midiNote.name],
                    start: noteStart,
                    end: noteStart+midiNote.duration
                }
                times.push(note);
            }

            //
            if(!(noteName in freqsDirectory)){
                // get frequency
                let noteFreq = Tonal.Note.freq(noteName);
                // console.log('noteName freq: '+Tonal.Note.freq(noteName));
                freqsDirectory[noteName] = noteFreq;
                // console.log('adding frequency for '+noteName+': '+noteFreq);
            }


        }
            // notes.forEach(note => {

            // })

        
        let endCounter = 0;
        let beginClick = true;
        const water = new Audio("../assets/smoke-on-water-vr.mp3");
        let el = this.el;
        let i = 0;


        /*const notes = {
            "D3": {tab: [[5, 5]]},
            "F3": { tab: [[4, 3]]},
            "G3": {tab: [[ 4, 5]]},
            "G#3": { tab: [[4, 6]]}
        };*/
        const notesDirectory = {
            "D3": [5, 5],
            "F3": [4, 3],
            "G3": [ 4, 5],
            "G#3": [4, 6]
        };
        // Note as an associated hand shape on how to play, will emit event for
        // script to change hand shape
        const handShapes = {
            "D3": {shape: "ring"},
            "F3": {shape: "index"},
            "G3": {shape: "ring"},
            "G#3": {shape: "pinkie"}
        };

        let mergeTab = (notes) => {
            let tab = [];
            for(let note of notes){
                if(note in notesDirectory){
                    tab.push(notesDirectory[note]);
            }
            }
            return tab;
        }




        const freqs = {
            "D3": 146.83,
            "F3": 174.61,
            "G3": 196.00,
            "G#3": 207.65
        };
        
        // check if pitch is sustained
        const ERROR_THRESHOLD = 1.5;
        let isListening = false;

        function snip(start, end) {
            water.currentTime = start;
           // console.log('play')
            // this system is flawed, audio of progressing notes can get
            // cut awkwardly
            water.play()
            setTimeout(() => {water.pause();}, (end - start) * 1000);
        }

        // swapping photos
        // update the front facing note
        let first = document.querySelector('#first');
        let second = document.querySelector('#second');
        let third = document.querySelector('#third');

        this.startMusic = async (/*e*/) => {
          //  console.log('startmusic called');
          //  console.log('begin');
            if (i >= times.length) {
                i = 0;
                endCounter++;
             }



            if (beginClick) {
                beginClick = false;
                isListening = true;
                // first.setAttribute('note', mergeTab(times[0].notes));
                // second.setAttribute('note', mergeTab(times[1].notes));
                // third.setAttribute('note', mergeTab(times[2].notes));
                // console.log('first tab: '+JSON.stringify(mergeTab(times[0].notes)));
                scene.emit('show-screen-marker', {screen: 0, tab: mergeTab(times[0].notes)})
                scene.emit('show-screen-marker', {screen: 1, tab: mergeTab(times[1].notes)})
                scene.emit('show-screen-marker', {screen: 2, tab: mergeTab(times[2].notes)})
                scene.emit('tab-change', {tab: mergeTab(times[0].notes)});

                if (isSingleNote(times[i].notes)) {
                    scene.emit('hand-change', {shape: handShapes[times[0].notes[0]].shape})
                }
                return;
            }


            // move second to first
            let secondToFirst = {
                property: 'position',
                to: {
                    x: firstPos.x,
                    y: firstPos.y,
                    z: firstPos.z
                },
                dur: "100",
            };
            second.setAttribute('animation', secondToFirst);

            let thirdToSecond = {
                property: 'position',
                to: {
                    x: secondPos.x,
                    y: secondPos.y,
                    z: secondPos.z
                },
                dur: "100",
            };
            third.setAttribute('animation', thirdToSecond);
            // move th

            var thirdI = i + 1;
            if (thirdI == times.length) { thirdI = 0; }
            thirdI++;
            if (thirdI == times.length) { thirdI = 0; }
            thirdI++;
            if (thirdI == times.length) { thirdI = 0; }
            // console.log(thirdI);
            first.setAttribute('note', times[thirdI]["note"]);
            scene.emit('show-screen-marker', {screen: i%3, tab: notes[times[thirdI]["note"]].tab});
            first.object3D.position.set(thirdPos.x, thirdPos.y, thirdPos.z);

            let prevFirst = first;
            first = second;
            second = third;
            third = prevFirst;

            // console.log(times[i])
            snip(times[i].start, times[i].end);
            //console.log('end');
            // if we are at the last note, wait to start listening again
            if (i+1 == times.length) {
                isListening = false;
                setTimeout(() => {isListening = true}, 1200);
            }
            if (endCounter > 2) {
                // el.setAttribute('swap', "none");
                /*el.removeAttribute('chord-keys');
                second.setAttribute('src', "#interface");
                third.setAttribute('src', "");
                first.setAttribute('src', "");*/
                scene.emit('reset-menu', {});
                return;
            }

            // Send the hand shape
            i++;


            if(times[i]){
                scene.emit('tab-change', {tab: notes[times[i]['note']].tab});
                scene.emit('hand-change', {shape: handShapes[times[i]['note']].shape})
            }else{
                // end of song
                scene.emit('tab-change', {tab: mergeTab(times[0].notes)});
            }

            // console.log('first tab: '+JSON.stringify(mergeTab(times[i].notes)));

        }

        this.startMusic();

        function isSingleNote(notes) {
            return times[i].notes.length===1;
        }

        this.onPitch = (e)=> {
            if(!isListening){
                return;
            }

            // asert first not null

            // if the notes freq is out of the threshold bounds, dont progress
            if(isSingleNote(times[i].notes)){
                let note = times[i].notes[0];
                if (e.detail.freq > freqsDirectory[note]- ERROR_THRESHOLD &&
                    e.detail.freq < freqsDirectory[note]+ ERROR_THRESHOLD) {
                    this.startMusic();
                }
            }
            // todo: chord detection for multiple notes

        };
        scene.addEventListener('pitch', this.onPitch);


        scene.addEventListener('start-music', this.startMusic);


    },
    remove: function() {
        scene.removeEventListener('pitch', this.startMusic);
        scene.removeEventListener('start-music', this.startMusic);
        scene.removeEventListener('pitch', this.onPitch);
    }
});
