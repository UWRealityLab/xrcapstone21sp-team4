---
layout: post
title:  "Towards the Target"
date:   2021-05-13 1:00:00 -0700
categories:
---
Getting past the MVP blues, the team made some key progress on improving the usability of the application and got some gears in place to make the application something that would elevate guitarists. We now have a permanent mount that anyone can 3D print (cya cardboard), a virtual hand that follows along the guitar fretboard (eventually indicating chord shapes), and we are currently working on MIDI integration and auto generating chord visualizations, opening the app up to support nearly every song!
Onto the progress reports,

<b>Kirit</b>

Kirit spent the majority of the week 3D modelling and designing a more permanent mount to be used for attaching the controller onto the guitar. This was necessary to improve the stability of the controller and so that it would be at a consistent position for the fretboard tracking. He initially envisioned using velcro to strap it onto the guitar, but after 3D printing the first version it became clear that velcro wasn’t able to give a tight enough fit due to the weight of the magic leap controller. He then revised it to work similar to the previous cardboard design, such that an external capo is used to clamp it on. This worked extremely well, and it allows anyone to 3D print a mount and try the app out for themselves.
![Mount V2](/xrcapstone21sp-team4/images/mount-v2.jpg){:width="300px"}

Kirit additionally took a pass at improving the performance of the application. He measured the framerate and found that without the ml5/tensorflow.js pitch recognition running, the magic leap was able to render at ~50 fps. However, turning on the pitch recognition dropped this to between 5-8fps and caused significant stuttering. As a workaround, Kirit restructured some logic so the pitch recognition would only turn on when manual mode is selected. This entails the app is faster to start initially, but when attempting to select manual mode there is a delay and a big fps drop. Some further tweaks got the fps upto between 10-12, however Kirit plans to optimize further next week by moving the majority of the application logic to use Three.JS directly to get around AFrame overhead.


<b>Sam</b>

Sam designed a hand model to follow the position of notes on the fretboard as the user plays. This hand tracks the guitar and will guide the user on a suggested hand position on how to play a chord/note. He also made improvements to the UI, so that a user can switch between manual and autoplay mode when a guitar learning session is over. We may purchase a more detailed model or even animations on a website like Fiver or a more established model/animation buying and selling hub. He will continue to improve the UI and UX of the GuitXR app and bring the app to a state where we can show someone who hasn’t seen GuitXR how it works in a 60 second video. We may also need to simulate a view through the Leap’s screens since our method of holding a phone up to the device leaves a lot to be desired.
![Hand V1](/xrcapstone21sp-team4/images/hand-v1.png){:width="600px"}

<b>Max</b>

This week Max ran into some roadblocks importing Tonal.js but now has contacts and can wear the Magic Leap without shoving centimeter-thick glasses in between the screens and his face. Aside from implementing MIDI support he will also try to 3D print a capo mount somewhere in New Jersey using the file Kirit designed, and update chart images to address the issue of varying backgrounds interfering with visibility.

<b>Rish</b>

This week Rish spent some time trying to figure out how to generalize the chord visualization. Currently, the visualization is hardcoded, and trying to generalize it gave some bugs where the whole application was ending up crashing even with something simple as appending an entity. After struggling with this error for a while and consulting the team, Rish has decided to make a new implementation of the visualization while taking some elements from the hard-coded version. This is an arduous task and might take some time to complete but he aims to finish it by next week.





In summary, <b>plans for next week:</b>

*  Finish MIDI integration
*  Auto generate chords
*  Improve performance
*  Show chord handshapes
