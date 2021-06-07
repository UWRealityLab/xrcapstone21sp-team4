

// todo: cleanup (have scene manager handle)
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        // var lastIndex = -1;
        // var COLORS = ['red', 'green', 'blue'];



        let songSelected = null;
        let modeSelected = Mode.Manual;
        let droppedDown = false;

        let scene = document.querySelector('a-scene');

        var manualButton = document.querySelector("#btn-manual");
        var autoplayButton = document.querySelector("#btn-autoplay");
        let secondaryUI = document.querySelector('#secondary-ui');

        let songListElement = document.querySelector('#song-list');

        let showSongs = () => {
            if(droppedDown){
                //recreate
                while(songListElement.firstChild){
                    songListElement.removeChild(songListElement.firstChild);
                }
            }

            droppedDown = true;
            songSelected = null;

            let y_co = 0.4;
            for(let i = 0; i < GuitarSongs.length; i++) {
                if(GuitarSongs[i].supportedModes.includes(modeSelected)){
                    let newSong = document.createElement('a-entity');
                    newSong.setAttribute('geometry', 'primitive:plane; width: 1; height: 0.15;');
                    newSong.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                    newSong.setAttribute('text', {
                        width: 2,
                        value: GuitarSongs[i].name,
                        align:'center',
                        color: '#99154e'
                    });
                    newSong.setAttribute('position',{
                        x: 2,
                        y: y_co - 0.21,
                        z: -3
                    });
                    newSong.classList.add('ui');
                    newSong.setAttribute('rotation','0 -30 0');
                    y_co -= 0.21;
                    songListElement.appendChild(newSong);
                    // newSong.setAttribute('cursor-listener','');
                    newSong.setAttribute('id', GuitarSongs[i].id);
                }
            }
        }


        this.el.addEventListener('raycaster-intersection', function(event) {
            console.log('raycaster intersection');
            //lastIndex = (lastIndex + 1) % COLORS.length;
            let els = event.detail.els;
            if(!els){
                return;
            }
            let intersectedEntity = els[0] || els; // choose first intersection
            if(intersectedEntity.id === 'btn-manual') {
                //console.log("manual selected");
                intersectedEntity.setAttribute('material', 'color: #005f99; opacity: 1');
                intersectedEntity.setAttribute('text', 'width: 3; value: Manual; align: center; color:#fff5b7');
                // let other = document.getElementById('btn-autoplay');
                autoplayButton.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                autoplayButton.setAttribute('text', 'width: 3; value: Auto Play; align: center; color:#99154e');
                modeSelected = Mode.Manual;
                showSongs();
            } else if (intersectedEntity.id === 'btn-autoplay') {
                //console.log("auto selected");
                intersectedEntity.setAttribute('material', 'color: #005f99; opacity: 1');
                intersectedEntity.setAttribute('text', 'width: 3; value: Auto Play; align: center; color:#fff5b7');
                manualButton.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                manualButton.setAttribute('text', 'width: 3; value: Manual; align: center; color:#99154e');
                modeSelected = Mode.Autoplay;
                showSongs();
            } else if (intersectedEntity.id === 'start-btn') {
                //console.log('start is clicked');
                if(!songSelected){
                    console.log('start button clicked without selecting song');
                    // todo: show an error message to the user
                    return;
                }

                songSelected = {
                    ...songSelected,
                    mode: modeSelected
                }

                scene.emit('start', {song: songSelected});
            } else if(secondaryUI.contains(intersectedEntity)){
                scene.emit('secondary-ui-trigger', {
                    value: intersectedEntity.id
                });

            } else{
                // selected a song
                let newSongSelected = GuitarSongs.find((song) => song.id === intersectedEntity.id);
                if(!newSongSelected){
                    return;
                }


                if(!songSelected || newSongSelected.id !== songSelected.id){
                    if(songSelected){
                        // clear previous
                        let itm = document.getElementById(songSelected.id);
                        itm.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
                        itm.setAttribute('text', {
                            width: 2,
                            value: songSelected.name,
                            align:'center',
                            color: '#99154e'
                        });
                    }

                    songSelected = newSongSelected;

                    intersectedEntity.setAttribute('material', 'color: #005f99; opacity: 1');
                    intersectedEntity.setAttribute('text', {
                        width: 2,
                        value: songSelected.name,
                        align:'center',
                        color: '#fff5b7'
                    });
                }
            }
        });
    }
  });