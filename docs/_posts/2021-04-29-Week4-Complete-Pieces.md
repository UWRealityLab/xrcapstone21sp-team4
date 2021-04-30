---
layout: post
title:  "Week 4: Complete Pieces"
date:   2021-04-29 21:00:00 -0700
categories:
---
Here is the week 4 report of the GuitXR project.


This was quite a productive week! The primary, base functionality of our project has been put in place, the tracking of the guitar’s fretboard. There is still much polishing to do in this area, but the primary functionality of the project is put together, good job Kirit and Rish! On top of that, we were also able to make prototypes for chord progressions developed and pitch detection. What a week!


Now lets get more indepth on what each member did this week...



**Rish:**<br/>
Rish worked on creating a virtual fret board this week. It works by taking in the guitar length and virtually creating a fret board with correctly spaced frets ( as calculated by the methods described in this [article](https://www.liutaiomottola.com/formulae/fret.htm#mozTocId169477) ). He also worked on being able to add markers on frets and strings. So every time the method is called, it will clear the old chord markers and add new markers ( showing the user a new chord to play). We also have the ability to choose how many frets we want on our virtual board making this generalizable to any guitar given it’s length ( most guitars are 25.5 inches long) 
![Rish-demo](/xrcapstone21sp-team4/images/rish-week-5.JPG){:width="400px"}<br/>


**Kirit:**<br/>
Kirit solved the fretboard tracking and worked on integrating the different parts of the projects for the MVP. At the start of this week, Kirit created a prototype cardboard mount and used it to attach the magic leap controller on to the guitar. He noticed this worked relatively well but the pose estimate of the controller was offset relative to the physical controller location. He then worked on trying different ways to mitigate this, such as world and local space position offsets, but unfortunately none of these held up when the guitar was rotated. Ultimately Kirit discovered the pose estimate was offset such that it was always closer to the magic leap headset, and so he counter offset this along a vector from the centered headset position to the pose estimate. <br/>
![Kirit-demo](/xrcapstone21sp-team4/images/kirit-week-5-1.png){:width="300px"}
![Kirit-demo](/xrcapstone21sp-team4/images/kirit-week-5-2.png){:width="300px"}<br/>

**Sam:**<br/>
Sam worked on the chord progression system and music this time frame. Last week we had a floating guitar chord displayed to the user. Now he has decided that the song the user will learn for the MVP is Smoke on the Water. A classic first timer guitar song. He made two different modes. One where the song plays as normal and the tabs corresponding to each note in song will be displayed to the user. This is intended for a more experienced player that can play along. The second mode plays the next note in the song after a particular event has occurred. We are planning to integrate Max’s work to have an event be a correctly played note to progress the song. There will also be a backup mode, where if the user gets stuck at a particular part, they can progress the song with the trigger, which is integrated. 
You can take a look at a demo with this [video](https://twitter.com/SamVanderlinda/status/1387811784246005763?s=20).

Next week he plans on integrating his work with the rest of the project and if time permits, improve the UI to have 3d notes played to the user.<br/>
![Sam-demo](/xrcapstone21sp-team4/images/sam-week-5.png){:width="400px"}<br/>

**Max:**<br/>
Max completed a P5.js tutorial and modified it to recognize the respective frequencies of guitar strings. At this point individual notes are very much trackable, with the caveat that playing new notes over a still-vibrating old note and their harmonics cause the pitch signal to switch back and forth between them. This week he and Sam will work together to add pitch-triggered progression to the manual / automated chart/tab progression already in place. He will also implement a debouncing algorithm to control harmonics, and add frequencies for every possible note on the guitar. 

Summary of **next steps**:<br/>
Integrate all the pieces of the build to together.<br/>
Especially the pitch recognition and the chord progression.<br/>
 
Summary of our **blockers**:<br/>
The audio code significantly slows down the rest of the program, so this will be a challenge combining everything.






