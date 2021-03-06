---
layout: post
title:  "Week 3: Road to MVP"
date:   2021-04-23 21:00:00 -0700
categories:
---

<!-- Output copied to clipboard! -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.409 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Thu Apr 22 2021 23:51:55 GMT-0700 (PDT)
* Source doc: Week3 Blog- Rish
----->


**Rish:** This week I continued to work on marker tracking :

I tested out a js library found by Kirit using my WebCam.  \
Library : [https://github.com/jcmellado/js-aruco](https://github.com/jcmellado/js-aruco)  \
 \
Results:- \
With a print size of each marker being ~ 1 ½ inches I saw that the webcam ( 1080p ) can detect the markers of upto ~30 inches away 

 \
With a print size of ~0.9 inch I saw it dropped to nearly half i.e. 16 inches.  \
 \
Next, I stuck these markers on a guitar and looked at them.  \
 \
Initial results are not super promising - 

-The detection relies heavily on lighting ( we can make some assumptions about good lighting to combat this) 

- The angle of viewing also matters and steeper angles ( as such we will have with the AR headset might not detect the markers) \
- The markers do not detect if under strings ( this might make tracking slightly more difficult). 

I will spend the weekend trying to combat this issue.  \
 \
Any help regarding marker tracking would be greatly appreciated.  \


 \
Here is the video Link of the first attempt : [https://youtu.be/1FeoUyqGfGU](https://youtu.be/1FeoUyqGfGU) 

Potential Future Solutions: \
- I spend the rest of the time trying to find better ways to track the images and so Far I have found two promising candidates : \
[https://paperswithcode.com/paper/stag-a-stable-fiducial-marker-system](https://paperswithcode.com/paper/stag-a-stable-fiducial-marker-system) \
- Another potential approach that could work is using transfer learning with some modern nets like YOLO eg:- \
https://ieeexplore.ieee.org/document/9230250

**Sam:**

This week Sam chose Smoke on the Water by Deep Purple to be the song showcased in the MVP. He spent time editing the song and saved timestamps to corresponding notes.

He drew these corresponding notes in gimp and will model these as 3d guides this weekend for a nicer visual feel than 2d images.

He also made a script storing these images in a Data Structure as a key value store of notes - image (of the note).

**Max:**

This week Max followed up on a variety of options for pitch detection with JavaScript before settling on ml5.js’s pitchDetection() based on the CREPE model ([link](https://ml5js.org/reference/api-PitchDetection/)). Examples online use p5.js, so he will spend some time exploring boilerplate examples and finish implementing a MVP on Glitch tomorrow. Follow along [here](https://glitch.com/edit/#!/remixed-capstone-leap-audio?path=audio.js%3A14%3A5).

**Kirit:**

Kirit spent the week researching options for tracking the guitar fretboard. He experimented with numerous javascript-based libraries that claimed to support pose tracking. In summary, object tracking via [Tracking.JS](https://trackingjs.com/) gave poor results because of the Magic Leap’s small field of view , [BabylonJS with Webassembly](https://babylonjs.medium.com/marker-tracking-in-babylon-js-ce99490be1dd) had issues running on the Helio browser, and [js-aruco](https://github.com/jcmellado/js-aruco)  had poor accuracy did on smaller markers. Js-aruco seems to be the most promising, and it is based on OpenCV ArUco marker tracking (related code linked below for this). 

Kirit also parallelly explored the possibilities for tracking via the Magic Leap native sdk’s. He got a local development environment setup with Unity and followed along an official image tracking guide (code [https://drive.google.com/file/d/1vKCsdym2Uw2ByZOZawCNef98zbqzOA87/view?usp=sharing](https://drive.google.com/file/d/1vKCsdym2Uw2ByZOZawCNef98zbqzOA87/view?usp=sharing)). Unfortunately this performed worse at pose estimation than the ArUco marker tracking, and required larger images (which are infeasible to attach on a guitar fretboard). Finally he took the call to abandon Unity and stick with WebXR + AFrame for the project moving forward.

Kirit then setup a local node js server using Express for the team to speed up development, and is looking at getting a pre-MVP tracking prototype out using ArUco markers shortly. There is in-progress, early stage implementation of this in the app/ folder of the [team repository](https://github.com/UWRealityLab/xrcapstone21sp-team4).
