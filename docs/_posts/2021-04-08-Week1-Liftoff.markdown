---
layout: post
title:  "Week 1: Liftoff"
date:   2021-04-08 21:00:00 -0700
categories:
---
Welcome to our week 1 progress update, our team is excited to get started working on GuitXR! 
We spent the majority of the week honing down on the idea and discussing the approaches and technologies we could utilize to create an augmented reality tool for empowering guitarists.

In addition, Maxime and Samuel went ahead and built this website, while Kirit and Rishabh got a head start on the project by tackling the problem of mapping a physical guitar fretboard and strings.

The immediate goals we are working towards:
* Visualize music chords and tabs in front of a user so they can play any song without needing to commit it to memory or bury their head in note sheets. These will ideally use some form of pitch recognition to move the tabs forward when they are played correctly, and have an easy way of selecting or importing songs.
* Highlight which strings to pluck on the fretboard of a physical guitar along with visual handshape indicators, making learning new songs easier. We hope to make this an invaluable guitar teaching tool for both beginners and experienced guitarists.

The core technical challenge we anticipate is accurately mapping out the position of each string and each fret on a moving physical guitar in realtime while it is held at an angle relative to the camera.
Here are some of our early stage findings (mostly put together by Rishabh): 
[Week 1 Computer Vision Fretboard Detection Techniques](https://docs.google.com/document/d/1TyTIryU55h1wBYwHiKqDRSgBX48e7zCjgk8D1Dp38I8/edit?usp=sharing)

We are looking to spend next week further experimenting with techniques to achieve this (Computer Vision, markers, external trackers etc) as well as potentially getting an early stage prototype out.


Some reference material:
1. https://ensiwiki.ensimag.fr/index.php?title=GuitAR_Learning_Assitant_in-Augmented_Reality
2. https://github.com/paulden/guitar-fingering-recognition
