const State = {
    MENU: 'menu',
    MANUAL: 'manual',
    AUTOPLAY: 'autoplay'
}

AFRAME.registerComponent('scene-manager', {
    init: function () {
        let state = State.MENU;
        let scene = this.el;
        let menu = document.querySelector('#ui');
        let menuParent = menu.parentNode;
        let imageTab = document.querySelector('#image-tab');

        console.log('scene manager init');
    
        const togglePitchRecognition = function (isOn) {
            scene.emit('toggle-pitch-recognition', {isOn: isOn})
        }

        togglePitchRecognition(false);

        this.autoplay = (songNumber) => {
            if(state === State.MENU){
               // menu.setAttribute('visible', 'false');
                menu.parentNode.removeChild(menu);
                togglePitchRecognition(false);
                console.log('setting autoplay');
                imageTab.setAttribute('autoplay', "test");
                state = State.AUTOPLAY;
            }
        }

        this.manual = (songNumber) => {
            if(state === State.MENU){
                console.log('setting manual');
                // menu.setAttribute('visible', 'false');
                menu.parentNode.removeChild(menu);
                imageTab.setAttribute('chord-keys', {
                    songNumber: songNumber // smoke on the water
                });
                state = State.MANUAL;
                togglePitchRecognition(true);
            } else if(state === State.MANUAL){
                scene.emit('start-music', {});
            }
        }

        this.menu = () => {
            if(this.state!==State.MENU){
                togglePitchRecognition(false);
                state = State.MENU;
                imageTab.removeAttribute('chord-keys');
                imageTab.removeAttribute('autoplay');
                // menu.setAttribute('visible', 'true');
                // menu.parentNode.removeChild(menu);
                menuParent.appendChild(menu);
                scene.emit('clear-screens');
            }
        }

        // this.controller = document.querySelector('#controller');
        /*this.controller.addEventListener('gripdown', this.autoplay);
        this.controller.addEventListener('triggerdown', this.manual);*/

        document.addEventListener('start', (event) => {
            console.log('scene manager start');
            let song = event.detail.song;
            console.log('scene-manager start with song: '+JSON.stringify(song));
            if(!song){
                return;
            }
            let songNumber = GuitarSongs.findIndex((guitarSong) => guitarSong.id === song.id);
            if(song.mode === Mode.Manual){
                this.manual(songNumber);
            }else if(song.mode === Mode.Autoplay){
                this.autoplay(songNumber);
            }
        });

        document.addEventListener('reset-menu', this.menu);
    },
    remove: function () {
        this.controller.removeEventListener('gripdown', this.autoplay);
        this.controller.removeEventListener('triggerdown', this.manual);
    }
});