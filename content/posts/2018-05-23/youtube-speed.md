title: Change YouTube speed from your favorites bar
category: misc
---

![I feel the need... the need for speed!]({attach}need-for-speed.gif)

# Premise

While the UI of YouTube only shows only limited set of high-speed options, it is possible to set the speed to any floating point value. Even better, one can do so from their favorites bar with bookmarklets.

![Youtube dialog to set speed]({attach}youtube.png) &nbsp;&nbsp;⇒&nbsp;&nbsp; ![Bookmarks to set youtube speed]({attach}bookmarklets.png)

# Method

Simply add any of the following code snippets as bookmarks.

If you have a fixed speed in mind, e.g. 2.5:

`javascript:document.getElementsByTagName("video")[0].playbackRate=2.5;`

Or save this line to show a prompt that asks for a floating-point input:

`javascript:var%20speed=prompt("Speed:","1.");document.getElementsByTagName("video")[0].playbackRate=parseFloat(speed);`

Which results in the following prompt:

![A prompt that asks for speed]({attach}custom.png)

# Caveats

Works with YouTube and Vimeo.

The speed display in the video player will remain to show the last setting.

# References

- GIF: [Top Gun](https://www.youtube.com/watch?v=fR2hajcuFEM)
- Script: [Quora answer of John Vuong](https://www.quora.com/Is-there-a-way-of-watching-YouTube-videos-at-higher-than-2x-speed/answer/John-Vuong-12)
