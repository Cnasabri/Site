# Approved requirements and conversation decisions

## Property and visual direction

English sales album for Unit 02, Nurollife Tower, Vadi Istanbul. Original property facts come from the PDFs: 200 m², 3 rooms, floor 42. Interior-design attribution is Kelvan iD. Do not invent additional property facts.

The first reference showed a large residential hero with white cards at the bottom. The interior reference used large serif typography, cream space, dark architectural photography and editorial image arrangements. The motion reference is `03365516f0bb6cd5ade53ec801014ba0.mp4`; its seconds 13–17 inspired four-photo rows with shifting images and an intervening text slot. This video is a reference asset, not required by the finished website.

## Opening and navigation

- Cinematic entrance and initial loading treatment.
- Four white hero bars: residence, plan, details, album. Collapsed size is about one line. Clicking expands content upward inside the same column, approximately to the area outlined in the owner's reference. It must not open a separate page or dialog. The previous card lowers when another opens. Titles can adapt to fit.
- The plan hero card may offer a thumbnail and link to the full interactive plan rather than trying to fit its complete interface in the card.
- Original brand logos remain present. Avoid the temporary black rectangle before transparency appears; keep blend groups opaque and isolated during reveal.
- Location map links to `https://maps.app.goo.gl/jv1tEhjCyxSVTsmK9`.

## Plan

Original reference was PDF 1 page 5; the owner then supplied a replacement PNG, now `assets/1-5.png` (2586×2207). This replaces the older `assets/unit-plan.png` in the visible plan and viewer.

Seven selectable areas: entrance; combined living/dining/TV; kitchen; master bedroom; master en suite; guest room; children's room. Hover uses transparent muted red fill and a dashed border. Selection navigates to the corresponding chapter. Touch supports select then explore with a separate visible navigation alternative. The original plan labels the guest chapter's space as Maid's Room; retain that clarification rather than relabelling architectural content silently.

SVG coordinates use a 1000×853.441608662 viewBox matching the replacement image. Keep the image and polygons in the same coordinate system. Recheck all zones when replacing the plan again.

## Photographs, viewer and key plans

- Preserve the 57-image sequence, including introductory images and plans. Room chapters: entrance 6–9; living 10–26; kitchen 27–33; master 34–49; guest 50–55; children 56 (zero-based inventory indices).
- Hover hint is small; remove the magnifying-glass/large expand ornament.
- Open full-resolution images with motion. Inside the viewer, one image click zooms; the next returns to its fitted view within the same viewer.
- × and Escape fade the whole viewer and backdrop. The closing image stays still, even when zoomed; no morph back into its original album thumbnail. Restore the previous scroll position.
- Show original PDF key-plan PNGs on the right only for relevant spatial views. Dark presentation should blend with the viewer background. Furniture/detail close-ups need no key plan, particularly master images 46–49 and guest 52–55.
- Dressing-room image 42 (Master bedroom — View 08) was edited by the owner to close its safe. Use `assets/Seamless Dark Wood and Glass Entryway.png` (1536×1024) as its full-resolution source; responsive derivatives are `assets/safe-closed.webp` and `assets/safe-closed-small.webp`.

## Product and tower annotations

- Minimal slow-pulsing dots, large enough to select comfortably. A click reveals a dashed connector and label with animation; outside click or another selected marker closes the old label with reverse motion.
- Reset open labels after leaving the photograph so returning starts closed.
- Photograph hover zoom and marker layer must use identical transforms; dots stay on the furniture as the image moves.
- Tower dot identifies Unit 02, floor 42.
- Living photo 10: armchair, right accent seating and dining chair. Kitchen photo 28: oven/microwave, cabinetry finish and island chair. Master photo 34: bed and right chair; right-chair dot is x80%, y58.5%, centred on its back rather than the curtain.
- Existing brands: Miele, Nurol, Saloni, Enza Home, Lazzoni, Norde, Fuga, Caploonba, Belusso. The owner explicitly authorized temporary assignments from these brands pending their correction. Keep those entries `temporary: true` in config; do not present them as independently verified. Miele appliances are verified from the photograph.

## Motion and ending

Scroll reveals must be visible rather than finishing above the user's focus. Current threshold is 68% of viewport height. Fully exited elements reset so the motion replays on return. Avoid resetting partially visible elements or racing animations on rapid repeated interactions.

Master detail images 46–49 and guest 52–55 use the reference-inspired moving four-photo/text arrangement. Preserve source ordering in the DOM; animate positioning. Cycle only when visible and reset on exit. Mobile uses a text block and two-column gallery; reduced motion keeps manual controls without automatic cycling.

Finish with a clear private-viewing sales invitation. Keep a copyable request, which the owner initially selected, and add their later supplied direct contacts: `09015388817`, `info@kelvan.design`. Current telephone/WhatsApp destination uses `+989015388817`. Never send messages on the owner's behalf merely because contact links are present.

## Verification and delivery

Check no broken images or browser errors, original order 0–56 once each, seven plan targets, correct image 42 replacement, selective key plans, card switching, marker alignment, stationary fade closing, mobile overflow and reduced motion. Existing regression scripts may be in `/tmp` in the current session but are not permanent dependencies; recreate focused checks if absent.

Repository ZIP: `https://github.com/Cnasabri/Site/archive/refs/heads/main.zip`. GitHub Pages must be separately verified before claiming a live deployment. Keep documentation aligned with actual current assets and completed checks.
