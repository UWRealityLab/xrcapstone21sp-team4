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
    },
    tick: function(){
        let worldPos = new THREE.Vector3();
        let worldDir = new THREE.Vector3();
        worldPos.setFromMatrixPosition(this.trackedEl.object3D.matrixWorld);
        this.trackedEl.object3D.getWorldDirection(worldDir);
        worldDir.normalize();

        let worldQuaternion = new THREE.Quaternion();
        this.trackedEl.object3D.getWorldQuaternion(worldQuaternion);

        let up = this.trackedEl.object3D.up.clone();
        //console.log('up before applying: '+JSON.stringify(up));
        up.applyQuaternion( worldQuaternion );
        //console.log('up after applying: '+JSON.stringify(up));
        up.normalize();
        let cross = new THREE.Vector3();
        cross.crossVectors(worldDir, up);
        cross.normalize();

        const offset= this.realModel.getAttribute('offset-component');
         // todo: move to init when set
        // console.log('offset: '+offset.x+', '+offset.y+' ,'+offset.z);

        // todo: math for relative offset (ie offset wrt origin forward direction)
        let offsetPos = worldPos.clone();
        offsetPos.addScaledVector(worldDir, offset.z);
        offsetPos.addScaledVector(up, offset.y);
        offsetPos.addScaledVector(cross, offset.x);

        let z_axis = worldPos.clone();
        z_axis.addScaledVector(worldDir, 0.2);
        let y_axis = worldPos.clone();
        y_axis.addScaledVector(up, 0.2);
        let x_axis = worldPos.clone();
        x_axis.addScaledVector(cross, 0.2);

        this.axisLines.setAttribute('line__3', {
            'start': worldPos,
            'end': z_axis,
            'color': 'blue'
        });


        this.axisLines.setAttribute('line__2', {
            'start': worldPos,
            'end': y_axis,
            'color': 'green'
        });


        this.axisLines.setAttribute('line', {
            'start': worldPos,
            'end': x_axis,
            'color': 'red'
        });


        this.realModel.setAttribute('position', {
            x: offsetPos.x,
            y: offsetPos.y,
            z: offsetPos.z
        });

        this.realModel.object3D.setRotationFromQuaternion(worldQuaternion);


        // update controller estimate
        let controllerPos = new THREE.Vector3();
        controllerPos.setFromMatrixPosition(this.el.object3D.matrixWorld);
        let cameraPos = new THREE.Vector3();
        cameraPos.setFromMatrixPosition(this.camera.object3D.matrixWorld);
        let cameraToController = new THREE.Vector3();
        cameraToController.subVectors(controllerPos, cameraPos);
        let length = cameraToController.length();
        cameraToController.normalize();
        const estimateOffset = this.controllerEstimate.getAttribute('offset-component');
        let estimatePos = cameraPos.clone();
        estimatePos.addScaledVector(cameraToController, length*estimateOffset.x);
        this.controllerEstimate.setAttribute('position', estimatePos);


        let controllerQuaternion = new THREE.Quaternion();
        this.el.object3D.getWorldQuaternion(controllerQuaternion);
        this.controllerEstimate.object3D.setRotationFromQuaternion(controllerQuaternion);


    },
    remove: function(){

    }
})