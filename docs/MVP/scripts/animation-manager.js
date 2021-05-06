AFRAME.registerComponent("animation-manager", {
    init: function() {
        // wait for the first animation to finish
        this.el.addEventListener("animationcomplete__first", e => {
            // start the second animation
            this.el.emit("second")
        });
    }
});