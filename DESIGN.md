---
name: Activités Nature
description: The Hautes-Alpes travel poster as a website; flat light fields, one ink, one family.
colors:
  sky: "#cfe7f0"
  sky-ink: "#0d2b3e"
  ridge: "#8fb9cb"
  lake: "#3fb3ac"
  lake-ink: "#0b2433"
  sun: "#f5c04a"
  sun-ink: "#0d2b3e"
  sun-strong: "#ffcf5c"
  paper: "#f3f9fb"
  paper-ink: "#0d2b3e"
  night: "#0d2b3e"
  night-ink: "#dff0f6"
  soft: "#3d5a6b"
  error: "#b3261e"
  night-sky: "#0e2433"
  night-sky-ink: "#d6ebf3"
  night-ridge: "#1c3c50"
  night-lake: "#0e5455"
  night-lake-ink: "#e3f5f3"
  night-sun: "#163248"
  night-paper: "#0a1a24"
  night-night: "#05121a"
  night-soft: "#9bb7c6"
  night-error: "#ff8a80"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(56px, 9.2vw, 176px)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(36px, 4.2vw, 64px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.2vw, 34px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(19px, 1.45vw, 21px)"
    fontWeight: 500
    lineHeight: 1.42
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.45
rounded:
  none: "0px"
spacing:
  gutter: "clamp(12px, 1.4vw, 20px)"
  margin: "clamp(16px, 2.4vw, 36px)"
  section: "clamp(96px, 12vw, 200px)"
  header: "68px"
components:
  button-primary:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.sun-ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.sun-strong}"
  button-ink:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-ink-hover:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.sun-ink}"
  card-outing:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.none}"
    padding: "clamp(20px, 1.8vw, 28px)"
  ticket:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 3vw, 48px)"
  ticket-stub:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.sun-ink}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 3vw, 44px) clamp(20px, 2.4vw, 32px)"
  chip:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.sky-ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "48px"
  chip-selected:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
  input:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.sky-ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "52px"
  stepper:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.sky-ink}"
    rounded: "{rounded.none}"
    height: "52px"
    width: "156px"
  gallery-control:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.none}"
    size: "52px"
---

# Design System: Activités Nature

## Overview

**Creative North Star: "The Pinned Travel Poster"**

The site is a vintage Hautes-Alpes travel poster that keeps going as you scroll. Every section stands on a flat field of local colour: the pale sky, the blue-grey ridge of the Écrins, the turquoise of Serre-Ponçon, the yellow of the Embrun sun. One navy ink prints on all of them. Photographs are the client's own outings, set into the fields as windows, columns and halves, never tinted or framed with ornament.

Density is low and the scale is loud: poster titles in wide black Archivo hold the page, and everything else is set at normal width in a short six-step ramp. Depth comes from field changes and from photographs, not from light; there are no shadows, no gradients and no lines. The one drawn element is the real contour map of the Embrun valley: full behind the hero, and printed faintly across each ritual field. Fields meet at straight edges.

Night mode is the same poster re-inked, not a different site: the fields drop to navy tones, the inks go pale, and the sun-yellow survives as the action colour and the ink of the former sun field.

**Key Characteristics:**
- Flat colour fields (sky, lake, sun, paper, night) carry whole sections, each with its paired ink.
- One family, Archivo, with the width axis: 112% black for poster titles, 100% for everything else.
- Square corners everywhere; flat fills; no shadow at rest, no gradient, no hairline.
- The hero ground is the real valley: 50 m contours from elevation data, Serre-Ponçon at its true shape, Baratier pinned.
- The same map, faint and cropped differently, is the only texture elsewhere. No invented silhouettes.
- Sun-yellow is the action colour in both themes.
- Motion is a poster coming to life: a window that opens, lines that rise, pictures that open like shutters.

## Colors

A light alpine palette of four grounds and one navy ink, with sun-yellow reserved for action and warmth.

### Primary
- **Embrun Sun** (`sun`): the action colour. Every primary button, the ticket stub, the mobile menu panel, the footer menu half, selection highlight and caret. In the light theme it is also a full section field; its hover is **Noon Sun** (`sun-strong`).

### Secondary
- **Serre-Ponçon Lake** (`lake`): the hero's bottom band, ritual fields, the empty state of photo frames and tiles, and the ticket section ground. Carries **Deep Lake Ink** (`lake-ink`).

### Tertiary
- **Écrins Ridge** (`ridge`): the hero contour lines (at `contour-strength`: 0.42 by day, 1 at night) and the scrollbar thumb. Never a section ground.

### Neutral
- **Alpine Sky** (`sky`): the hero and header ground, ritual fields, and the fill of every control that takes input (chips, inputs, stepper).
- **Poster Paper** (`paper`): the page ground, the ticket body, caption plates on photographs.
- **Navy Ink** (`night`, `sky-ink`, `paper-ink`, `sun-ink`): the single ink of the light poster, and the ground of the outing card, gallery controls, the ink button and selected chips. **Pale Sky Ink** (`night-ink`) prints on it.
- **Soft Slate** (`soft`): secondary text only: fact labels, hints, FAQ answers.
- **Signal Red** (`error`): form errors only.

### Night re-ink
Under `prefers-color-scheme: dark` (unless `data-theme="light"`) and under `data-theme="dark"`, the same variable names are re-inked: sky `night-sky`, ridge `night-ridge`, lake `night-lake` with `night-lake-ink`, paper `night-paper`, night `night-night`, soft `night-soft`, error `night-error`, inks `night-sky-ink`. The sun field becomes `night-sun` (deep navy) with sun-yellow as its ink; selected chips and the focus ring turn sun-yellow. The action colour (`sun`, `sun-strong`, ink `night`) does not change between themes.

### Named Rules
**The Field And Ink Rule.** A surface is always one of the five fields with its own paired ink. Never set text colour independently of the field it sits on.

**The Sun Is Action Rule.** Sun-yellow marks the thing to press. A sun field may host a section, but nothing on a non-sun field is yellow unless it is clickable or the selection.

## Typography

**Display Font:** Archivo (variable, with the `wdth` axis; fallback system-ui, sans-serif)
**Body Font:** Archivo
**Label/Mono Font:** none; there is no second family and no monospace.

**Character:** One grotesque used two ways: stretched to 112% at weight 900 it is the poster lettering; at normal width it is the reading voice. The contrast is width and weight, never a second typeface.

### Hierarchy
- **Display** (900, 112% wide, uppercase in the hero): the poster title. The hero h1 runs this role at its own scale (clamp(56px, 10.6vw, 204px), line-height 0.8); the contact e-mail runs the display step at weight 500, normal width.
- **Headline** (900, 112% wide, line-height 0.95): section heads, ticket title, ticket price, mobile menu links.
- **Title** (900, line-height 1): card titles (112% wide), fact values, footer menu links (112% wide), gallery count (700).
- **Lead** (500–800, line-height 1.42): ledes, ritual text (600), FAQ questions (800), stepper count (900).
- **Body** (400–700, line-height 1.55): running text; measures held at 32–62ch.
- **Label** (600–700): fact labels, form labels, nav, captions, legal. Sentence case, no tracking.

### Named Rules
**The Two Widths Rule.** 112% width is for poster titles only (display, headline, card and footer titles). Text, labels and numbers stay at 100%.

**The Ritual Verb Exception.** The ritual verbs (ENFILER, ÉCOUTER, DESCENDRE, SÉCHER) are uppercase black at normal width with tight tracking (-0.045em, line-height 0.84); they are the only uppercase outside the hero.

**The Tabular Numbers Rule.** Prices, slots and counts use tabular figures.

## Layout

A 12-column grid (`grid12`) with a fluid gutter, inside a fluid side margin that respects safe-area insets. Sections breathe on a single vertical unit (`section`). The sticky header is 68px and anchors offset by it.

Sections are composed as poster plates rather than stacked cards: a split head (7 columns) and lede (5 columns, bottom-aligned); full-viewport photographs with a night card pinned in one of four columns (alternating per outing); ritual panels as half field, half photograph, alternating sides; a wide photo (8 columns) beside a side column of tile and facts; a 4:5 gallery frame offset to columns 7–11; a FAQ beside a tall 3:4 photograph with an overlapping square; the footer as photograph half and sun menu half.

Breakpoints: 1100px (outing card drops below its photograph), 960px (header collapses to menu, hero recomposes vertically, ticket stacks), 860px (grids go single column), 760px (ritual panels stack with the photograph first). Mobile buttons go full width.

## Elevation & Depth

The system is flat. No element casts a shadow at rest or on hover, and nothing uses a gradient. Depth is made by fields meeting fields, by photographs being clipped into openings, and by overlap: the night card over its photograph, a caption plate on a tile, the square photo overlapping the tall one with a 10px sky surround. Press feedback is scale, not elevation.

### Named Rules
**The Flat Poster Rule.** Depth is overlap and field contrast. If something needs to stand forward, put it on a different field; never lift it with a shadow.

## Shapes

Every corner is square (0px): buttons, chips, inputs, cards, frames, photos. There are no borders and no dividing hairlines; separation is a change of field or space. List marks are 7px filled squares in sun, lake or ink. The FAQ chevron is a drawn 10px corner at 2.5px weight.

**The Real Map.** The hero ground is `public/images/lieu/courbes.svg` (contours, 1280×768 map units, used as a CSS mask filled with `ridge`) and `courbes-lac.svg` (the lake below 781 m, masked in `lake`), both cover-fitted. The Baratier pin (a sun dot ringed in ink, label at `step-small`) is placed in map units with container-query units, so it stays on the village at any size. Data: AWS Terrain Tiles z12, credited in the footer. Never replace it with an invented landscape.

**Map Crops.** Each ritual field carries the same `courbes.svg` as a mask filled with the field's own ink at 12% opacity, at a fixed 1600px width so the line weight is constant, and at a different `--map-crop` position per step (12% 18%, 78% 64%, 40% 92%, 92% 10%).

**The One Map Rule.** The real valley map is the only illustration. No icons-as-decoration, no blobs, no wave dividers, no drawn mountain silhouettes.

## Components

### Buttons
Solid poster rectangles that press in.
- **Shape:** square (0px), minimum height 52px, 0 24px padding (44px / 0 18px in the header).
- **Primary:** sun field, navy ink, weight 800, optional trailing 18px arrow.
- **Hover / Focus:** hover lightens to noon sun and nudges the arrow 3px; focus is a 3px outline in the focus colour at 3px offset; active scales to 0.97 over 140ms.
- **Ink:** night field with pale ink; hover flips to sun.
- **Text link:** underline at 0.08em, 35% current colour, solid on hover.

### Chips
- **Style:** sky field, sky ink, weight 700, 48px tall, square. Radio inputs under the hood.
- **State:** selected turns night with pale ink (sun with navy ink at night); focus ring sits on the chip; press scales 0.97.

### Cards / Containers
- **Outing card:** night field, square, fluid 20–28px padding, 14px gap. Fixed order: title (112%), place, three slots (duration, age, price as label over title-weight value), text, one safety line with a sun square, full-width sun button. Pinned on a full-viewport photograph on desktop, under it on mobile.
- **Ticket:** paper body (7fr) and sun stub (3fr) on a coloured section field that meets the section above at a straight edge. The stub holds the live price (headline, tabular, rolls in on change), the summary and the send actions. Stacks below 960px.
- **Shadow Strategy:** none (see Elevation & Depth). **Border:** none.

### Inputs / Fields
- **Style:** sky field, sky ink, weight 600, 52px tall, square, no border; label above at label size, 700.
- **Focus:** the global 3px focus outline.
- **Error:** 2px error outline at 0 offset plus a 700-weight error line.
- **Stepper:** a sky bar (52px, min 156px) with two 52px press buttons and a tabular lead-size count; disabled buttons drop to 35% opacity.

### Navigation
- **Header:** sticky sky bar, logo and wordmark left, label-size links with a 2px underline that draws from the left on hover and stays on the current page, icon tools, compact sun button.
- **Mobile:** a full-screen sun panel that drops in by clip, with headline-size 112% links rising in order.
- **Footer menu:** title-size 112% links on sun; hover slides the link 12px and dims its siblings to 50%.

### Gallery
One 4:5 frame on lake; pictures cross-fade over 600ms inside it. Below: a title-size count ("1 sur 6", current number in 900), a caption, and two 52px square night controls (hover to paper).

### FAQ Accordion
Native details. Questions at lead size 800 with a drawn chevron that turns over 240ms; answers in soft slate at 52ch; height animates where `interpolate-size` is supported. No dividers between items.

### Poster Hero (signature)
A sky stage pinned for one viewport of scroll: the h1 at top left, a 4:5 window right of centre (centred on mobile), the real contour map over the sky with the lake band below, holding lede, three fact slots and the actions. On scroll the window's clip opens to full-bleed (GSAP ScrollTrigger scrub over 0.95 viewport). On load, title lines rise from masks in sequence, the picture settles from 1.1 scale and the map fades in from 1.06. While the window opens, the map zooms to 1.12 around the Baratier pin.

### Motion grammar
Easing is expo-out for arrivals (`cubic-bezier(0.16, 1, 0.3, 1)`), out for UI (`0.22, 1, 0.36, 1`) and in-out for panels. Durations: press 140ms, hover 180ms, UI 240ms. Entrances: the parts of a group rise 24px into place in reading order, once (0.9s, 80ms stagger). Shutters: photographs open from their lower edge while settling from 1.12 scale. Drift: large photographs travel a few percent inside their frames on scroll. Content is visible without scripts; under reduced motion all animation collapses, the hero is unpinned and Lenis smooth scroll is off (also off on coarse pointers).

## Do's and Don'ts

### Do:
- **Do** build every section on one field (sky, lake, sun, paper, night) with that field's ink.
- **Do** make the thing to press a sun-yellow square rectangle with navy ink, 52px tall.
- **Do** set poster titles in Archivo 900 at 112% width with tight negative tracking, and everything else at normal width.
- **Do** let fields meet at straight edges; texture a colour panel only with a faint crop of the real map.
- **Do** give outings fixed slots (duration, age, price) in the same order every time.
- **Do** re-ink, not redesign, for night mode: same variables, same layout, sun stays the action.
- **Do** honour reduced motion: content already in place, hero unpinned.

### Don't:
- **Don't** use gradients, including on photo overlays.
- **Don't** use shadows at rest or on hover; depth is overlap and field contrast.
- **Don't** round any corner.
- **Don't** draw hairlines, borders or dividers; separate with fields and space.
- **Don't** put eyebrows or kickers above headings.
- **Don't** number sections or items with index numerals (01, 02...). Counts like "1 sur 6" are fine.
- **Don't** introduce a monospace or a second family.
- **Don't** draw shapes other than the real map, and never bring back drawn mountain triangles.
