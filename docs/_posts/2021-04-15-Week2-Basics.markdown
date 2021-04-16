---
layout: post
title:  "Week 2: Basics"
date:   2021-04-15 21:00:00 -0700
categories:
---
Here is the week 2 report on the GuitXR project.<br/>
We all collaborated on finishing our PRD (look at the PRD link above) and this was the first week of prototyping a proof of concept.<br/>
We each worked on a different core feature in seperate repositories.

Here are the four glitch projects: <br/>
  - Kirit: [TensorFLow.js for basic object detection](https://glitch.com/edit/#!/capstone-leap) <br/>
  - Rishabh: [Image, Barcode, Pattern trackers](https://glitch.com/edit/#!/flash-accurate-soda) <br/>
  - Sam: [Displaying tabs to the user](https://glitch.com/edit/#!/rapid-prototype-vr) <br/>
  - Maxime: [Tapping into the Magic Leap's audio feed](https://glitch.com/edit/#!/remixed-capstone-leap-audio?path=index.html%3A1%3A0) <br/>

Now lets get more indepth on what each member did this week...

**Kirit** worked on evaluating the feasibility of WebXR and AFrame for tracking the guitar fretboard through a Magic Leap camera.
He tried to port over the popular web framework AR.js but ran into many issues because the framework is designed to support AR through mobile devices and is incompatible with running on the Magic Leap's Helio browser.

He was able to access the magic leap camera feed, and use TensorFlow.js to perform basic object detection. 
However, attempting to use JavaScript marker tracking libraries proved to have issues running on the device, and there does not seem to be a good implementation that gives pose information in the Magic Leap's camera space.<br/>
![Kirit-demo](/xrcapstone21sp-team4/images/kirit-demo-week-2.png)


**Rishabh** worked on finding ways for marker tracking that works with A-frame. We plan to have our first version of the application using marker tracking and we will make using CV for fret detection a stretch goal. 

He experimented with three different methods of tracking:- 
- Image tracker 
- Barcode tracker
- Pattern tracker

All of the three were part of the arjs library. We were able to get a working example with the pattern tracker. 
To use: -
- Open link using phone or computer. 
- Search for the HIRO marker on google and show it to the camera that you are using. 
- A box should be overlaid on the marker. 

This showed success to our idea for using markers on the guitar. 
However, I ran into a problem where MagicLeap does not support arjs yet. Thus, when we open the demo from a magic leap browser it shows us an error. Kirit tried to work around this but it does not seem possible at the moment.<br/>
![Rish-demo](/xrcapstone21sp-team4/images/hiro-week-2.png){:width="300px"}

**Sam** worked on tabs being displayed to the user. Made script that allows tab images to follow the user as they move and maintians a reasonable distance. This allows the tab to be available at a glance, but looking down at the fretboard will not objstruct the player's vision.<br/>
 The next steps will be to incorporate multiple tabs to cycle through, indicating a chord progression to the user.<br/>
 ![sam-demo](/xrcapstone21sp-team4/images/sam-week-2.png)
 
Early this week **Maxime** looked through the documentation for the Magic Leap, set up the device, and realized to test while wearing the device he would need to buy contact lenses. Later he examined the feasibility of audio capture in WebXR / A-Frame using the Magic Leap's built-in microphone array. Max found these two pages that looked promising for a potential switch to Unity if we cannot get AR.js working in WebXR / A-Frame.

[Audio Capture Example  Magic Leap](https://developer.magicleap.com/en-us/learn/guides/sdk-example-audio-capture)

[Audio Capture Snippet  Unity  Magic Leap](https://developer.magicleap.com/en-us/learn/guides/audio-capture-snippet-unity)

Kirit shared this page with him for future work on chord recognition.

[connormcl/chord_recognizer: Feedforward neural network for live guitar chord recognition (Python + TensorFlow) (github.com)](https://github.com/connormcl/chord_recognizer)

And Max remixed his Glitch project to take input from the microphones instead of the camera.

He will continue working over the weekend on the proof of concept to include logic on recognizing peaks/dips in the audio signal. Max is looking forward to the Glitch examples John promised to send demonstrating microphone control on the Magic Leap.<br/>
 ![max-demo](/xrcapstone21sp-team4/images/max-week-2.png){:width="420px"}

Summary of **next steps**:<br/>
Make final determination if we need to switch to unity to continue our project. <br/>
Explore more marker tracking methods and find a feasible one by next week. <br/>
Build out the tabs and chord progression system for the user. <br/>
Detect pitch of audio feed from headset.

Summary of our **blockers**:<br/>
Lack of support for the magic leap in VR/AR libraries, especially AR.js and marker libraries.





