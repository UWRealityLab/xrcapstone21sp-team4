
this.scene = document.querySelector("a-scene");
var base = document.querySelector('#base');
var index = document.querySelector('#indexFinger');
var middle = document.querySelector('#middleFinger');
var ring = document.querySelector('#ringFinger');
var pinkie = document.querySelector('#pinkieFinger');


this.changeMesh = function(shape) {
    // var handEl = document.querySelector('#hand');
   // console.log('shape');
   // console.log(shape);
    base.object3D.visible = false;
    index.object3D.visible = false;
    middle.object3D.visible = false;
    ring.object3D.visible = false;
    pinkie.object3D.visible = false;
    if (shape == 'index') {
        index.object3D.visible = true;
    }
    else if (shape == 'middle') {
        middle.object3D.visible = true;
    }
    else if (shape == 'ring') {
        ring.object3D.visible = true;
    }
    else if (shape == 'pinkie') {
        pinkie.object3D.visible = true;
    } else {
        base.object3D.visible = true;
    }

}

scene.addEventListener('hand-change', (event) => {
    this.changeMesh(event.detail.shape)
});
//console.log('hereere');