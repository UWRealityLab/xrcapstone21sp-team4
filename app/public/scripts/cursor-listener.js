let songList = ['song1','song2','song3'];
let songSelected = 'none';
AFRAME.registerComponent('cursor-listener', {
    init: function () {
     // var lastIndex = -1;
     // var COLORS = ['red', 'green', 'blue'];
      this.el.addEventListener('click', function (evt) {
        //lastIndex = (lastIndex + 1) % COLORS.length;
        if(this.id == 'btn-1') {
            console.log("manual selected");
            this.setAttribute('material', 'color: #005f99; opacity: 1');
            this.setAttribute('text', 'width: 3; value: Manual; align: center; color:#fff5b7');
            let other = document.getElementById('btn-2');
            other.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
            other.setAttribute('text', 'width: 3; value: Auto Play; align: center; color:#99154e');
        } else if (this.id == 'btn-2') {
            console.log("auto selected");
            this.setAttribute('material', 'color: #005f99; opacity: 1');
            this.setAttribute('text', 'width: 3; value: Auto Play; align: center; color:#fff5b7');
            let other = document.getElementById('btn-1');
            other.setAttribute('material', 'color: #ffc93c; opacity: 0.6');
            other.setAttribute('text', 'width: 3; value: Manual; align: center; color:#99154e');
        } else if (this.id == 'start-btn') {
            let manMode_cl = document.getElementById('btn-1');
            let autoMode_cl = document.getElementById('btn-2');
            if (manMode_cl.getAttribute('material').color == '#005f99') {
                console.log("here1111");
                this.manual();
                console.log("here11");
            } else if (autoMode_cl.getAttribute('material').color == '#005f99') {

            }
        } else if (this.id == 'drop-down-btn') {
            console.log("in drop down");
            let y_co = 0;
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
                    x: 0,
                    y: y_co - 0.21,
                    z: 0
                }
                );
                y_co -= 0.21;
                this.appendChild(newSong);
              //  newSong.setAttribute(cursor-listener);
                newSong.setAttribute('id', songList[i]);
            }

        } else {
            console.log(this.id);
        }
        
        console.log("here");
      });
    },
  });