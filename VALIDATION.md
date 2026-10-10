# Validation

Verified in Chromium via a local HTTP server:

- All 57 source images occur exactly once in the main document, in inventory order 0–56.
- Nine original brand logos render.
- Seven interactive-plan zones render, with Living, Dining & TV Area combined and the original PNG plan.
- Plan hover updates the selected zone and its description; touch selects on the first tap and navigates on the second.
- Four compact hero tabs expand upward within their own columns, switch one at a time, and collapse without opening a dialog. Rapid repeated selections retain one open card.
- Original-resolution full-screen photographs load. Spatial views have key plans; the tested master/guest furniture close-ups do not. Clicking inside the viewer toggles a second zoom level without closing it. × and Escape fade the whole viewer and backdrop out together and restore the original scroll position. Desktop and mobile checks confirm the zoomed image stays stationary during closing, no return morph is created, reopening restores full opacity, an early close cancels the opening morph, and reduced-motion mode closes immediately without browser errors.
- Nine larger tower/product markers render. Outside clicks reverse their opening motion, a second click closes them, and viewport exit resets their state. Photograph and marker-layer hover transforms match. The bedroom chair point is centred on the right chair's back.
- Existing-brand product labels are editable, owner-requested temporary assignments; Miele remains verified.
- Logo reveal uses opaque, isolated blend groups, preventing the black rectangle flash while preserving the original logo sources.
- Google Maps links use the supplied address; the viewing request provides copy or manual-selection feedback.
- Scroll reveals wait while their top is at 86% of viewport height, then start after crossing 68%. They reset fully outside the viewport and replay on return.
- Both four-photo detail rows include moving editorial text slots based on the reference video's 13–17 second interval. Selection changes the text and its position, and viewport exit resets the row to its first detail. Mobile uses a text block above a two-column gallery.
- Supplied phone and email use correct direct-contact links; viewing-request copy/manual selection provides feedback.
- Main-document photographs load without broken assets.
- Layout has no horizontal overflow at 375, 390, 768 and 1440 pixels.
- Reduced-motion mode reveals the hero and completes the loader.
- No JavaScript exceptions or HTTP asset failures occurred.

`node --check app.js`, `node --check experience.js` and `node --check experience-config.js` pass. The HTML endpoint returns HTTP 200. Interactive Chromium checks passed, including a mobile touch context and reduced-motion mode.

Direct `file://` navigation could not be tested because this cloud browser blocks file URLs by administrator policy. The album uses relative, classic scripts and local assets without fetch requests, and is designed to open directly from its extracted folder. The fully tested workflow uses the local HTTP server described in README.md.

The static source is maintained on GitHub main. GitHub Pages activation is separate and has not been verified.

Pending assets: the replacement 2586×2207 plan PNG and the edited dressing-room photograph with the safe closed were visible inline in chat but unavailable as attached files. Exact replacement and alignment have not been performed; the original PDF-derived assets remain active.
