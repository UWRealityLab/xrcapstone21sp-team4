AFRAME.registerComponent("tab-follower", {
        tick: function() {
            let el = this.el;
            var cameraEl = el.sceneEl.camera.el;
            var coors = cameraEl.getAttribute('position');
            let params = {
                property: 'position',
                to: {
                    x: coors.x,
                    y: coors.y,
                    z: coors.z - 2
                },
                dur: 1000,
                easing: 'easeInOutQuad'
            };
            el.setAttribute('animation', params);
        }
    }
);