const Strings = [];
let Markers = [];
for (let i = 1; i <= 6; i++) {
    Strings.push(document.getElementById('String' + i))
}

const displayStrings = [];
for (let j = 0; i<3; j++) {
    for (let i = 1; j <= 6; i++) {
        displayStrings.push(document.getElementById('screen' + j + 'string' + i));
    }
}

const initialOpacity = Strings[0].getAttribute('material').opacity;
console.log('initial string opacity: ' + initialOpacity);

const displayStringInitialOpacity = displayStrings[0].getAttribute('material').opacity;

function getMidpointPosition(fret1, fret2,screen) {
    let s = 'screen' + screen + 'fret' + fret1;
    let a = document.getElementById(s);
    let fre1Pos = document.getElementById('screen' + screen + 'fret' + fret1).object3D.position;
    let fre2Pos = document.getElementById('screen' + screen + 'fret' + fret2).object3D.position;
    if (screen == null) { // placing on guitar
        const fret1Pos = document.querySelector('#fret' + fret1).object3D.position;
        const fret2Pos = document.querySelector('#fret' + fret2).object3D.position;
    }

    const getMid = function (num1, num2) {
        return (num1 + num2) / 2;
    }

    return {
        x: getMid(fret1Pos.x, fret2Pos.x),
        y: getMid(fret1Pos.y, fret2Pos.y),
        z: getMid(fret1Pos.z, fret2Pos.z)
    }
}


// pass screen for displaying in front of user in display
// do not pass anything for screen or pass as null if you want to add marker to guitar.
this.addMarker = function (markArray, screen) {
    let markerScale = '0.005 0.005 0.005'; // scale the size of the marker by this amount.
    // if screen is null i.e. we are placing a marker on the display ahead of us
    // so we want to scale it up.
    if (screen != null) {
        markerScale = '0.5 0.5 0.5';
    }
    // clear markers and strings
    Markers.forEach((marker) => marker.parentNode.removeChild(marker));
    Markers = [];
    Strings.forEach((string) => string.setAttribute('material', {
        color: 'white',
        opacity: initialOpacity
    }));

    displayStrings.forEach((string) => string.setAttribute('material', {
        color: 'white',
        opacity: displayStringInitialOpacity
    }));

    // let scaleLength = 0.6477;
    for (let i = 0; i < markArray.length; i++) {
        let strNum = markArray[i][0];
        let fretNum = markArray[i][1];
        let el = Strings[strNum - 1];
        if (screen != null) { // we are adding to display ahead of us. 
            el = document.getElementById('screen' + screen + 'fret' + fretNum);
        }
        if (fretNum === 0) {
            // highlight entire string
            el.setAttribute('material', 'color: blue; opacity: 0.6');
            return;
        }
        let newMark = document.createElement('a-entity');

        const midPoint = getMidpointPosition(fretNum, fretNum - 1,screen);

        newMark.setAttribute('geometry', {
            primitive: 'sphere'
        });
        //newMark.setAttribute('id', "marker" + i); // setting ID numbers so that we can delete them later.
        newMark.setAttribute('material', 'color: blue');
        newMark.setAttribute('scale', markerScale);
        newMark.setAttribute('position', {
            x: midPoint.x,
            y: 0,
            z: 0
        });
        // newMark.object3D.position = midPoint;
        el.appendChild(newMark);
        Markers.push(newMark);
    }
}

this.calcFretDistance = function (fretNum) {
    let scaleLength = 0.6477;
    let twoPower = Math.pow(2, fretNum / 12);
    let d = scaleLength - (scaleLength / twoPower);
    return d;
}
window.onload = function(e){
    let firstPoint = [1, 2]; // string 1 , fret 2
    let secondPoint = [2, 2]; // string 2 , fret 2
    let thirdPoint = [5, 7]; //string 5, fret 7
    let fourthPoint = [3, 10]; // string 3, fret 10
    let fifthPoint = [6, 4]; // string 6, fret 4
    let passedArray = [firstPoint, secondPoint, thirdPoint, fourthPoint, fifthPoint];
    console.log('setting initial string positions');
    this.addMarker(passedArray, null);
    this.addMarker(passedArray,0);
    this.addMarker(passedArray,1);
    this.addMarker(passedArray,2);
}



document.querySelector('a-scene').addEventListener('tab-change', (event) => {
    this.addMarker(event.detail.tab);
    this.addMarker(event.detail.tab, 0);
});