// Sam branch
AFRAME.registerComponent('chord-keys', {
    schema: { // indexed in shared/GuitarSongs.js
        songNumber: {type: 'int'}
    },
    init: async function() {
        this.scene = document.querySelector("a-scene");
        const firstPos = document.querySelector('#first').object3D.position.clone();
        const secondPos = document.querySelector('#second').object3D.position.clone();
        const thirdPos = document.querySelector('#third').object3D.position.clone();

        //new note:
        // notes: string[]
        // start: number
        // end: number
        let times = [];

        // invariant: uppercase names
        let freqsDirectory = {/*
            "D3": 146.83,
            "F3": 174.61,
            "G3": 196.00,
            "G#3": 207.65*/
        };


        // MIDI stuff

        // load song
        let song = GuitarSongs[this.data.songNumber];

        console.log('starting song: '+JSON.stringify(song));

        if(song.type === SongType.MIDI){
            const midi = await Midi.fromUrl(song.file);
            console.log('midi loaded');

            // file name (included in the first track)
            let track = midi.tracks[song.track];

            console.log('playing track: '+track.name+' and channel: '+track.channel);
            // array of notes
            const midiNotes = track.notes;

            // console.log('midiNotes: '+JSON.stringify(track));
            let startTime = midiNotes[0].time;

            for (let midiNote of midiNotes) {
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
                    freqsDirectory[noteName] = noteFreq;
                    console.log('putting freq '+noteName +': '+noteFreq);
                }
            }
        }else if(song.type === SongType.CustomTabs){
            times = song.times;
            for(let time of times){
                for(let noteName of time.notes){
                    if(!(noteName in freqsDirectory)){
                        // get frequency
                        let noteFreq = Tonal.Note.freq(noteName);
                        freqsDirectory[noteName] = noteFreq;
                        console.log('putting freq '+noteName +': '+noteFreq);
                    }
                }
            }

        }


        let endCounter = 0;
        let beginClick = true;
        const audio = song.audio? new Audio(song.audio) : null;
        let el = this.el;
        let i = 0;              // number of note in the riff that we're practicing

        const notesDirectory = song.notes;
        // Note as an associated hand shape on how to play, will emit event for
        // script to change hand shape
        const handShapes = song.handShapes;

        let mergeTab = (notes) => {
            let tab = [];
            for(let note of notes){
                if(note in notesDirectory){
                    tab.push(notesDirectory[note]);
            }
            }
            return tab;
        }




        // import frequencies from MIDI
        // import frequencies from MIDI


        
        // check if pitch is sustained
        const ERROR_THRESHOLD = 2.5;
        let isListening = false;

        function snip(start, end) {
            // todo: make this use the midi track
            /*if(audio){
                audio.currentTime = start;
                audio.play()
                setTimeout(() => {audio.pause();}, (end - start) * 1000);
            }*/
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

            scene.emit('show-screen-marker', {screen: i%3, tab: mergeTab(times[thirdI].notes)});
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
                scene.emit('reset-menu', {});
                return;
            }

            // Send the hand shape
            i++;

            if(times[i]){
                scene.emit('tab-change', {tab: mergeTab(times[i].notes)});
                // todo: maybe disappear hand in this case
                let firstNote = times[0].notes[0];
                if (isSingleNote(times[i].notes) && handShapes[firstNote]) {
                    scene.emit('hand-change', {shape: handShapes[firstNote]})
                }
            }else{
                // end of song
                // i = 0;
                scene.emit('tab-change', {tab: mergeTab(times[0].notes)});
                // this.startMusic();
            }



        }

        this.startMusic();

        function isSingleNote(notes) {
            return times[i].notes.length===1;
        }

        this.onPitch = (e)=> {
            console.log('onpitch: '+e.detail.freq);
            if(!isListening){
                return;
            }

            // assert first not null

            // if the notes freq is out of the threshold bounds, dont progress
            /*if(isSingleNote(times[i].notes)){*/
            if(times[i%times.length]){
                let note = times[i%times.length].notes[0];
                if(!freqsDirectory[note]){
                    console.log('frequency not defined for note: '+note);
                    return;
                }
                if (e.detail.freq > freqsDirectory[note]- ERROR_THRESHOLD &&
                    e.detail.freq < freqsDirectory[note]+ ERROR_THRESHOLD) {
                    this.startMusic();
                }else{
                    console.log(e.detail.freq + 'doesnt match note '+note+'freq: '+freqsDirectory[note]);
                }
            }else{
                // end of song
            }

            /*}*/
            // todo: chord detection for multiple notes

        };
        scene.addEventListener('pitch', this.onPitch);


        scene.addEventListener('start-music', this.startMusic);
        this.controller = document.querySelector('#controller');
        this.controller.addEventListener('triggerdown', this.startMusic);

        this.uiTrigger = (event) => {
            console.log('got ui trigger: '+event.detail.value);
            if(event.detail.value === 'next'){
                this.startMusic();
            }
        };

        scene.addEventListener('secondary-ui-trigger', this.uiTrigger);

        // scene.addEventListener('click', this.startMusic); // for debugging


    },
    remove: function() {
        scene.removeEventListener('pitch', this.startMusic);
        scene.removeEventListener('start-music', this.startMusic);
        scene.removeEventListener('pitch', this.onPitch);
        this.controller.removeEventListener('triggerdown', this.startMusic);
        scene.removeEventListener('secondary-ui-trigger', this.uiTrigger);
    }
});
