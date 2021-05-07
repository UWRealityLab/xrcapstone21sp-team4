---
layout: post
title:  "Week 5: Steady Progress"
date:   2021-05-06 21:00:00 -0700
categories:
---
Here is the week 5 progress report of the GuitXR project. 

**Rish:**<br/>
This week rish spent time trying to figure out the reason for the scaling issues with the virtual fretboard. He performed a few experiments to see what the issue was. One of the experiments performed was using the un-offsetted virtual board(code from rish-branch on github) and checking if we were able to get the scales to line up ( which worked out to be true). A hypothesis was formed stating that the code we used to fix the off-set issue was causing the scaling issue. 
To further investigate, we made a post on stackoverflow <br/> 
![Post Link](https://stackoverflow.com/questions/67363538/overlaying-virtual-element-on-the-controller-resulting-in-wrong-scale/67370674#67370674)

On the suggestion of one of the answers, Kirit helped test if the scaling issues would be fixed by removing the parent entities of the fretboard. However, this was unsuccessful. Eventually, kirit found that a manual scale factor of 1.4 was able to get the frets to line up pretty good. Rish plans to further investigate this issue once we have a stable mount for better debugging.Rish also put together the MVP slides for the mid term presentation.  Rish will be spending the rest of the week trying to generalize the chord visualizations that show up in front of the user while playing songs. 

**Kirit:**<br/>
This week Kirit took charge of integrating some of the different parts of the project for the MVP. He merged the virtual fretboard visualizations (done by Rish) and made the markers follow the song and highlight the correct fret + string. Upon integrating with the tracking, he found that despite correct math, the scaling seemed to be slightly off when viewed from the magic leap. This caused frets further down the fretboard to look misaligned. To solve this, Kirit experimented and modified the math to include a scaling factor which ultimately ended up aligning almost perfectly!
He also merged in the pitch recognition, and took a pass at refactoring and optimizing it to improve on-device performance. Finally, he recorded and put together a MVP demo video.<br/> 
![Link here](https://drive.google.com/file/d/1rIpgdVQ0_urofp7_nmK8itFwea4glDkU/view?usp=sharing)
Kirit’s immediate plan for the upcoming week is to 3D model and print a more permanent controller mount so it attaches onto the guitar in a more stable and predictable way.



**Sam:**<br/>
Max’s last major milestone this week was pair programming with Sam on merging pitch recognition code in time for the MVP demo. He recorded a brief pitch recognition demo and designed a new image file with layers to clean up the artifacts of a somewhat blurry chart template. This begins the process of modularizing chart and tab construction, and also helps with an eventual goal of allowing users to upload/select custom tabs for songs that have no MIDI file freely available.



This coming week Max will explore implementation of the tonal.js library ![link](https://github.com/tonaljs/tonal) to standardize our implementation of notes and frequencies and open up options for MIDI-based pitch/rhythm tracking instead of the hard-coded frequencies and delays we have at the moment. This is all but essential if we’re going to include many more songs besides Smoke on the Water, but we could leave the work of importing songs to the user in a pinch.

Chord recognition may involve discarding the ML5.js pitch recognition library or at least importing another model that has been trained on chords. Given the limited chords possible on a guitar (and especially for a beginning guitar player) it could be practical to train our own model to recognize chords.

Max also spoke to Keunhong Park about sample rates in files used to train audio models and the importance of matching that to the sample rate of the real-world audio. This might throw a wrench into latency improvements based on reducing the sample rate of the Magic Leap’s built-in microphone, but those are worth exploring anyway.

**Max:**<br/>
This week Sam worked with Max to finally combine chord progression and pitch recognition. With Max’s pitch recognition working in the background, if the frequency is within an Error_Tolerance of confidence, this will be treated as a correctly played note, prompting that section of the song to play, and the chord appearing to the user would progress to the next tab. This does require the user to have a well-tuned guitar to reliably detect notes, no current ideas on improving this. Next week, Sam will allow users to go back to the menu and switch modes more easily.
Initial breakthrough demo for this (had bugs and older UI):<br/> 
![link](https://twitter.com/SamVanderlinda/status/1388673887437615104?s=20)
