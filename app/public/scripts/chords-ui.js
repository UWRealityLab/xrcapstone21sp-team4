console.log('chord ui started');

const song = `{comment: Intro}
[D][Am][Am][Em][x4]

{start_of_verse}
[D]Lights go out and I c[Am]an't be saved, tides that I tried to [Em]swim against
[D]Brought me down up[Am]on my knees, oh I beg I [Em]beg and plead -singing
[D]Come out of the [Am]things unsaid, shoot an apple [Em]off my head - and a
[D]Trouble that ca[Am]n't be named, tigers waiting [Em]to be tamed - singing
{end_of_verse}

{comment: Hook}
(Piano Riff)
[D]  you  [Am]             a[Em]re       [D]you    [Am]              ar[Em]e

(w/Piano Riff)
[D][Am][Am][Em/G][x2]

{start_of_verse}
Co[D]nfusion [Am]never stops, closing walls and [Em]ticking clocks - gonna
[D]come back and [Am]take you home, I could not stop tha[Em]t you now know - singing
[D]Come out upon [Am]my seas, curse missed oppo[Em]rtunities - am I
[D]A part o[Am]f the cure, or am I a part of [Em]the disease? - singing
{end_of_verse}

{comment: Hook}
(w/Piano Riff)
[D]  You  [Am]             a[Em]re       [D]you    [Am]              a[Em]re
[D]  You  [Am]             a[Em]re       [D]you    [Am]              a[Em]re

{comment: Bridge}
[Fmaj7]  And nothing else compares[C][G]
[Fmaj7]  Oh nothing else compares[C][G]
[Fmaj7]  And nothing else compares[C][G][Fmaj7]

{comment: Hook}
(Piano Riff)
[D][Am][Am][Em][x2]

(w/High Piano Riff)
[D][Am][Am][Em][x2]

{comment: Outro}
(w/High Piano Riff)
[D]Home, home,[Am] where I wanted to [Em/G]go
[D]Home, home,[Am] where I wanted to [Em/G]go
[D]Home, home,[Am] where I wanted to [Em/G]go
      you                     are
[D]Home, home,[Am] where I wanted to [Em/G]go
      you                     are

{comment: Outro}
(w/High Piano Riff)
[D](fa[Am]de o[Am]ut)[Em][x3]`

const ChordSheetJS = chordsheetjs.default;
const parser = new ChordSheetJS.ChordProParser();
const parsedSong = parser.parse(song);
const formatter = new ChordSheetJS.HtmlTableFormatter();
const disp = formatter.format(parsedSong);
console.log('Chordsheet parser');
// console.log(disp);
document.querySelector('#menu').innerHTML = disp;