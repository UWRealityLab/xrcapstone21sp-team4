const State = {
    MENU: 'menu',
    MANUAL: 'manual',
    AUTOPLAY: 'autoplay'
}

AFRAME.registerComponent('scene-manager', {
    init: function () {
        let state = State.MENU;
        let scene = this.el;
        let imageTab = document.querySelector('#image-tab');

        let initialImageTab = imageTab.innerHTML;



        const togglePitchRecognition = function (isOn) {
            scene.emit('toggle-pitch-recognition', {isOn: isOn})
        }

        togglePitchRecognition(false);

        // todo: toggle pitch recognition
        this.autoplay = () => {
            if(state === State.MENU){
                togglePitchRecognition(false);
                console.log('setting autoplay');
                imageTab.setAttribute('autoplay', "test");
                state = State.AUTOPLAY;
            }
        }
        this.manual = () => {
            if(state === State.MENU){
                console.log('setting manual');
                imageTab.setAttribute('chord-keys', "none");
                state = State.MANUAL;
                togglePitchRecognition(true);
            }
        }

        this.menu = () => {
            if(this.state!==State.MENU){
                imageTab.innerHTML = initialImageTab;
                state = State.MENU;
                togglePitchRecognition(false);

            }
        }

        this.controller = document.querySelector('#controller');
        this.controller.addEventListener('gripdown', this.autoplay);
        this.controller.addEventListener('triggerdown', this.manual);
        document.addEventListener('click', this.manual); // for debugging

        document.addEventListener('reset-menu', this.menu);
    },
    remove: function () {
        this.controller.removeEventListener('gripdown', this.autoplay);
        this.controller.removeEventListener('triggerdown', this.manual);
    }
});