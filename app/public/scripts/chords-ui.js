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

        this.ystart = 20;
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


        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.font = '15px serif';
        ctx.fillStyle = 'gray'
        // ctx.fillRect(0, 0, w, h);


        let lineStart = [20, this.ystart];

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

        // this.ystart -= 0.1;

        texture.needsUpdate = true;

    },
    remove: function (){

    }
})

