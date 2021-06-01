let songList = ['song1','song2','song3'];
let songSelected = 'none';

// todo: cleanup (have scene manager handle)
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        // var lastIndex = -1;
        // var COLORS = ['red', 'green', 'blue'];
        const State = {
            MENU: 'menu',
            MANUAL: 'manual',
            AUTOPLAY: 'autoplay'
        };
        let state = State.MENU;
        let scene = this.el;
        //let menu = document.querySelector('#menu');
        let imageTab = document.querySelector('#image-tab');

        var manualButton = document.querySelector("#btn-1");
        var autoplayButton = document.querySelector("#btn-2");
        var startButton = document.querySelector("#start-btn");
        var dropButton = document.querySelector("#drop-down-btn");
        var selectMode = document.querySelector("#select-mode");
        var guitxr = document.querySelector("#guitxr");
        // var song1 = document.querySelector("#song1");

        const togglePitchRecognition = function (isOn) {
            scene.emit('toggle-pitch-recognition', {isOn: isOn})
        }

        togglePitchRecognition(false);

        function clearMenu() {
            selectMode.object3D.visible = false;
            guitxr.object3D.visible = false;
            manualButton.object3D.visible = false;
            autoplayButton.object3D.visible = false;
            startButton.object3D.visible = false;
            dropButton.object3D.visible = false;
            for (child of dropButton.getChildren()) {
                console.log(child.object3D.visible);
                child.setAttribute('visible', "false");
            }
            for (child of dropButton.getChildren()) {
                console.log(child.object3D.visible);
            }

            for (let i = 0; i < songList.length; i++) {
                let sng_clear = document.getElementById(songList[i]);
                sng_clear.object3D.visible = false;
            }
            // song1.object3D.visible = false;
        }

        // todo: toggle pitch recognition
        function autoplay() {
            if(state === State.MENU){
                togglePitchRecognition(false);
                console.log('setting autoplay');
                imageTab.setAttribute('autoplay', "test");
                state = State.AUTOPLAY;
                clearMenu();
            }
        }
        
        function manual() {
            if(state === State.MENU){
                console.log('setting manual');
                imageTab.setAttribute('chord-keys', "none");
                state = State.MANUAL;
                togglePitchRecognition(true);
                clearMenu();
            } else if(state === State.MANUAL){
                scene.emit('start-music', {});
            }
        }

        function menuScreen() {
            if(this.state!==State.MENU){
                togglePitchRecognition(false);
                state = State.MENU;
                imageTab.removeAttribute('chord-keys');
                imageTab.removeAttribute('autoplay');
                //menu.setAttribute('visible', 'true');
                scene.emit('clear-screens');


            }
        }

        this.el.addEventListener('raycaster-intersected', function(el, intersection) {
            //lastIndex = (lastIndex + 1) % COLORS.length;
            if(this.id === 'btn-1') {
                console.log("manual selected");
                this.setAttribute('material', 'color: #005f99; opacity: 1');
                this.setAttribute('text', 'width: 3; value: Manual; align: center; color:#fff5b7');
                let other = document.getElementById('btn-2');
                other.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                other.setAttribute('text', 'width: 3; value: Auto Play; align: center; color:#99154e');
            } else if (this.id === 'btn-2') {
                console.log("auto selected");
                this.setAttribute('material', 'color: #005f99; opacity: 1');
                this.setAttribute('text', 'width: 3; value: Auto Play; align: center; color:#fff5b7');
                let other = document.getElementById('btn-1');
                other.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                other.setAttribute('text', 'width: 3; value: Manual; align: center; color:#99154e');
            } else if (this.id === 'start-btn') {
                console.log('start is clicked');
                let manMode_cl = document.getElementById('btn-1');
                let autoMode_cl = document.getElementById('btn-2');
                if (manMode_cl.getAttribute('material').color == '#005f99') {
                    manual();
                } else if (autoMode_cl.getAttribute('material').color == '#005f99') {
                    autoplay();
                }
            } else if (this.id === 'drop-down-btn') {
                let y_co = 0.4;
                for(let i = 0; i < songList.length; i++) {
                    let newSong = document.createElement('a-entity');
                    newSong.setAttribute('geometry', 'primitive:plane; height: auto; width: 1');
                    newSong.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                    newSong.setAttribute('text', {
                        width: 3, 
                        value: songList[i],
                        align:'center',
                        color: '#99154e'
                    });
                    newSong.setAttribute('position',{
                        x: 2,
                        y: y_co - 0.21,
                        z: -3
                    });
                    newSong.setAttribute('rotation','0 -30 0');
                    y_co -= 0.21;
                    document.getElementById("hud").appendChild(newSong);
                    newSong.setAttribute('cursor-listener','');
                    newSong.setAttribute('id', songList[i]);
                }

            } else {
                this.songSelected = this.id;
                // let songBtn = document.getElementById(this.id);
                for (let i = 0; i < songList.length; i++) {
                        let itm = document.getElementById(songList[i]);
                        itm.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                        itm.setAttribute('text', {
                            width: 3, 
                            value: songList[i],
                            align:'center',
                            color: '#99154e'
                        });
                    }
                    this.setAttribute('material', 'color: #005f99; opacity: 1');
                    this.setAttribute('text', {
                        width:3,
                        value: this.id,
                        align:'center',
                        color: '#fff5b7'
                    });

           
            }
        });
    }
  });