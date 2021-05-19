// Sam branch
AFRAME.registerComponent('chord-keys', {
    init: function() {
        let scene = document.querySelector("a-scene");
        const firstPos = document.querySelector('#first').object3D.position.clone();
        const secondPos = document.querySelector('#second').object3D.position.clone();
        const thirdPos = document.querySelector('#third').object3D.position.clone();

        
        let endCounter = 0;
        let beginClick = true;
        const water = new Audio("../assets/smoke-on-water-vr.mp3");
        let el = this.el;
        let i = 0;

        const times = [
            {"note": "D3", "start": 0, "end": 0.5},
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
            {"note": "D3", "start": 6.9, "end": 8.5},
        ];

        const notes = {
            "D3": {image: "../assets/notes/D3.png", tab: [[5, 5]]},
            "F3": {image: "../assets/notes/F3.png", tab: [[4, 3]]},
            "G3": {image: "../assets/notes/G3.png", tab: [[4, 5]]},
            "G#3": {image: "../assets/notes/G3sharp.png", tab: [[4, 6]]}
        };


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
            console.log('play')
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
            console.log('startmusic called');
            console.log('begin');
            if (i >= times.length) {
                i = 0;
                endCounter++;
             }



            if (beginClick) {
                beginClick = false;
                isListening = true;
                first.setAttribute('note', times[0]["note"]);
                second.setAttribute('note', times[1]["note"]);
                third.setAttribute('note', times[2]["note"]);
                first.setAttribute('src', notes[times[0]["note"]].image);
                second.setAttribute('src', notes[times[1]["note"]].image);
                third.setAttribute('src', notes[times[2]["note"]].image);
                console.log("first: " + first.getAttribute('note').image);

                scene.emit('tab-change', {tab: notes[times[0]['note']].tab});
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
            first.setAttribute('src', notes[times[thirdI]["note"]].image);
            first.object3D.position.set(thirdPos.x, thirdPos.y, thirdPos.z);

            let prevFirst = first;
            first = second;
            second = third;
            third = prevFirst;

            // console.log(times[i])
            snip(times[i]["start"], times[i]["end"]);
            console.log('end');
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
            i++;
    
            if(times[i]){
                scene.emit('tab-change', {tab: notes[times[i]['note']].tab});
            }else{
                // end of song
                scene.emit('tab-change', {tab: []});
            }



        }

        this.startMusic();
        scene.addEventListener('pitch', (e)=>{
            if(!isListening){
                return;
            }

            // asert first not null

            // if the notes freq is out of the threshold bounds, dont progress
            if (e.detail.freq < freqs[first.getAttribute('note')]- ERROR_THRESHOLD ||
                e.detail.freq > freqs[first.getAttribute('note')]+ ERROR_THRESHOLD) {
                return;
            }

            this.startMusic();
        });
    },
    remove: function() {
        this.controller.removeEventListener('triggerdown', this.startMusic);
        scene.removeEventListener('pitch', this.startMusic);
    }
});
