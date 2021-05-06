AFRAME.registerComponent('hud', {
    init: function() {
        this.camera = document.querySelector('#camera');
        this.cameraPos = new THREE.Vector3();
        this.cameraDir = new THREE.Vector3();
    },
    tick: function(){
        this.cameraPos.setFromMatrixPosition(this.camera.object3D.matrixWorld);
        this.camera.object3D.getWorldDirection(this.cameraDir);
        // console.log('cameraDir' +JSON.stringify(this.cameraDir))
        this.cameraDir.normalize();

        const offset = this.el.getAttribute('offset-component'); // todo: move to init
        this.cameraPos.addScaledVector(this.cameraDir, offset.z);

        this.el.setAttribute('position', this.cameraPos);
    }
});