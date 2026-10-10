# Validation

Verified in Chromium via a local HTTP server:

- All 57 source images occur exactly once in the main document, in inventory order 0–56.
- Nine original brand logos render.
- All nine interactive-plan destinations navigate to the correct chapter or photograph.
- Plan hover updates the selected zone and its description; touch selects on the first tap and navigates on the second.
- Hero panels open, animate, close with Escape, and navigate into the album.
- Full-screen photographs load; left/right arrows advance the viewer and Escape closes it.
- Main-document photographs load without broken assets.
- Layout has no horizontal overflow at 375, 390, 768 and 1440 pixels.
- Reduced-motion mode reveals the hero and completes the loader.
- No JavaScript exceptions or HTTP asset failures occurred.

`node --check app.js` passes. The HTML endpoint returns HTTP 200.

Direct `file://` navigation could not be tested because this cloud browser blocks file URLs by administrator policy. The album uses relative, classic scripts and local assets without fetch requests, and is designed to open directly from its extracted folder. The fully tested workflow uses the local HTTP server described in README.md.

No deployment or publication has been performed.
