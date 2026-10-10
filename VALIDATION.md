# Validation

Verified in Chromium via a local HTTP server:

- All 57 source images occur exactly once in the main document, in inventory order 0–56.
- Nine original brand logos render.
- Seven interactive-plan zones render, with Living, Dining & TV Area combined and the original PNG plan.
- Plan hover updates the selected zone and its description; touch selects on the first tap and navigates on the second.
- Four compact hero tabs expand inline, switch one at a time, and collapse without opening a dialog.
- Original-resolution full-screen photographs and room key plans load; next-image navigation and Escape work. Clicking the enlarged photograph reverses the opening motion.
- Nine tower/product markers render, including the unit-floor annotation and confirmed Miele appliance logo.
- Google Maps links use the supplied address; the viewing request provides copy or manual-selection feedback.
- Scroll reveals reset fully outside the viewport and replay on return; mobile key plans display below the photograph.
- Main-document photographs load without broken assets.
- Layout has no horizontal overflow at 375, 390, 768 and 1440 pixels.
- Reduced-motion mode reveals the hero and completes the loader.
- No JavaScript exceptions or HTTP asset failures occurred.

`node --check app.js` and `node --check enhancements.js` pass. The HTML endpoint returns HTTP 200.

Direct `file://` navigation could not be tested because this cloud browser blocks file URLs by administrator policy. The album uses relative, classic scripts and local assets without fetch requests, and is designed to open directly from its extracted folder. The fully tested workflow uses the local HTTP server described in README.md.

The static source is maintained on GitHub main. GitHub Pages activation is separate and has not been verified.
