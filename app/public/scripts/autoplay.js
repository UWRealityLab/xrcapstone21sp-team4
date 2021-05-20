AFRAME.registerComponent('autoplay', {
    init: function() {

        this.scene = document.querySelector('a-scene');
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
            "D3": {tab: [[5, 5]]},
            "F3": { tab: [[4, 3]]},
            "G3": {tab: [[ 4, 5]]},
            "G#3": { tab: [[4, 6]]}
        };


        var countdown = {
            "1": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F1.png?v=1620104560154",
            "2": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F2.png?v=1620104562410",
            "3": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F3.png?v=1620104566565"
        };
        var currentlyRunning = false;

        var first = document.getElementById('first');
        var second = document.getElementById('second');
        var third = document.getElementById('third');

        function animate(/*first, second, third, */isMusic, i) {
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
                // first.setAttribute('src', notes[times[thirdI]["note"]].image);
                scene.emit('show-screen-marker', {tab: notes[times[thirdI]["note"]].tab, screen: getScreenNumber(first.id)});
                first.setAttribute('geometry', {
                    primitive: 'box',
                    width: 1,
                    height: 1,
                    depth: 0
                });
                first.setAttribute('material', 'transparent:true; opacity: 0');
                first.setAttribute('position', thirdPos);
            } else {
                // first.setAttribute('src', notes[times[i]["note"]].image);
                scene.emit('show-screen-marker', {tab: notes[times[i]["note"]].tab, screen: getScreenNumber(first.id)});
                // first.setAttribute('src', '');
                first.setAttribute('material', 'transparent:true; opacity: 0');
                first.setAttribute('geometry', {
                    primitive: 'box',
                    width: 1,
                    height: 1,
                    depth: 0
                });
                first.setAttribute('position', thirdPos);
            }

            let firstCopy = first;
            first = second;
            second = third;
            third = firstCopy;
            /*first.setAttribute('id', 'third');
            second.setAttribute('id', 'first');
            third.setAttribute('id', 'second');*/
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

                animate(/*first, second, third, */isMusic, i);
            }


            /*console.log("start the music");
            var first = document.getElementById('first');
            var second = document.getElementById('second');
            var third = document.getElementById('third');*/


            //first.setAttribute('src', countdown["3"]);
            //second.setAttribute('src', countdown["2"]);
            //third.setAttribute('src', countdown["1"]);
            scene.emit('show-screen-marker', {tab: [[3, 3], [3, 4], [3, 5]], screen: getScreenNumber(first.id)});
            scene.emit('show-screen-marker', {tab: [[3, 3], [3, 4]], screen: getScreenNumber(second.id)});
            scene.emit('show-screen-marker', {tab: [[3, 3]], screen: getScreenNumber(third.id)});

            // e.stopImmediatePropagation();

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
                        scene.emit('reset-menu');
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
            }

            setTimeout(() => { water.play(); recursiveTimeout(0); }, 3000);
        }


        this.startMusic();


    },

    remove: function () {
    }
});