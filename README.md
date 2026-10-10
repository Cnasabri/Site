# Unit 02 — digital residence album

A standalone English album built with HTML, CSS and JavaScript. No framework, package installation, external font service, API key or build step is required. Open `index.html` directly, or serve this directory:

```sh
cd /workspace/Site
python3 -m http.server 8000 --bind 0.0.0.0
```

The photographs follow `1.pdf`, `2.pdf`, `3.pdf`, then each page’s left-to-right order. The 57 extracted images include the opening photograph, location, tower, two plans and outlook. All 51 room photographs and all introductory images retain their original sequence. Furniture close-ups remain within their corresponding room chapters. The source inventory is `assets/source-images.json`; browser data lives in `assets/album-data.js`.

Brand logos were extracted from the original collaborated-brands page. They are not assigned to individual products because the album does not establish those associations. Property facts and original view titles come from the PDF. Short descriptive English copy was added based on the visible interiors. No price or contact details were invented.

The interactive plan uses polygons traced against the original apartment plan. Dining and TV zones link to their photographs within the living-room chapter. The en suite links to its photograph in the master chapter. The guest-room target is explicitly disclosed as the original plan’s “Maid’s Room”. On touch devices, tap a zone to select it, then tap again to explore; the room list and “Explore this space” button provide direct navigation.

Dialogs support Escape, focus trapping and image navigation using left/right arrows. All animation respects `prefers-reduced-motion`. Fonts, logos and photographs are local so the album also works offline. Lower-resolution images and lazy loading keep the long album responsive; the viewer loads the full 2200-pixel export.

Fonts are Nimbus Sans and P052 from the URW base35 collection; their license is included in `assets/FONT-LICENSE.txt`. Original font sources are available at https://github.com/ArtifexSoftware/urw-base35-fonts.

The site runs in the existing checkout; future cloud tasks do not need a new worktree. Live HTTP server processes must be started again in a new task.
