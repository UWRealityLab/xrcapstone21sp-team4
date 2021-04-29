AFRAME.registerComponent('autoplay', {
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
            "d": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fopen-d.png?v=1619160197750",
            "f": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Ff.png?v=1619160197623",
            "g": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fg.png?v=1619160197721",
            "g#": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fg%23.png?v=1619160197912"
        };

        this.startMusic = function(e) {
            // this.controller.removeEventListener('gripdown', this.startMusic);
              function nextNote(i) {
                // swapping photos
                // update the front facing note
                console.log("next Note---: " + i);
                var first = null;
                var second = null;
                var third = null;
                for (var j = 0; j < 3; j++) {
                    if (el.children[j].id == "first") { first = el.children[j]; }
                    if (el.children[j].id == "second") { second = el.children[j]; }
                    if (el.children[j].id == "third") { third = el.children[j]; }
                }

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
                
                // thirdI++;
                // if (thirdI == times.length) { thirdI = 0; }
                // console.log(times[thirdI]["note"]);
                first.setAttribute('src', notes[times[thirdI]["note"]]);
                first.setAttribute('position', {
                    x: thirdPos.x,
                    y: thirdPos.y,
                    z: thirdPos.z
                });


                first.setAttribute('id', 'third');
                second.setAttribute('id', 'first');
                third.setAttribute('id', 'second');
            }
          

            console.log("start the music");
            var i = 0;
            var first = null;
            var second = null;
            var third = null;
            for (var j = 0; j < 3; j++) {
                if (el.children[j].id == "first") { first = el.children[j]; }
                if (el.children[j].id == "second") { second = el.children[j]; }
                if (el.children[j].id == "third") { third = el.children[j]; }
            }

            first.setAttribute('src', notes[times[0]["note"]]);
            second.setAttribute('src', notes[times[1]["note"]]);
            third.setAttribute('src', notes[times[2]["note"]]);

            water.play();
            function recursiveTimeout(i) {
              if (i+1 == times.length) {
                console.log("---repeat---")
                var start = times[i]["start"];
                var end = times[i]["end"];
                setTimeout(() => {nextNote(0); recursiveTimeout(0);}, (end - start) * 1000);
              } else {
                var start = times[i]["start"];
                var end = times[i]["end"];
                setTimeout(() => {nextNote(i+1); recursiveTimeout(i+1);}, (end - start) * 1000);
              }
            }
            recursiveTimeout(0);
        }

        this.controller = document.querySelector('#controller');
        // max will change this function called from a click to a correct
        // note
        this.controller.addEventListener('gripdown', this.startMusic);
    },
    remove: function() {
        this.controller.removeEventListener('gripdown', this.startMusic);
    }
});