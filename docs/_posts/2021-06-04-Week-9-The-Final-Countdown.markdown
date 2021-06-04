<!-- Output copied to clipboard! -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.363 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Thu Jun 03 2021 23:42:39 GMT-0700 (PDT)
* Source doc: Week 9 Blog
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->

**<span style="text-decoration:underline;">Rish</span>**

Rish spent most of the time this week re-designing the UI for our application. The new UI now consists of a gaze-based control ( this was due to the fact that the controller will be on the guitar for this application). There are buttons such as Manual, Autoplay and Start. If we look to the right there is now a select songs option which loads dynamically through a data structure. With this we kept in mind the need to be able to add new songs easily. Kirit improved the cursor based approach by adding a ray-tracer, helping accelerate the response time. One challenge while creating the UI was that there are no button elements in AR. So each additional button on screen is stacks with other plane and text entities. Rish had to also manually create the drop down menu and add event listeners to each of these “planes” independently. This was slightly laborious but seemed like the only good option.

![alt_text](https://i.imgur.com/hyNmlch.png "GuitXR menu before selecting with gaze")


![alt_text](https://imgur.com/KrFyOsk "GuitXR menu after selecting with gaze")
 

**<span style="text-decoration:underline;">Sam</span>**

This week Sam helped Rish make the UI functional and integrated the code with the existing code base. He modeled the sweet PRS guitar above to add some flare to the starting UI. Sam was also the actor and “model” for the demo video being edited by kirit. He played the music with GuitXR active while Kirit filmed dynamic shots. 

**<span style="text-decoration:underline;">Kirit</span>**

Kirit cleaned up, optimized and Integrated the new UI and MIDI support this week. He fixed some raycaster issues and got the gaze-based menu to work reliably and support dynamically added songs. He also created a method for adding new songs with MIDI and chordpro support, and used it to add Seven Nation Army.

Kirit further worked with Sam to record footage of the application in action, and he then produced the final teaser video. This involved a large amount of audio processing and video editing. 

**<span style="text-decoration:underline;">Max</span>**

Max wrote up a list of classic rock guitar songs with single-note melodies. Unfortunately MIDI tracks include a lot more of the performance than expected. This meant melodies were infested with chords and quick repeated tones that interfered with pitch recognition and forced almost the same amount of editing and hard-coding of practice sections as we had before starting on MIDI integration. This and chord recognition will be long-term goals as part of continued work on GuitXR.
