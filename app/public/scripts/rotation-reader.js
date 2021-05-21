AFRAME.registerComponent('rotation-reader', {
    /**
     * We use IIFE (immediately-invoked function expression) to only allocate one
     * vector or euler and not re-create on every tick to save memory.
     */
    tick: function () {
      let img = document.getElementById('image-tab');
     // console.log(img)

      img.setAttribute('position', {
          x: this.el.object3D.position.x,
          y: this.el.object3D.position.y -8,
          z: this.el.object3D.position.z -4
      });
      //console.log(this.el.object3D.position);
      img.setAttribute('rotation', this.el.object3D.rotation);

    }
  });