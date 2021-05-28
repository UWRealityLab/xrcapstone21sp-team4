---
layout: post
title:  "Above and Beyond"
date:   2021-05-27 1:00:00 -0700
categories:
---
Product goal reached!! <br/>
Working towards stretch goals. <br/> 
Polishing our product..! <br/>

<b>Rish</b><br/>

 
Rish started this week by aiming to improve the guitar fretboard tracking. He spent the first two days of the week doing this. He was able to manually tune all the frets such that now even the frets after number 9 are much more accurate compared to before. However, due to the nature of the magic leap controller, the tracking is not always accurate and leads to 2-4 cm of inaccuracy in tracking. There is an alignment issue that Rish is hoping Kirit can help look at this week. 

Next, he looked into one of the stretch goals of the project: Chord Recognition. He reached out to Professor Hemingway for advice regarding the same. After reading and learning more about the topic, he found out that there are generally three ways of doing it: aural, visual, or mechanical. 
Aural would involve training a neural network to hear the audio and detect chords, visual would involve having a camera inside the guitar to look at the strings, and mechanical would involve placing some motion detection sensors on each string. 

The aural method seemed good but the chord detection seems to be an area of research and as a team, we decided to drop attempting this stretch goal. 

<b>Kirit</b><br/>


Kirit added the ability to visualize chord names along with lyrics. He worked out encoding the timing of the chords via a chordpro file and integrated the ChordSheetJS nodejs library for parsing on the magic leap. Next he created a generic way to visualize this in AR by drawing the lyrics and chords on a canvas and then rendering that to a texture in AFrame. This resulted in highly reusable logic that would allow adding nearly any song’s chord sheet from popular online sources like Ultimate Guitar. 
The next steps on Kirit’s agenda are to integrate this with the handshape indicator and fretboard markers, and to create a way for progressing through the music in the absence of chord recognition.cv         
Kirit also worked with Max and Sam to finish out the long-pending MIDI integration, opening the way up for adding many more songs this week!
<br/>
![Kirit8-demo](/xrcapstone21sp-team4/images/kirit-week-9.jpeg){:width="400px"}<br/>

<b>Sam</b><br/>
This week Sam worked with Max and Kirit to finalize midi file integration into our project. This will streamline adding future songs to our project by isolating the guitar track and having note labels and timings automatically filled.
He also put together a history of photos cataloging the progress that our project has gone through. Ohhh the memories…
For our final week Sam will assist in putting together a UI to select from several songs. 
<br/>
![sam8-demo](/xrcapstone21sp-team4/images/sam-week-9.png){:width="400px"}<br/>

<b>Max</b><br/>


This week Max collaborated on midi integration and learned the valuable lesson that Tone.js and Tonal.js were two different libraries with largely incompatible parts. While both offer options for parsing Midi files (and Tone includes some very nice boilerplate to get started), Tonal is far better suited to the kind of flexibility we need to get a variety of songs imported quickly. Tonal also has a wide variety of synth instruments available for playback in case the audio tracks we use do not line up exactly.

Distinguishing between tracks, recognizing the start and end of key sections, and selecting a melody out of transposed notes in a chord continue to be problems. Copyright may prove to be a challenge if offloading midi sourcing to the user remains a pain point and we decide to keep a rolling library of royalty-free songs instead. Even if so, Ira mentioned copyrighted assets this week and likely has some insight into funding options for the initial song list.


In summary, <b>plans for next week:</b>

*  Create UI for song selection
*  Polish Polish Polish
*  Work on the presentation and video.
