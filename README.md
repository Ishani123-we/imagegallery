# Pastel Polaroid Stories

Built an aesthetic image gallery website using ONLY plain HTML, CSS, and vanilla JavaScript (no React, no frameworks, no Tailwind). Three files: index.html, style.css, script.js.

Aesthetic: "Dreamy film diary". Warm cream background (#faf5ee) with a subtle grain texture, soft pastel accents (dusty rose, sage, lavender), elegant typography (Playfair Display for headings, DM Sans for body). Images look like polaroids: white borders, a slight random rotation, soft drop shadows, and a handwritten-style caption (Caveat font) below each one.

Features:

1. Masonry-style responsive grid of 12 images (Unsplash URLs: nature, sunsets, cafes, flowers, travel).

2. Category filter pills (All, Nature, Travel, Cozy, Flowers) with a smooth fade and rearrange animation. The active pill has a soft filled style.

3. Hover: the polaroid straightens, lifts, and scales slightly, with a gentle glow, all with 0.4s ease transitions.

4. Lightbox: a blurred, dimmed backdrop, the enlarged image with caption, a counter (3 / 12), Next/Prev arrows, a close button, plus keyboard support (←, →, Esc) and click-outside to close.

5. Fade-in on scroll for gallery items.

6. Fully responsive (4 columns desktop, 2 tablet, 1 mobile).

Add clear comments in the code.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pastel-polaroid-stories.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/442ac6a2-7b0c-4304-8043-3f91742967c2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
