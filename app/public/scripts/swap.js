AFRAME.registerComponent('swap', {
    init: function () {


        var el = this.el;
        let scene = document.querySelector('a-scene');

        let togglePitchRecognition = function (isOn) {
            scene.emit('toggle-pitch-recognition', {isOn: isOn})
        }

        togglePitchRecognition(false);

        this.autoplay = function () {
            togglePitchRecognition(false);
            el.setAttribute('autoplay', "test");
            el.removeAttribute('swap');
        }
        this.manual = function () {
            el.setAttribute('chord-keys', "none");
            el.removeAttribute('swap');
            togglePitchRecognition(true);
        }
        this.controller = document.querySelector('#controller');
        this.controller.addEventListener('gripdown', this.autoplay);
        this.controller.addEventListener('triggerdown', this.manual);
        document.addEventListener('click', this.manual); // for debugging
    },
    remove: function () {
        this.controller.removeEventListener('gripdown', this.autoplay);
        this.controller.removeEventListener('triggerdown', this.manual);
    }
});