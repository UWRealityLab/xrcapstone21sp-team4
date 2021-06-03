this.ChordSheetJS = chordsheetjs.default;
AFRAME.registerComponent('chords-ui', {
    init: function(){
        this.song = `
{start_of_verse}
I'm gonna [Em]fight 'em off[G][C][B]
A seven nation [Em]army couldn't [G]hold me [C]back[B]
They're gonna [Em]rip it off[G][C][B]
Taking their [Em]time right be[G]hind my [C]back[B]
And I'm [Em]talking to my[G]self at [C]night
Because I [B]can't for[Em]get[G][C][B]
[Em]Back and forth [G]through my [C]mind
Behind a [B]ciga[Em]rette[G][C][B]
And a [G]message coming from my [A]eyes says leave it alone
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

