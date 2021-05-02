AFRAME.registerComponent('add-frets', {
    init: function () {
      const scaleLength = 0.6477; // this is 25.5 inches in meters. A-frame uses meters so we write it in meters.
      const totalFrets = 21; // just going to make 15 frets for now.
      this.addFret = function (distanceFromNut,fretNum){

        let el = document.getElementById('String1');
        let myX = el.components.position.attrValue.x;
        let myY = el.components.position.attrValue.y;
        let myZ = el.components.position.attrValue.z;
        myY = myY + 0.05;
         
        myX = myX + (scaleLength/2) - distanceFromNut;
        let p = el.getAttribute('position');
        let newMark = document.createElement('a-entity');
        newMark.setAttribute('geometry', {
          primitive: 'box',
          width: 0.1,
          height: 0.001,
          depth: 0.001
        });
        newMark.setAttribute('rotation', '0 0 90');
        let fretId = 'fret' + fretNum;
        newMark.setAttribute('id', fretId);
        newMark.setAttribute('position',{
            x: myX,
            y: myY,
            z: myZ
        });
        el.appendChild(newMark);
      }
      this.addFret(0); // creating Nut in the virtual world.

      let i = 1;
      for (i = 1; i < totalFrets; i++) {
        let twoPower = Math.pow(2, i/12);
        let d = scaleLength - (scaleLength/twoPower);
        this.addFret(d, i);
      }

      let a = document.getElementById('fret1').getAttribute('position');

    },
  })