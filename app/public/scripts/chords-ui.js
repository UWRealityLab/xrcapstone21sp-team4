this.ChordSheetJS = chordsheetjs.default;
AFRAME.registerComponent('chords-ui', {
    init: function () {

        const readTextFile = (file, callback) => {
            let rawFile = new XMLHttpRequest();

            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status == 0) {
                        let allText = rawFile.responseText;
                        // return allText;
                        callback(allText);
                    }
                }
            }
            rawFile.send(null);
        }

        let showSong = (song) => {
            console.log('showSong called');
            this.song = song;
            // this.ystart = 20;
            this.ystart = 20;
            this.baseCharacterWidth = 10;
            this.numLinesToRender = 20; // chord + lyrics is counted twice
            this.lineStart = 0// line to start at

            this.parser = new ChordSheetJS.ChordProParser();
            this.parsedSong = this.parser.parse(this.song);
            this.el.addEventListener('draw-render', this.render.bind(this));

            this.lineSpacing = 20;
            this.chordSpacing = 15;

            let songScrollSpeedMS = 1000;

            /*setInterval(() => {
                this.lineStart++;
            }, songScrollSpeedMS);*/
        }

        readTextFile('./assets/chordpro/HotelCalifornia.chopro', showSong);


    },
    render(e) {
        console.log('render texture');
        let ctx = e.detail.ctx;

        let texture = e.detail.texture;
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;

        ctx.clearRect(0, 0, width, height);


        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.font = '15px serif';
        ctx.fillStyle = 'gray'


        let lineStart = [20, this.ystart];
        let songLines = this.parsedSong.lines;

        for (let i = this.lineStart; i < Math.min(songLines.length, this.lineStart + this.numLinesToRender); i++) {
            let line = songLines[i];
            let lineX = lineStart[0];
            let shouldRenderLine = false;
            for (let item of line.items) {
                if (item.value || item.name) {
                    let text = item.value || item.name;
                    ctx.strokeStyle = 'gray';
                    ctx.strokeText(text, lineX, lineStart[1]);
                    lineX += text.length * this.baseCharacterWidth;
                    shouldRenderLine = true;
                } else if (item.chords || item.lyrics) {
                    ctx.strokeStyle = 'green';
                    ctx.strokeText(item.chords, lineX, lineStart[1]);
                    ctx.strokeStyle = 'blue';
                    ctx.strokeText(item.lyrics, lineX, lineStart[1] + this.chordSpacing);
                    let textWidth = ctx.measureText(item.lyrics);
                    lineX += textWidth.width;
                    shouldRenderLine = true;
                }
            }

            if (shouldRenderLine) {
                lineStart[1] += this.lineSpacing * 2;
            }
        }
        texture.needsUpdate = true;

    },
    remove: function () {

    }
})

