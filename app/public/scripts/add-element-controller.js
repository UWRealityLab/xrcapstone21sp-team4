AFRAME.registerComponent('add-element-controller', {
    init: function () {
      const Strings = [];
      let Markers = [];
      for(let i=1; i<=6; i++){
        Strings.push(document.getElementById('String'+i))
      }

      this.addMarker = function (markArray) {
        // clear markers and strings
        Markers.forEach((marker) => marker.parentNode.removeChild(marker));
        Markers = [];
        Strings.forEach((string) => string.setAttribute('material', 'color', 'white'));

        let scaleLength = 0.6477;
        for (let i = 0; i < markArray.length; i++) {
          let strNum = markArray[i][0];
          let fretNum = markArray[i][1];
          let el = Strings[strNum-1];

          if(fretNum===0){
            // highlight entire string
            el.setAttribute('material', 'color: blue');
            return;
          }

          let newMark = document.createElement('a-entity');
          let myX = el.components.position.attrValue.x;

          let midPoint = this.calcFretDistance(fretNum) + this.calcFretDistance(fretNum - 1);
          midPoint = midPoint / 2;
          myX = myX + (scaleLength/2) - midPoint; 
          newMark.setAttribute('geometry', {
            primitive: 'sphere' 
          });
          newMark.setAttribute('id', "marker" + i); // setting ID numbers so that we can delete them later. 
          newMark.setAttribute('material', 'color: blue');
          newMark.setAttribute('scale', '0.005 0.005 0.005');
          newMark.setAttribute('position', {
            x: myX,
            y: 0,
            z: 0
          });
          el.appendChild(newMark);
          Markers.push(newMark);
        }
      }

      this.calcFretDistance = function(fretNum) {
        let scaleLength = 0.6477;
        let twoPower = Math.pow(2, fretNum/12);
        let d = scaleLength - (scaleLength/twoPower);
        return d;
      }
      let firstPoint = [1, 2]; // string 1 , fret 2
      let secondPoint = [2,2]; // string 2 , fret 2
      let thirdPoint = [5, 7]; //string 5, fret 7
      let fourthPoint = [3, 10]; // string 3, fret 10
      let fifthPoint = [6, 4]; // string 6, fret 4
      let passedArray = [firstPoint, secondPoint, thirdPoint, fourthPoint, fifthPoint];


      this.addMarker(passedArray);
      this.el.addEventListener('tab-change', (event) => {
        this.addMarker(event.detail.tab);
      })
    },
  })