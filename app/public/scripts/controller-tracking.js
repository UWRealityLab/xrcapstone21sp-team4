AFRAME.registerComponent('controller-tracking', {
    init: function(){
        this.realModel = document.querySelector('#real-controller');

        // this.fretboard = document.querySelector('#fretboard');
        /*this.realModel.setAttribute('offset', {
            x: 0.0,
            y: 0.0,
            z: 0.0
        })*/
        this.axisLines = document.querySelector('#axisLines')
        // this.trackedEl = document.querySelector('#controller-child');
        this.trackedEl = document.querySelector('#controller-estimate');
        this.controllerEstimate = document.querySelector('#controller-estimate');
        this.camera = document.querySelector('#camera-center');
        this.worldPos = new THREE.Vector3();
        this.worldDir = new THREE.Vector3();
        this.worldQuaternion = new THREE.Quaternion();
        this.cross = new THREE.Vector3();
        this.controllerPos = new THREE.Vector3();
        this.cameraPos = new THREE.Vector3();
        this.cameraToController = new THREE.Vector3();
        this.controllerQuaternion = new THREE.Quaternion();

        this.tick = AFRAME.utils.throttleTick(this.tick, 50, this);

    },
    tick: function(t, dt){
        this.offset= this.realModel.getAttribute('offset-component'); // todo: move to init


        this.worldPos.setFromMatrixPosition(this.trackedEl.object3D.matrixWorld);
        this.trackedEl.object3D.getWorldDirection(this.worldDir);
        this.worldDir.normalize();


        this.trackedEl.object3D.getWorldQuaternion(this.worldQuaternion);

        let up = this.trackedEl.object3D.up.clone();
        //console.log('up before applying: '+JSON.stringify(up));
        up.applyQuaternion( this.worldQuaternion );
        //console.log('up after applying: '+JSON.stringify(up));
        up.normalize();

        this.cross.crossVectors(this.worldDir, up);
        this.cross.normalize();

         // todo: move to init when set
        // console.log('offset: '+offset.x+', '+offset.y+' ,'+offset.z);

        // todo: math for relative offset (ie offset wrt origin forward direction)
        let offsetPos = this.worldPos.clone();
        offsetPos.addScaledVector(this.worldDir, this.offset.z);
        offsetPos.addScaledVector(up, this.offset.y);
        offsetPos.addScaledVector(this.cross, this.offset.x);

        // todo: potentially scale axes by some fraction of the z axis - the distance between
        // the magic leap controller and the origin located at the headset
        // Will help with magnified inaccuracy at greater distances between headset and controller,
        // and dampen some of the jitter that we're now experiencing.
        
        let relativeOffsetScale = 0.2;

        let z_axis = this.worldPos.clone();
        z_axis.addScaledVector(this.worldDir, relativeOffsetScale);
        let y_axis = this.worldPos.clone();
        y_axis.addScaledVector(up, relativeOffsetScale);
        let x_axis = this.worldPos.clone();
        x_axis.addScaledVector(this.cross, relativeOffsetScale);

        this.axisLines.setAttribute('line__3', {
            'start': this.worldPos,
            'end': z_axis,
            'color': 'blue'
        });


        this.axisLines.setAttribute('line__2', {
            'start': this.worldPos,
            'end': y_axis,
            'color': 'green'
        });


        this.axisLines.setAttribute('line', {
            'start': this.worldPos,
            'end': x_axis,
            'color': 'red'
        });

        this.realModel.object3D.position.set(offsetPos.x, offsetPos.y, offsetPos.z);

        this.realModel.object3D.setRotationFromQuaternion(this.worldQuaternion);


        // update controller estimate
        this.controllerPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
        this.cameraPos.setFromMatrixPosition(this.camera.object3D.matrixWorld);
        this.cameraToController.subVectors(this.controllerPos, this.cameraPos);
        let length = this.cameraToController.length();
        this.cameraToController.normalize();
        const estimateOffset = this.controllerEstimate.getAttribute('offset-component');
        let estimatePos = this.cameraPos.clone();
        estimatePos.addScaledVector(this.cameraToController, length*estimateOffset.x);
        this.controllerEstimate.object3D.position.copy(estimatePos);

        this.el.object3D.getWorldQuaternion(this.controllerQuaternion);
        this.controllerEstimate.object3D.setRotationFromQuaternion(this.controllerQuaternion);


    },
    remove: function(){

    }
})