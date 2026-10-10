# Unit 02 — digital residence album

## GitHub Pages

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, then save. `.nojekyll` makes GitHub serve the static album directly. After GitHub completes deployment, the expected site address is https://cnasabri.github.io/Site/. GitHub Pages activation has not been verified from the cloud environment because its network proxy blocks `api.github.com`.

A standalone English album built with HTML, CSS and JavaScript. No framework, package installation, external font service, API key or build step is required. Open `index.html` directly, or serve this directory:

```sh
cd /workspace/Site
python3 -m http.server 8000 --bind 0.0.0.0
```

The photographs follow `1.pdf`, `2.pdf`, `3.pdf`, then each page’s left-to-right order. The 57 extracted images include the opening photograph, location, tower, two plans and outlook. All 51 room photographs and all introductory images retain their original sequence. Furniture close-ups remain within their corresponding room chapters. The source inventory is `assets/source-images.json`; browser data lives in `assets/album-data.js`.

Brand logos were extracted from the original collaborated-brands page. Their reveal keeps the blend layer opaque to prevent the black-background flash. The owner requested temporary existing-brand assignments for furniture and cabinetry; these are marked `temporary: true` in `experience-config.js` and remain editable. Miele appliances are verified from the equipment photograph. Property facts and original view titles come from the PDF. Short descriptive English copy was added based on the visible interiors. The owner supplied the contact number `09015388817` and `info@kelvan.design`; telephone and WhatsApp links use its Iranian international form `+989015388817`. The sales ending also provides a copyable private-viewing request.

The interactive plan uses the original lossless PNG from PDF 1 page 5, with seven zones traced against it. Living, dining and TV form one zone, highlighted in translucent red with a dashed outline. The en suite links to its photograph in the master chapter. The guest-room target is explicitly disclosed as the original plan’s “Maid’s Room”. On touch devices, tap a main-plan zone to select it, then tap again to explore; the room list and “Explore this space” button provide direct navigation. Each compact opening tab expands upward within its own column, with one open card at a time. The plan card shows a thumbnail and a link to the full interactive plan.

The replacement PNG shown inline in chat is not available as an attached file in this workspace. Its exact replacement and zone alignment remain pending the original PNG file; `RESIDENCE_CONFIG.plan` centralizes the plan source. The current original PDF-derived PNG remains in place.

Dialogs support Escape, focus trapping and image navigation using left/right arrows. Click an image inside the viewer to zoom in, then click again to return to its fitted view without dismissing the viewer. Close with × or Escape to return to the exact previous album position. Original room key plans appear only on configured spatial views; all furniture and detail close-ups are full width without a key plan. Larger product markers zoom in sync with their photograph, close with reverse motion on outside clicks, and reset after their photograph leaves the viewport.

Scroll reveals begin when their top reaches 68% of viewport height and replay after full exit. The two four-photo master/guest detail rows use the reference video's 13–17 second pattern: photographs slide around an editorial text slot. The animation starts on entry, cycles while visible and resets after exit; mobile uses a vertical text-and-photo arrangement. Reduced-motion mode disables automatic cycling and movement while keeping manual detail controls. Fonts, logos and photographs are local so the album also works offline. Lower-resolution images and lazy loading keep the long album responsive; the viewer loads original-resolution source images only when requested. The source exports add approximately 75 MB to the downloadable album.

Fonts are Nimbus Sans and P052 from the URW base35 collection; their license is included in `assets/FONT-LICENSE.txt`. Original font sources are available at https://github.com/ArtifexSoftware/urw-base35-fonts.

The site runs in the existing checkout; future cloud tasks do not need a new worktree. Live HTTP server processes must be started again in a new task.
