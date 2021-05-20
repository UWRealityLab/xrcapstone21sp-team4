AFRAME.registerComponent('hud', {
    init: function() {
        this.camera = document.querySelector('#camera');
        this.cameraPos = new THREE.Vector3();
        this.cameraDir = new THREE.Vector3();

        this.tick = AFRAME.utils.throttleTick(this.tick, 1000, this);
    },
    tick: function(){
        this.offset = this.el.getAttribute('offset-component');
        this.cameraPos.setFromMatrixPosition(this.camera.object3D.matrixWorld);
        this.camera.object3D.getWorldDirection(this.cameraDir);
        // console.log('cameraDir' +JSON.stringify(this.cameraDir))
        this.cameraDir.normalize();
        this.cameraPos.addScaledVector(this.cameraDir, this.offset.z);
        // this.el.setAttribute('position', this.cameraPos);

        // animate movement
        let params = {
            property: 'position',
            to: {
                x: this.cameraPos.x,
                y: this.cameraPos.y,
                z: this.cameraPos.z
            },
            dur: "200",
        };
        this.el.setAttribute('animation', params);
    }
});