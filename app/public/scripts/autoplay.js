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
            "d": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fopen-d.png?v=1619160197750", tab: [[4, 0]]},
            "f": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Ff.png?v=1619160197623", tab: [[4, 3]]},
            "g": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fg.png?v=1619160197721", tab: [[4, 5]]},
            "g#": {image: "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2Fg%23.png?v=1619160197912", tab: [[4, 6]]}
        };
      
        var countdown = {
            "1": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F1.png?v=1619680779376",
            "2": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F2.png?v=1619680783623",
            "3": "https://cdn.glitch.com/830c83ca-e1de-4fc9-a5a2-2488bca7008a%2F3.png?v=1619680787564"
        };
        var currentlyRunning = false;

        const scene = document.querySelector('a-scene');

        function animate(first, second, third, isMusic, i) {
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
                if (isMusic) {
                  var thirdI = i + 1;
                  if (thirdI == times.length) { thirdI = 0; }
                  thirdI++;
                  if (thirdI == times.length) { thirdI = 0; }
                  first.setAttribute('src', notes[times[thirdI]["note"]].image);
                  first.setAttribute('position', {
                      x: thirdPos.x,
                      y: thirdPos.y,
                      z: thirdPos.z
                  });
                } else {
                  first.setAttribute('src', notes[times[i]["note"]].image);
                  first.setAttribute('position', {
                      x: thirdPos.x,
                      y: thirdPos.y,
                      z: thirdPos.z
                  });
                }

                first.setAttribute('id', 'third');
                second.setAttribute('id', 'first');
                third.setAttribute('id', 'second');
        }
        this.startMusic = function(e) {
            // this.controller.removeEventListener('gripdown', this.startMusic);
            if (currentlyRunning) { return; }
            currentlyRunning = true;

            function nextNote(i, isMusic) {
                // swapping photos
                // update the front facing note

                console.log('next note: '+i);
                if(times[i]){
                    scene.emit('tab-change', {tab: notes[times[i].note].tab});
                }else{
                    scene.emit('tab-change', []);
                }



                var first = null;
                var second = null;
                var third = null;
                for (var j = 0; j < 3; j++) {
                    if (el.children[j].id == "first") { first = el.children[j]; }
                    if (el.children[j].id == "second") { second = el.children[j]; }
                    if (el.children[j].id == "third") { third = el.children[j]; }
                }
                animate(first, second, third, isMusic, i);
                
            }
          

            console.log("start the music");
            // var i = 0;
            var first = null;
            var second = null;
            var third = null;
            for (var j = 0; j < 3; j++) {
                if (el.children[j].id == "first") { first = el.children[j]; }
                if (el.children[j].id == "second") { second = el.children[j]; }
                if (el.children[j].id == "third") { third = el.children[j]; }
            }
            
          
            first.setAttribute('src', countdown["3"]);
            second.setAttribute('src', countdown["2"]);
            third.setAttribute('src', countdown["1"]);

            e.stopImmediatePropagation();
            // first.setAttribute('src', notes[times[0]["note"]]);
            // second.setAttribute('src', notes[times[1]["note"]]);
            // third.setAttribute('src', notes[times[2]["note"]]);
            recursiveCountdown(0);
            function recursiveCountdown(i) {
              if (i==3) { return; }
              console.log("countup in here")
              setTimeout(() => {nextNote(i, false); recursiveCountdown(i+1);}, 1000);
            }
            var total_completes = 0;
            function recursiveTimeout(i) {
              if (i+1 == times.length) {
                console.log("---repeat---")
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
            
            setTimeout(() => {water.play(); recursiveTimeout(0);}, 3000);
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