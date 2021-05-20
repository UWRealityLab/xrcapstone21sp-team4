const Strings = [];
let Markers = [];

for (let i = 1; i <= 6; i++) {
    Strings.push(document.getElementById('String' + i))
}

const initialOpacity = Strings[0].getAttribute('material').opacity;
console.log('initial string opacity: ' + initialOpacity);

function getMidpointPosition(fret1, fret2) {
    let fret1Pos = document.querySelector('#fret' + fret1).object3D.position;
    let fret2Pos = document.querySelector('#fret' + fret2).object3D.position;

    const getMid = function (num1, num2) {
        return (num1 + num2) / 2;
    }

    return {
        x: getMid(fret1Pos.x, fret2Pos.x),
        y: getMid(fret1Pos.y, fret2Pos.y),
        z: getMid(fret1Pos.z, fret2Pos.z)
    }
}

const handModel = document.querySelector('#hand');


// pass screen for displaying in front of user in display
// do not pass anything for screen or pass as null if you want to add marker to guitar.
this.addMarker = function (markArray) {
    let markerScale = '0.005 0.005 0.005'; // scale the size of the marker by this amount.

    // clear markers and strings
    Markers.forEach((marker) => marker.parentNode.removeChild(marker));
    Markers = [];
    Strings.forEach((string) => string.setAttribute('material', {
        color: 'white',
        opacity: initialOpacity
    }));

    // let scaleLength = 0.6477;
    for (let i = 0; i < markArray.length; i++) {
        let strNum = markArray[i][0];
        let fretNum = markArray[i][1];
        let el = Strings[strNum - 1];

        if (fretNum === 0) {
            // highlight entire string
            el.setAttribute('material', 'color: blue; opacity: 0.6');
            return;
        }
        let newMark = document.createElement('a-entity');

        const midPoint = getMidpointPosition(fretNum, fretNum - 1);

        newMark.setAttribute('geometry', {
            primitive: 'sphere'
        });
        newMark.setAttribute('material', 'color: blue');
        newMark.setAttribute('scale', markerScale);
        newMark.object3D.position.set(midPoint.x, 0, 0);
        el.appendChild(newMark);

        const handOffset = handModel.getAttribute('offset-component');
        moveHand({x: midPoint.x+handOffset.x, y:0 + handOffset.y, z:0 + handOffset.z});

        Markers.push(newMark);
    }
}

function moveHand(markerPos) {
    // SAMs Hand Position addition
    let leftHand = document.querySelector("#hand");
    leftHand.setAttribute('position', {
        x: markerPos.x + 0.05,
        y: markerPos.y - 0.1,
        z: markerPos.z - 0.1
    })
}

window.onload = function(e){
    let firstPoint = [1, 2]; // string 1 , fret 2
    let secondPoint = [2, 2]; // string 2 , fret 2
    let thirdPoint = [5, 7]; //string 5, fret 7
    let fourthPoint = [3, 10]; // string 3, fret 10
    let fifthPoint = [6, 4]; // string 6, fret 4
    let passedArray = [firstPoint, secondPoint, thirdPoint, fourthPoint, fifthPoint];
    this.addMarker(passedArray, null);
}



document.querySelector('a-scene').addEventListener('tab-change', (event) => {
    this.addMarker(event.detail.tab);
});