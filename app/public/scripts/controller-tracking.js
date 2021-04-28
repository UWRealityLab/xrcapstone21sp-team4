AFRAME.registerComponent('controller-tracking', {
    init: function(){
        this.realModel = document.querySelector('#real-controller');
        // this.fretboard = document.querySelector('#fretboard');
        /*this.realModel.setAttribute('offset', {
            x: 0.0,
            y: 0.0,
            z: 0.0
        })*/

        this.el.parentEl.addEventListener('touchpadtouchstart', function(event){
            console.log('touchpadstart on parent');
        })
        this.el.addEventListener('touchpadtouchstart', function(event){
            console.log('touchpadstart on controller');
        });

        this.el.addEventListener('gripdown', function(event){
            console.log('gripdown on controller');
        })
    },
    tick: function(){
        let worldPos = new THREE.Vector3();
        worldPos.setFromMatrixPosition(this.el.object3D.matrixWorld);

        const offset= this.realModel.getAttribute('offset-component');
         // todo: move to init when set
        // console.log('offset: '+offset.x+', '+offset.y+' ,'+offset.z);

        // todo: math for relative offset (ie offset wrt origin forward direction)
        this.realModel.setAttribute('position', {
            x: worldPos.x + offset.x,
            y: worldPos.y + offset.y,
            z: worldPos.z + offset.z
        });

        const rotation = this.el.getAttribute('rotation');
        this.realModel.setAttribute('rotation', {
            x: rotation.x,
            y: -rotation.y,
            z: rotation.z
        });
    },
    remove: function(){

    }
})