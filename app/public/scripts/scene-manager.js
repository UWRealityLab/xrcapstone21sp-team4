const State = {
    MENU: 'menu',
    MANUAL: 'manual',
    AUTOPLAY: 'autoplay',
    CHORDS: 'chords'
}

AFRAME.registerComponent('scene-manager', {
    init: function () {
        let state = State.MENU;
        let scene = this.el;
        let menu = document.querySelector('#ui');
        let imageTab = document.querySelector('#image-tab');
        let hud = document.querySelector('#hud');
        let chordsUIElement = null;
        let secondaryUI = document.querySelector('#secondary-ui');
        let cameraCenter = document.querySelector('#camera-center');
        let nextButton = document.querySelector('#next');
        let prevButton = document.querySelector('#prev');

        console.log('scene manager init');
    
        const togglePitchRecognition = function (isOn) {
            scene.emit('toggle-pitch-recognition', {isOn: isOn})
        }

        togglePitchRecognition(false);

        const buildChordsUI = (songNumber) => {
            if(!chordsUIElement){
                chordsUIElement = document.createElement('a-entity');
                chordsUIElement.setAttribute('geometry', 'primitive:plane;');
                chordsUIElement.setAttribute('material', 'shader:draw; fps: 1; width: 1000; height:1000');
                chordsUIElement.setAttribute('position', '0.1 -0.25 -3');
                chordsUIElement.setAttribute('chords-ui', {
                    songNumber: songNumber
                });
                hud.appendChild(chordsUIElement);
            }
        }

        const removeChordsUI = () => {
            if(chordsUIElement){
                hud.removeChild(chordsUIElement);
                chordsUIElement = null;
            }
        }


        const toggleMenu = (setVisible) => {
            if(setVisible){
                menu.setAttribute('visible', 'true');
                cameraCenter.setAttribute('raycaster', 'objects', '.ui');

            }else{
                menu.setAttribute('visible', 'false');
                cameraCenter.setAttribute('raycaster', 'objects', '.secondary-ui');

            }
        }

        const toggleSubmenu = (setVisible, showNext, showPrev) => {
            if(setVisible){
                secondaryUI.setAttribute('visible', 'true');
                if(showNext){
                    nextButton.setAttribute('visible', 'true');
                }else{
                    nextButton.setAttribute('visible', 'false');
                }
                if(showPrev){
                    prevButton.setAttribute('visible', 'true');
                }else{
                    prevButton.setAttribute('visible', 'false');
                }
            }else{
                secondaryUI.setAttribute('visible', 'false');
            }
        }

        this.playAutoplayTabs = (songNumber) => {
            if(state === State.MENU){
               // menu.setAttribute('visible', 'false');
                console.log('setting autoplay');
                toggleSubmenu(true, false, false);
                imageTab.setAttribute('autoplay', "test");
                state = State.AUTOPLAY;
            }
        }

        this.playManualTabs = (songNumber) => {
            if(state === State.MENU){
                console.log('setting manual');
                toggleSubmenu(true, true, false);

                imageTab.setAttribute('chord-keys', {
                    songNumber: songNumber // smoke on the water
                });
                state = State.MANUAL;
                togglePitchRecognition(true);


            }
        }

        this.playChords = (songNumber) => {
            if(state === State.MENU){
                toggleSubmenu(true, true, true);
                buildChordsUI(songNumber);
                state = State.CHORDS;
            }
        }

        this.menu = () => {
            if(this.state!==State.MENU){
                togglePitchRecognition(false);
                state = State.MENU;
                imageTab.removeAttribute('chord-keys');
                imageTab.removeAttribute('autoplay');
                removeChordsUI();
                toggleMenu(true);
                scene.emit('clear-screens');
                toggleSubmenu(false);
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
            toggleMenu(false);

            if(song.type===SongType.ChordPro){
                this.playChords(songNumber);
            }else if(song.type===SongType.MIDI){
                if(song.mode === Mode.Manual){
                    this.playManualTabs(songNumber);
                }else if(song.mode === Mode.Autoplay){
                    this.playAutoplayTabs(songNumber);
                }
            }

        });

        document.addEventListener('reset-menu', this.menu);

        this.secondaryUITrigger = (event) => {
            if(event.detail.value === 'home'){
                this.menu();
            }
        };
        document.addEventListener('secondary-ui-trigger', this.secondaryUITrigger);
    },
    remove: function () {
        this.controller.removeEventListener('gripdown', this.playAutoplayTabs);
        this.controller.removeEventListener('triggerdown', this.playManualTabs);
        document.removeEventListener('secondary-ui-trigger', this.secondaryUITrigger);
    }
});