// Code for fret and string addition
// ---------------- STRING ADDITION ---------------------------------------

const allVis = ['first', 'second', 'third'];

scene = document.querySelector('a-scene');

scene.addEventListener('show-screen-marker', function (event) {
    let tab = event.detail.tab;
    let screen = event.detail.screen;
    generateScreen(screen, tab);
});

scene.addEventListener('clear-screens', function (event) {
    for(let el of allVis){
        removeAllChildNodes(document.getElementById(el));
    }
});

function addScreenFret(stringElm, startPos, distanceFromNut, fretNum, displayNum) {
    let myX = startPos.x;
    let myY = startPos.y;
    let myZ = startPos.z;

     myX = myX + distanceFromNut;

    let newMark = document.createElement('a-entity');
    newMark.setAttribute('geometry', {
        primitive: 'box',
        width: 0.075 * 10 + 0.3,
        height: 0.03,
        depth: 0.01
    });
    newMark.setAttribute('rotation', '0 0 90');
    newMark.setAttribute('material', 'color: #c4c4c4');
    let fretId = 'screen' + displayNum + 'fret' + fretNum;
    newMark.setAttribute('id', fretId);
    newMark.object3D.position.set(myX, myY, myZ);
    stringElm.appendChild(newMark);
}

function generateScreen(screen, markArray) {
    let totalFrets = 0;
    for(let i=0; i<markArray.length; i++){
        totalFrets = Math.max(markArray[i][1]+1, totalFrets);
    }

    const interfretDistance = 0.35;

    const stringWidth = (totalFrets -1) * interfretDistance;

    let parent = document.getElementById(allVis[screen]);
    removeAllChildNodes(parent);

    let yPosStr = 0;
    for (let a = 1; a <= 6; a++) {
        let str = document.createElement('a-entity');
        str.setAttribute('geometry', {
            primitive: 'box',
            width: stringWidth,
            height: 0.03,
            depth: 0.01
        });
        str.setAttribute('position', {x: 0, y: yPosStr, z: 0});

        let strID = 'screen' + screen;
        strID = strID + 'string' + a;
        str.setAttribute('id', strID);
        str.setAttribute('material', 'color: #e3a002');

        parent.appendChild(str);
        yPosStr += 0.2
    }

    let elm = document.getElementById('screen' + screen + 'string1');
    let startPos = elm.object3D.position.clone();
    startPos.x = startPos.x - (stringWidth/2);
    startPos.y += 0.5;



    addScreenFret(elm, startPos, 0, 0, screen); // creating Nut in the virtual world.

    for (let i = 1; i < totalFrets; i++) {
        let d = interfretDistance * i;
        addScreenFret(elm, startPos, d, i, screen);
    }

    addScreenMarker(screen, markArray);


}


const displayStringInitialOpacity = 1.0;
let ScreenMarkers = [[], [], []]; // indexed by screen name
// todo: think through
/*const displayStrings = [];
for (let j = 0; i<3; j++) {
    for (let i = 1; j <= 6; i++) {
        displayStrings.push(document.getElementById('screen' + j + 'string' + i));
    }
}*/

function getScreenMidpointPosition(fret1, fret2, screen) {
    let fret1Pos = document.getElementById('screen' + screen + 'fret' + fret1).object3D.position;
    let fret2Pos = document.getElementById('screen' + screen + 'fret' + fret2).object3D.position;

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
function addScreenMarker(screen, markArray) {
    let markerScale = '0.05 0.05 0.05';

    // clear markers and strings

    ScreenMarkers[screen].forEach((marker) => marker.parentNode.removeChild(marker));
    ScreenMarkers[screen] = [];
    // todo: implement
    /*displayStrings.forEach((string) => string.setAttribute('material', {
    color: 'white',
    opacity: displayStringInitialOpacity
}));*/


    for (let i = 0; i < markArray.length; i++) {
        let strNum = markArray[i][0];
        let fretNum = markArray[i][1];
        let el = document.getElementById('screen' + screen + 'string' + strNum);


        if (fretNum === 0) {
            // highlight entire string
            el.setAttribute('material', 'color: blue; opacity: 0.6');
            return;
        }

        let newMark = document.createElement('a-entity');

        const midPoint = getScreenMidpointPosition(fretNum, fretNum - 1, screen);

        newMark.setAttribute('geometry', {
            primitive: 'sphere'
        });

        newMark.setAttribute('material', 'color: blue');
        newMark.setAttribute('scale', markerScale);


        newMark.object3D.position.set(midPoint.x, 0, 0);
        el.appendChild(newMark);

        ScreenMarkers[screen].push(newMark);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}