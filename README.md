# Unit 02 — digital residence album

## GitHub Pages

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, then save. `.nojekyll` makes GitHub serve the static album directly. After GitHub completes deployment, the expected site address is https://cnasabri.github.io/Site/. GitHub Pages activation has not been verified from the cloud environment because its network proxy blocks `api.github.com`.

A standalone English album built with HTML, CSS and JavaScript. No framework, package installation, external font service, API key or build step is required. Open `index.html` directly, or serve this directory:

```sh
cd /workspace/Site
python3 -m http.server 8000 --bind 0.0.0.0
```

The photographs follow `1.pdf`, `2.pdf`, `3.pdf`, then each page’s left-to-right order. The 57 extracted images include the opening photograph, location, tower, two plans and outlook. All 51 room photographs and all introductory images retain their original sequence. Furniture close-ups remain within their corresponding room chapters. The source inventory is `assets/source-images.json`; browser data lives in `assets/album-data.js`.

Brand logos were extracted from the original collaborated-brands page. Product markers identify Miele appliances from the equipment photograph; furniture and cabinetry markers disclose unconfirmed attribution and link to the collaborated brands. Property facts and original view titles come from the PDF. Short descriptive English copy was added based on the visible interiors. No price or contact details were invented. The sales ending provides a copyable private-viewing request.

The interactive plan uses the original lossless PNG from PDF 1 page 5, with seven zones traced against it. Living, dining and TV form one zone, highlighted in translucent red with a dashed outline. The en suite links to its photograph in the master chapter. The guest-room target is explicitly disclosed as the original plan’s “Maid’s Room”. On touch devices, tap a main-plan zone to select it, then tap again to explore; the room list and “Explore this space” button provide direct navigation. The four compact opening tabs expand inline and allow one open section at a time.

Dialogs support Escape, focus trapping and image navigation using left/right arrows. Click an enlarged image to reverse the opening motion. Original room key plans appear beside it (below on mobile). All animation respects `prefers-reduced-motion`; scroll reveals replay after leaving the viewport completely. Fonts, logos and photographs are local so the album also works offline. Lower-resolution images and lazy loading keep the long album responsive; the viewer loads original-resolution source images only when requested. The source exports add approximately 75 MB to the downloadable album.

Fonts are Nimbus Sans and P052 from the URW base35 collection; their license is included in `assets/FONT-LICENSE.txt`. Original font sources are available at https://github.com/ArtifexSoftware/urw-base35-fonts.

The site runs in the existing checkout; future cloud tasks do not need a new worktree. Live HTTP server processes must be started again in a new task.
