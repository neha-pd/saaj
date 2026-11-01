# Reel videos

Drop SAAJ's reel videos here as MP4 files named after the Instagram reel code.
The site detects them at build time and plays them automatically (muted, looping, inline).

| File name              | Reel                                   |
| ---------------------- | -------------------------------------- |
| DXoz7VBCOD_.mp4        | Crimson saree styling                  |
| DYJ5ljGIKVg.mp4        | At the SAAJ stall                      |
| DfJmPtNIr8o.mp4        | "Two more days to shop"                |
| DfEIuIJIGOC.mp4        | Tarang Utsav, Ponda                    |
| De8ikSAI4GQ.mp4        | Diwali Special                         |
| DezK1YUIDeo.mp4        | Diwali Exhibition, Stall 70            |

How to get them: in the Instagram app open the reel → ⋯ → Download (or export from Meta Business Suite).
Recommended: 720×1280, H.264, under ~4 MB each, e.g.

    ffmpeg -i input.mp4 -vf scale=720:-2 -c:v libx264 -crf 28 -preset slow -an -movflags +faststart DXoz7VBCOD_.mp4

(`-an` strips audio; omit it to keep sound for the full-screen viewer.)
Reels without a file fall back to Instagram's own player in the full-screen viewer.
