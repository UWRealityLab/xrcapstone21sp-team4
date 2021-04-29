AFRAME.registerComponent('chord-keys', {
    init: function() {

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
        var i = 0;
        var times = [
            {"note": "d", "start": 0, "end": 0.5},
            {"note": "f", "start": 0.5, "end": 1.2},
            {"note": "g", "start": 1.2, "end": 2},
            {"note": "d", "start": 2, "end": 2.5},
            {"note": "f", "start": 2.5, "end": 3.2},
            {"note": "g#", "start": 3.2, "end": 3.52},
            {"note": "g", "start": 3.43, "end": 4.5},
            {"note": "d", "start": 4.5, "end": 4.9},
            {"note": "f", "start": 4.9, "end": 5.6},
            {"note": "g", "start": 5.6, "end": 6.4},
            {"note": "f", "start": 6.4, "end": 6.9},
            {"note": "d", "start": 6.9, "end": 8.5},
        ];
        var notes = {
            "d": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fopen-d.png?v=1619160197750",
            "f": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Ff.png?v=1619160197623",
            "g": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fg.png?v=1619160197721",
            "g#": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fg%23.png?v=1619160197912"
        };
        this.startMusic = async function(e) {
            console.log('startmusic called');
            /*if (e.target.id != "first") { return; }*/

            console.log('begin');
            console.log(el)
            if (i >= times.length) { console.log('repeat of song'); i = 0; }

            // swapping photos
            // update the front facing note
            var first = null;
            var second = null;
            var third = null;
            for (var j = 0; j < 3; j++) {
                if (el.children[j].id == "first") { first = el.children[j]; }
                if (el.children[j].id == "second") { second = el.children[j]; }
                if (el.children[j].id == "third") { third = el.children[j]; }
            }

            if (beginClick) {
                beginClick = false;
                first.setAttribute('src', notes[times[0]["note"]]);
                second.setAttribute('src', notes[times[1]["note"]]);
                third.setAttribute('src', notes[times[2]["note"]]);
                return;
            }

            // fade out first and move to last
            first.setAttribute('animation__first', {
                property: 'material.opacity',
                begin: 'fade',
                to: '0'});

            // not workin
            // this.move = function(tab, dest) {
            //   var params = {
            //     to: {
            //       x: firstPos.x,
            //       y: firstPos.y,
            //       z: firstPos.z
            //     },
            //     duration: 50,
            //     easing: 'easeInOutQuad'
            //   }
            //   tab.setAttribute('animation', params);
            // }

            // move second to first
            var params = {
                property: 'position',
                to: {
                    x: firstPos.x,
                    y: firstPos.y,
                    z: firstPos.z
                },
                dur: "100",
            };
            second.setAttribute('animation', params);

            var params = {
                property: 'position',
                to: {
                    x: secondPos.x,
                    y: secondPos.y,
                    z: secondPos.z
                },
                dur: "100",
            };
            third.setAttribute('animation', params);
            // move th

            var thirdI = i + 1;
            if (thirdI == times.length) { thirdI = 0; }
            thirdI++;
            if (thirdI == times.length) { thirdI = 0; }
            thirdI++;
            if (thirdI == times.length) { thirdI = 0; }
            console.log(thirdI);

            first.setAttribute('src', notes[times[thirdI]["note"]]);
            first.setAttribute('position', {
                x: thirdPos.x,
                y: thirdPos.y,
                z: thirdPos.z
            });
            first.setAttribute('animation__second', {
                property: 'material.opacity',
                begin: 'fade',
                to: '1',
                startEvents: 'second'});

            function snip(start, end) {
                water.currentTime = start;
                console.log('play')
                // this system is flawed, audio of progressing notes can get
                // cut awkwardly
                water.play()
                setTimeout(() => {water.pause();}, (end - start) * 1000);
            }


            first.setAttribute('id', 'third');
            second.setAttribute('id', 'first');
            third.setAttribute('id', 'second');

            console.log(times[i])
            snip(times[i]["start"], times[i]["end"]);
            i++;
            console.log('end');
            console.log(el)

        }

        this.controller = document.querySelector('#controller');
        // max will change this function called from a click to a correct
        // note
        this.controller.addEventListener('triggerdown', this.startMusic);
    },
    remove: function() {
        this.controller.removeEventListener('triggerdown', this.startMusic);
    }
});

//       // swapping photos
//       // update the front facing note
//       el.children[0].setAttribute('src', notes[times[i]["note"]]);
//       var futureI = i + 1;
//       if (futureI == times.length) {
//         futureI = 0;
//       }
//       el.children[1].setAttribute('src', notes[times[futureI]["note"]]);
//       futureI++;
//       if (futureI == times.length) {
//         futureI = 0;
//       }
//       el.children[2].setAttribute('src', notes[times[futureI]["note"]]);

//       function snip(start, end) {
//         water.currentTime = start;
//         water.play();
//         setTimeout(() => {water.pause();}, (end - start) * 1000);
//       }
