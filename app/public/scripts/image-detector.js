// You can also set which camera to use (front/back/etc)
// @SEE https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then(stream => {
        console.log('got video stream');
        let $video = document.querySelector('video')
        $video.srcObject = stream
        $video.onloadedmetadata = () => {
            $video.play()
        };

        let hut = document.getElementById('hut');

        //const img = document.getElementById('webcam');

        // Load the model.
        cocoSsd.load().then(model => {
            // detect objects in the image.
            setInterval(()=>{
                model.detect($video).then(predictions => {
                    console.log('Predictions: ', predictions);
                    if(predictions.length>0){
                        const prediction = predictions[Math.floor(Math.random() * predictions.length)];
                        hut.setAttribute('text', 'value: "'+prediction.class+'"');
                    }
                });
            }, 1000)
        });
    });