AFRAME.registerComponent('add-element-controller', {
    init: function () {
      this.addMarker = function (markArray) {
        let j = 0; 
        
        for (j = 0; j < 5; j++) {
          let marker = document.getElementById("marker" + j);
          if (marker != null) {
            marker.parentNode.removeChild(marker);
          }
        }

        let scaleLength = 0.6477;
        let i = 0;
        for (i = 0; i < markArray.length; i++) {
          let strNum = markArray[i][0];
          let FretNum = markArray[i][1];
          let el = document.getElementById('String' + strNum);
          let newMark = document.createElement('a-entity');
          let myX = el.components.position.attrValue.x;

          let midPoint = this.calcFretDistance(FretNum) + this.calcFretDistance(FretNum - 1);
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


      // Note this is test code to see if previous ID get removed. 
      // let firstPoint1 = [1, 1]; // string 1 , fret 2
      // let secondPoint1 = [2,1]; // string 2 , fret 2
      // let thirdPoint1 = [3, 1]; //string 5, fret 7
      // let fourthPoint1 = [4, 1]; // string 3, fret 10
      // let fifthPoint1 = [5, 1]; // string 6, fret 4
      // let passedArray1 = [firstPoint1, secondPoint1, thirdPoint1, fourthPoint1, fifthPoint1];
      // this.addMarker(passedArray1);

    },
  })