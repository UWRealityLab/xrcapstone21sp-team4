// You can also set which camera to use (front/back/etc)
// @SEE https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/151-ukulele-tuner.html
// https://youtu.be/F1OkDTUkKFo
// https://editor.p5js.org/codingtrain/sketches/8io2zvT03

const model_url =
    'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let audioContext;
let freq = 0;
let threshold = 1;
let pitchMonitor;
let scene;

let notes = [
    {
        note: 'E',
        freq: 329.6276
    },
    {
        note: 'B',
        freq: 246.94
    },
    {
        note: 'G',
        freq: 196.00
    },
    {
        note: 'D',
        freq: 146.83
    },
    {
        note: 'A',
        freq: 110.00
    },
    {
        note: 'E',
        freq: 82.41
    }
];

function setup() {
    console.log('audio setup');
    scene = document.querySelector('a-scene');
    audioContext = new AudioContext();
    mic = new p5.AudioIn();
    mic.start(listening);
}

function listening() {
    console.log('listening');
    audioContext.resume();
    pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

// function draw() {
//     background(0);
//     textAlign(CENTER, CENTER);
//     fill(255);
//     textSize(32);
//     text(freq.toFixed(2), width / 2, height - 150);

//     let closestNote = -1;
//     let recordDiff = Infinity;
//     for (let i = 0; i < notes.length; i++) {
//         let diff = freq - notes[i].freq;
//         if (Math.abs(diff) < Math.abs(recordDiff)) {
//             closestNote = notes[i];
//             recordDiff = diff;
//         }
//     }

//     textSize(64);
//     text(closestNote.note, width / 2, height - 50);

//     let diff = recordDiff;
//     // let amt = map(diff, -100, 100, 0, 1);
//     // let r = color(255, 0, 0);
//     // let g = color(0, 255, 0);
//     // let col = lerpColor(g, r, amt);

//     let alpha = map(abs(diff), 0, 100, 255, 0);
//     rectMode(CENTER);
//     fill(255, alpha);
//     stroke(255);
//     strokeWeight(1);
//     if (abs(diff) < threshold) {
//         fill(0, 255, 0);
//     }
//     rect(200, 100, 200, 50);

//     stroke(255);
//     strokeWeight(4);
//     line(200, 0, 200, 200);

//     noStroke();
//     fill(255, 0, 0);
//     if (abs(diff) < threshold) {
//         fill(0, 255, 0);
//     }
//     rect(200 + diff / 2, 100, 10, 75);
// }

function modelLoaded() {
    console.log('audio model loaded');
    setTimeout(()=>{
        pitch.getPitch(gotPitch);
    }, 10);
}

function gotPitch(error, frequency) {
    if (error) {
        console.error(error);
    } else {
        // console.log('got pitch: '+frequency);
        if (frequency) {
            freq = frequency;
            scene.emit('pitch', {"freq": freq});
        }
        // setTimeout(() => {pitch.getPitch(gotPitch)}, 10);
        // const material = pitchMonitor.getObject3D('mesh').material;
        // if(!material || !material.map){
        //     console.log('pitchMonitor: no material');
        // }else{
        //     material.map.needsUpdate = true;
        // }

    }
}