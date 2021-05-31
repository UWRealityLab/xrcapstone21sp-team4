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

ml5.tf.enableProdMode();
ml5.tf.setBackend('webgl');
console.log('tf: '+JSON.stringify(ml5.tf.ENV.features));


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

function modelLoaded() {
    console.log('audio model loaded');

    let isRunning = false;
    audioContext.suspend();

    scene.addEventListener('toggle-pitch-recognition', event => {
        console.log('toggle-pitch-recognition isOn: '+event.detail.isOn);
        if(event.detail.isOn){
            // todo: enable
            /*if(!isRunning){
                isRunning = true;
                audioContext.resume();
            }*/
        }else{
            if(isRunning){
                isRunning = false;
                audioContext.suspend();
            }
        }
    });


    setInterval(() => {
        if(isRunning){
            pitch.getPitch(gotPitch);
        }

    }, 200);
}

function gotPitch(error, frequency) {
    if (error) {
        console.error(error);
    } else {
        if (frequency) {
            //console.log('got pitch: '+frequency); todo: enable
            freq = frequency;
            scene.emit('pitch', {"freq": freq});
        }

    }
}