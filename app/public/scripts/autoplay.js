AFRAME.registerComponent('autoplay', {
    init: function() {

        let scene = document.querySelector('a-scene');
        var firstPos = {
            x: 0,
            y: 0,
            z: -2
        };
        var secondPos = {
            x: 2,
            y: 0,
            z: -4
        };
        var thirdPos = {
            x: 4,
            y: 0,
            z: -6
        };

        var beginClick = true;
        var water = new Audio("https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fsmoke-on-water-vr.mp3?v=1619155205392");
        let el = this.el;
        var times = [
            {"note": "d", "start": 0, "end": 0.5},
            {"note": "f", "start": 0.5, "end": 1},
            {"note": "g", "start": 1, "end": 1.85},
            {"note": "d", "start": 1.85, "end": 2.45},
            {"note": "f", "start": 2.45, "end": 2.8},
            {"note": "g#", "start": 2.8, "end": 3.25},
            {"note": "g", "start": 3.25, "end": 4.5},
            {"note": "d", "start": 4.5, "end": 4.9},
            {"note": "f", "start": 4.9, "end": 5.6},
            {"note": "g", "start": 5.6, "end": 6.4},
            {"note": "f", "start": 6.4, "end": 6.9},
            {"note": "d", "start": 6.9, "end": 8.45},
        ];
        var notes = {
            "d": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Ffc055219-cece-4a8f-9b64-7155fb2e6324.image.png?v=1620102883826", tab: [[4, 0]]},
            "f": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F63898bc2-8da3-4321-880f-1d7750892ece.image.png?v=1620102917808", tab: [[4, 3]]},
            "g": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F6a4cd273-d8aa-4eb6-862e-fbecff440967.image.png?v=1620102943326", tab: [[4, 5]]},
            "g#": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F0b88a893-54bd-433e-bb42-554bb73b06a6.image.png?v=1620102928423", tab: [[4, 6]]}
        };


        var countdown = {
            "1": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F1.png?v=1620104560154",
            "2": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F2.png?v=1620104562410",
            "3": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F3.png?v=1620104566565"
        };
        var currentlyRunning = false;

        function animate(first, second, third, isMusic, i) {
            var params = {
                property: 'position',
                to: firstPos,
                dur: "100",
            };
            second.setAttribute('animation', params);
            params.to = secondPos;
            third.setAttribute('animation', params);
            if (isMusic) {
                var thirdI = i + 1;
                if (thirdI == times.length) { thirdI = 0; }
                thirdI++;
                if (thirdI == times.length) { thirdI = 0; }
                //first.setAttribute('src', notes[times[thirdI]["note"]].image);
                first.setAttribute('geometry', {
                    primitive: 'box',
                    width: 1,
                    height: 1,
                    depth: 0
                });
                first.setAttribute('material', 'transparent:true; opacity: 0');
                first.setAttribute('position', thirdPos);
            } else {
                //first.setAttribute('src', notes[times[i]["note"]].image);
                first.setAttribute('src', '');
                first.setAttribute('material', 'transparent:true; opacity: 0');
                first.setAttribute('geometry', {
                    primitive: 'box',
                    width: 1,
                    height: 1,
                    depth: 0
                });
                first.setAttribute('position', thirdPos);
            }
            first.setAttribute('id', 'third');
            second.setAttribute('id', 'first');
            third.setAttribute('id', 'second');
        }

        this.startMusic = function (e) {
            if (currentlyRunning) { return; }
            currentlyRunning = true;
            var numRepeats = 0;
            function nextNote(i, isMusic) {
                // swapping photos
                // update the front facing note
                console.log('next note: ' + i);
                if (times[i]) {
                    scene.emit('tab-change', { tab: notes[times[i].note].tab });
                } else {
                    scene.emit('tab-change', []);
                }
                var first = document.getElementById('first');
                var second = document.getElementById('second');
                var third = document.getElementById('third');
                animate(first, second, third, isMusic, i);
                
            }


            console.log("start the music");
            var first = document.getElementById('first');
            var second = document.getElementById('second');
            var third = document.getElementById('third');


            first.setAttribute('src', countdown["3"]);
            second.setAttribute('src', countdown["2"]);
            third.setAttribute('src', countdown["1"]);

            e.stopImmediatePropagation();

            recursiveCountdown(0);
            function recursiveCountdown(i) {
                if (i == 3) { return; }
                console.log("countup in here")
                setTimeout(() => { nextNote(i, false); recursiveCountdown(i + 1); }, 1000);
            }

            var total_completes = 0;
            function recursiveTimeout(i) {
                if (i + 1 == times.length) {
                    console.log("---repeat---")
                    if (numRepeats > 4) {
                        el.setAttribute('swap', "none");
                        el.removeAttribute('autoplay');
                        second.setAttribute('src', "");
                        third.setAttribute('src', "#interface");
                        first.setAttribute('src', "");
                        return;
                    }
                    numRepeats++;
                    var start = times[i]["start"];
                    var end = times[i]["end"];
                    setTimeout(() => {
                        if (total_completes > 4) {
                            currentlyRunning = false;
                            return;
                        }
                        nextNote(0, true);
                        recursiveTimeout(0);
                        total_completes++;
                    }, (end - start) * 1000);
                } else {
                    var start = times[i]["start"];
                    var end = times[i]["end"];
                    setTimeout(() => { nextNote(i + 1, true); recursiveTimeout(i + 1); }, (end - start) * 1000);
                }
              if (i+1 == times.length) {
                console.log("---repeat---")
                if (numRepeats > 4) {
                    scene.emit('reset-menu', {});
                    return;
                }
                numRepeats++;
                var start = times[i]["start"];
                var end = times[i]["end"];
                setTimeout(() => {
                    if (total_completes > 4) {
                        currentlyRunning = false;
                        return;
                    }
                    nextNote(0, true);
                    recursiveTimeout(0);
                    total_completes++;
                }, (end - start) * 1000);
              } else {
                var start = times[i]["start"];
                var end = times[i]["end"];
                setTimeout(() => {nextNote(i+1, true); recursiveTimeout(i+1);}, (end - start) * 1000);
              }
            }

            setTimeout(() => { water.play(); recursiveTimeout(0); }, 3000);
        }





        this.controller = document.querySelector('#controller');


        this.controller.addEventListener('gripdown', this.startMusic);
        document.addEventListener('click', this.startMusic);



        // Code for fret and string addition
        const scaleLength = 0.6477; // this is 25.5 inches in meters. A-frame uses meters so we write it in meters.
        // ---------------- STRING ADDITION ---------------------------------------
        let allVis = ['first', 'second', 'third'];
        for (let z = 0; z < 3; z++) {
            let a = 1;
            let yPosStr = 0;
            for (a = 1; a <= 6; a++) {
                let str = document.createElement('a-entity');
                str.setAttribute('geometry', {
                    primitive: 'box',
                    width: scaleLength * 4,
                    height: 0.001 * 10,
                    depth: 0.001 * 10
                });
                str.setAttribute('position', { x: 0, y: yPosStr, z: 0 });

                let strID = 'screen' + z;
                strID = strID + 'string' + a;
                str.setAttribute('id', strID);
                str.setAttribute('material', 'color:red');
                let c = document.getElementById(allVis[z]);
                c.appendChild(str);
                yPosStr += 0.2
            }
        }
        // --------------------- START FRET ADDITION-------------------------------------------


        const totalFrets = 21; // just going to make 15 frets for now.
        const scaleFactor = 1.45; // manual scale factor
        let elm = document.getElementById('screen0string1');
        console.log(elm);
        let startPos = elm.object3D.position.clone();
        startPos.x = startPos.x - (scaleLength * 4 / 2);
        startPos.y += 0.5;

        this.addFret = function (distanceFromNut, fretNum, displayNum) {
            // console.log('adding fret ' + fretNum + ' at distance: ' + distanceFromNut);
            let myX = startPos.x;
            let myY = startPos.y;
            let myZ = startPos.z;

            myX = myX + (distanceFromNut * scaleFactor);

            //let p = el.getAttribute('position');
            let newMark = document.createElement('a-entity');
            newMark.setAttribute('geometry', {
                primitive: 'box',
                width: 0.075 * 10 + 0.3,
                height: 0.001 * 10,
                depth: 0.001 * 10
            });
            newMark.setAttribute('rotation', '0 0 90');
            newMark.setAttribute('material', 'color:red');
            let fretId = 'screen' + displayNum + 'fret' + fretNum;
            newMark.setAttribute('id', fretId);
            newMark.setAttribute('position', {
                x: myX,
                y: myY,
                z: myZ
            });
            elm.appendChild(newMark);
        }
        elm = document.getElementById('screen0string1');
        this.addFret(0, 0, 0); // creating Nut in the virtual world.
        elm = document.getElementById('screen1string1');
        this.addFret(0, 0, 1);
        elm = document.getElementById('screen2string1');
        this.addFret(0, 0, 1);
        let i = 1;

        for (let n = 0; n < 3; n++) { // add frets to all displays.
            let idname = 'screen' + n + 'string1'; // we are adding relative to string1.
            console.log(idname);
            elm = document.getElementById(idname);
            for (i = 1; i < totalFrets; i++) {
                let twoPower = Math.pow(2, i / 12);
                let d = (scaleLength * 4) - ((scaleLength * 4) / twoPower);
                this.addFret(d, i);
            }
        }

//---------------------- adding marker code -----------------------------------------




        let firstPoint = [1, 2]; // string 1 , fret 2
        let secondPoint = [2, 2]; // string 2 , fret 2
        let thirdPoint = [5, 7]; //string 5, fret 7
        let fourthPoint = [3, 10]; // string 3, fret 10
        let fifthPoint = [6, 4]; // string 6, fret 4
        let passedArray = [firstPoint, secondPoint, thirdPoint, fourthPoint, fifthPoint];
        this.addMarker(passedArray,0);
        this.addMarker(passedArray,1);
        this.addMarker(passedArray,2);
        this.startMusic();
    },


    remove: function () {
        this.controller.removeEventListener('gripdown', this.startMusic);
    }
});