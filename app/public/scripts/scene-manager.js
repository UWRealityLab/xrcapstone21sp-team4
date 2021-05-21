const State = {
    MENU: 'menu',
    MANUAL: 'manual',
    AUTOPLAY: 'autoplay'
}

AFRAME.registerComponent('scene-manager', {
    init: function () {
        let state = State.MENU;
        let scene = this.el;
        let menu = document.querySelector('#menu');
        let imageTab = document.querySelector('#image-tab');

        let initialImageTab = imageTab.innerHTML;


    
        const togglePitchRecognition = function (isOn) {
            scene.emit('toggle-pitch-recognition', {isOn: isOn})
        }

        togglePitchRecognition(false);

        // todo: toggle pitch recognition
        this.autoplay = () => {
            if(state === State.MENU){
                menu.setAttribute('visible', 'false');
                togglePitchRecognition(false);
                console.log('setting autoplay');
                imageTab.setAttribute('autoplay', "test");
                state = State.AUTOPLAY;
            }
        }
        this.manual = () => {
            if(state === State.MENU){
                console.log('setting manual');
                menu.setAttribute('visible', 'false');
                imageTab.setAttribute('chord-keys', "none");
                state = State.MANUAL;
                togglePitchRecognition(true);
            }else if(state === State.MANUAL){
                scene.emit('start-music', {});
            }
        }

        this.menu = () => {
            if(this.state!==State.MENU){
                togglePitchRecognition(false);
                state = State.MENU;
                imageTab.removeAttribute('chord-keys');
                imageTab.removeAttribute('autoplay');
                menu.setAttribute('visible', 'true');
                scene.emit('clear-screens');


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