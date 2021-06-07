const scaleLength = 0.6477; // this is 25.5 inches in meters. A-frame uses meters so we write it in meters.
const totalFrets = 21; // just going to make 15 frets for now.
const scaleFactor = 1.45; // manual scale factor
const el = document.getElementById('String1');
let startPos = el.object3D.position.clone();
startPos.x = startPos.x - (scaleLength / 2);
startPos.y += 0.03;

this.addFret = function (distanceFromNut, fretNum) {
    // console.log('adding fret ' + fretNum + ' at distance: ' + distanceFromNut);

    let myX = startPos.x;
    let myY = startPos.y;
    let myZ = startPos.z;
    // myY = myY + 0.05;

    myX = myX + (distanceFromNut*scaleFactor);

    //let p = el.getAttribute('position');
    let newMark = document.createElement('a-entity');
    newMark.setAttribute('geometry', {
        primitive: 'box',
        width: 0.06,
        height: 0.001,
        depth: 0.001
    });
    newMark.setAttribute('rotation', '0 0 90');
    let fretId = 'fret' + fretNum;
    newMark.setAttribute('id', fretId);
    newMark.setAttribute('position', {
        x: myX,
        y: myY,
        z: myZ
    });
    el.appendChild(newMark);
}
this.addFret(0, 0); // creating Nut in the virtual world.

let i = 1;
for (i = 1; i < totalFrets; i++) {
    let twoPower = Math.pow(2, i / 12);
    let d = scaleLength - (scaleLength / twoPower);
    this.addFret(d, i);
}

//let a = document.getElementById('fret1').getAttribute('position');
