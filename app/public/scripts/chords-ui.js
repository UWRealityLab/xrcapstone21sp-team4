this.ChordSheetJS = chordsheetjs.default;
AFRAME.registerComponent('chords-ui', {
    init: function(){
        this.song = `
{start_of_verse}
[D]Lights go out and I c[Am]an't be saved, tides that I tried to [Em]swim against
[D]Brought me down up[Am]on my knees, oh I beg I [Em]beg and plead -singing
[D]Come out of the [Am]things unsaid, shoot an apple [Em]off my head - and a
[D]Trouble that ca[Am]n't be named, tigers waiting [Em]to be tamed - singing
{end_of_verse}`


        this.parser = new ChordSheetJS.ChordProParser();
        this.parsedSong = this.parser.parse(this.song);
        /*this.formatter = new ChordSheetJS.HtmlTableFormatter();
        const disp = formatter.format(parsedSong);*/
        this.el.addEventListener('draw-render', this.render.bind(this));

        this.lineSpacing = 40;
        this.chordSpacing = 15;

    },
    render(e){
        console.log('render texture');
        let ctx = e.detail.ctx;
        let texture = e.detail.texture;
        let w = ctx.canvas.width;
        let h = ctx.canvas.height;

/*// Set line width


// Wall
        ctx.strokeRect(75, 140, 150, 110);

// Door
        ctx.fillRect(130, 190, 40, 60);

// Roof
        ctx.beginPath();
        ctx.moveTo(50, 140);
        ctx.lineTo(150, 60);
        ctx.lineTo(250, 140);
        ctx.closePath();
        ctx.stroke();*/


        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.font = '15px serif';
        ctx.fillStyle = 'gray'
        // ctx.fillRect(0, 0, w, h);


        let lineStart = [20, 20];

        for(let paragraph of this.parsedSong.paragraphs){
            for (let line of paragraph.lines){
                let lineX = lineStart[0];
                console.log('line type: '+line.type);
                if(line.type === 'verse'){
                    for(let item of line.items){
                        console.log('drawing lyrics: '+item.lyrics);
                        ctx.strokeStyle = 'green';
                        ctx.strokeText(item.chords, lineX, lineStart[1]);
                        ctx.strokeStyle = 'blue';
                        ctx.strokeText(item.lyrics, lineX, lineStart[1]+this.chordSpacing);
                        let textWidth = ctx.measureText(item.lyrics);
                        lineX += textWidth.width;
                    }
                }

                lineStart[1] += this.lineSpacing;
            }
        }

        texture.needsUpdate = true;

    },
    remove: function (){

    }
})

