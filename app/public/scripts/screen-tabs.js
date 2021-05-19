// Code for fret and string addition
const scaleLength = 0.6477; // this is 25.5 inches in meters. A-frame uses meters so we write it in meters.
// ---------------- STRING ADDITION ---------------------------------------

function initScreens(){
    let allVis = ['first', 'second', 'third'];
    for (let z = 0; z < 3; z++) {
        let a = 1;
        let yPosStr = 0;
        for (a = 1; a <= 6; a++) {
            let str = document.createElement('a-entity');
            str.setAttribute('geometry', {
                primitive: 'box',
                width: scaleLength * 4,
                height: 0.001 * 10,
                depth: 0.001 * 10
            });
            str.setAttribute('position', { x: 0, y: yPosStr, z: 0 });

            let strID = 'screen' + z;
            strID = strID + 'string' + a;
            str.setAttribute('id', strID);
            str.setAttribute('material', 'color:red');
            let c = document.getElementById(allVis[z]);
            c.appendChild(str);
            yPosStr += 0.2
        }
    }
// --------------------- START FRET ADDITION-------------------------------------------


    const totalFrets = 21; // just going to make 15 frets for now.
    const scaleFactor = 1.45; // manual scale factor
    let elm = document.getElementById('screen0string1');
    console.log(elm);
    let startPos = elm.object3D.position.clone();
    startPos.x = startPos.x - (scaleLength * 4 / 2);
    startPos.y += 0.5;

    this.addFret = function (distanceFromNut, fretNum, displayNum) {
        // console.log('adding fret ' + fretNum + ' at distance: ' + distanceFromNut);
        let myX = startPos.x;
        let myY = startPos.y;
        let myZ = startPos.z;

        myX = myX + (distanceFromNut * scaleFactor);

        //let p = el.getAttribute('position');
        let newMark = document.createElement('a-entity');
        newMark.setAttribute('geometry', {
            primitive: 'box',
            width: 0.075 * 10 + 0.3,
            height: 0.001 * 10,
            depth: 0.001 * 10
        });
        newMark.setAttribute('rotation', '0 0 90');
        newMark.setAttribute('material', 'color:red');
        let fretId = 'screen' + displayNum + 'fret' + fretNum;
        newMark.setAttribute('id', fretId);
        newMark.setAttribute('position', {
            x: myX,
            y: myY,
            z: myZ
        });
        elm.appendChild(newMark);
    }
    elm = document.getElementById('screen0string1');
    this.addFret(0, 0, 0); // creating Nut in the virtual world.
    elm = document.getElementById('screen1string1');
    this.addFret(0, 0, 1);
    elm = document.getElementById('screen2string1');
    this.addFret(0, 0, 1);
    let i = 1;

    for (let n = 0; n < 3; n++) { // add frets to all displays.
        let idname = 'screen' + n + 'string1'; // we are adding relative to string1.
        console.log(idname);
        elm = document.getElementById(idname);
        for (i = 1; i < totalFrets; i++) {
            let twoPower = Math.pow(2, i / 12);
            let d = (scaleLength * 4) - ((scaleLength * 4) / twoPower);
            this.addFret(d, i);
        }
    }
}



//---------------------- adding marker code -----------------------------------------




let firstPoint = [1, 2]; // string 1 , fret 2
let secondPoint = [2, 2]; // string 2 , fret 2
let thirdPoint = [5, 7]; //string 5, fret 7
let fourthPoint = [3, 10]; // string 3, fret 10
let fifthPoint = [6, 4]; // string 6, fret 4
let passedArray = [firstPoint, secondPoint, thirdPoint, fourthPoint, fifthPoint];
this.addMarker(passedArray,0);
this.addMarker(passedArray,1);
this.addMarker(passedArray,2);