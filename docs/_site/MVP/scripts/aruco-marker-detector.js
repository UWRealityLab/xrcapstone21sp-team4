// You can also set which camera to use (front/back/etc)
// @SEE https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then(stream => {
        console.log('got video stream');
        let video = document.querySelector('video')
        video.srcObject = stream
        video.onloadedmetadata = () => {
            video.play();

            let hiddenCanvas = document.querySelector('#hiddenCanvas');
            let context = hiddenCanvas.getContext('2d');
            const feedWidth = 1440; // magic leap camera res
            const feedHeight = 1080;

            hiddenCanvas.width = feedWidth;
            hiddenCanvas.height = feedHeight;
            console.log('got feed dimensions: '+feedWidth+', '+feedHeight);

            const markerEntity = document.querySelector('#marker');
            const cameraEl = document.querySelector('#camera');

            const detector = new AR.Detector();

            // model size is in mm (marker size)
            const MARKER_SIZE = 80;
            const posit = new POS.Posit(MARKER_SIZE, feedWidth);

            setInterval(()=> {
                //console.log('video dim: '+video.width+', '+video.height);
                context.drawImage(video, 0, 0, feedWidth, feedHeight);
                // todo: perspective transform image. this is from the upper left magic leap camera
                let imageData = context.getImageData(0, 0, feedWidth, feedHeight);
                let markers = detector.detect(imageData);
                console.log('detected markers: '+markers.length);

                for(let marker of markers){
                    const corners = marker.corners;
                    // center corners on canvas
                    for (let i = 0; i < corners.length; ++ i){
                        let corner = corners[i];
                        corner.x = corner.x - (feedWidth / 2);
                        corner.y = (feedHeight / 2) - corner.y;
                    }

                    const pose = posit.pose(corners); // type: POS.pose
                    console.log('positionZ: '+pose.bestTranslation);
                    const position = pose.bestTranslation;

                    let worldPos = new THREE.Vector3();
                    worldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);

                    markerEntity.setAttribute('position', {
                        x: worldPos.x + position[0]/1000.0,
                        y: worldPos.y + position[1]/1000.0,
                        z: worldPos.z -position[2]/1000.0
                    })
                }

            }, 1000)

        };


    });

/*async function listDevices(){
    const devices = await navigator.mediaDevices.enumerateDevices();
    //const videoDevices = devices.filter(device => device.kind === 'videoinput');
    for(let device of devices){
        console.log('videoDevice: '+JSON.stringify(device));
    }
}
listDevices();*/

