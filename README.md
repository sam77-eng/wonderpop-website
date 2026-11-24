# Wonderpop – Where brands become wonders ✨

A premium, international-standard (USA agency grade) 3D animated website for **Wonderpop**, a next-generation digital studio uniting technology, design, and marketing under one roof.

Built with **React, TypeScript, Vite, Tailwind CSS, Three.js, GSAP, Lenis, and Framer Motion**.

---

## 🎨 Brand Identity

- **Name**: Wonderpop
- **Official Logos**:
  - Wordmark: Italic script `Wonderpop` (`wonderpop-wordmark.jpg`) with coral swoosh underline and purple dot
  - App Icon: Purple rounded square with white script `W` and coral dot (`wonderpop-icon.jpg`)
- **Brand Colors**:
  - Purple: `#4B2DB8`
  - Deep Navy: `#14102A`
  - Ink Navy: `#221A5C`
  - Coral: `#FF6B4A`
  - Lavender White: `#FAF7FE`
  - Accents: Teal `#2EC4B6`, Yellow `#FFD23F`, Pink `#FF9BD0`, Lime `#C6F24E`
  - Dark Mode: Dark Navy `#0D0924`, Card `#1A1438`, Border `#2D235C`
- **Typography**: Sora (Google Fonts)
- **Theme**: Full support for both Light and Dark modes with automatic system detection & smooth toggle

---

## 🚀 Website Flow (9 Sections)

1. **Intro Loader**: Dark navy fullscreen loader. Wonderpop app icon pops in with a scale/rotate spring and purple glow, accompanied by letter-spaced `WONDERPOP` text. Zooms and fades out after ~2.4s to reveal the website with scroll unlock.
2. **Hero**: Light lavender ambient background. Big Wonderpop wordmark logo revealed left-to-right with a handwriting sweep. Large headline *"Where brands become wonders."* with dual CTAs (*"Explore services"* and *"Meet the founders"*). Interactive floating 3D brand shapes on left and right with mouse and mobile tilt parallax. Minimal sticky navbar with app icon and *"Let's talk"* button.
3. **Marquee**: Coral infinite scrolling strip (*Technology ★ Web ★ Apps ★ Branding ★ Meta Ads ★ Google Ads ★ Video ★ Content ★*).
4. **About Statement**: Kinetic typography where each word lights up in sync with scroll progress: *"We design, build and market digital experiences that make people stop scrolling. From first idea to launch day and beyond, Wonderpop turns ambitious brands into unforgettable ones."*
5. **Services (Pinned Sticky 3D Showcase)**: Sticky fullscreen presentation. As the user scrolls, services reveal one-by-one with blur-in and slide-up text transitions, step counter `01 / 14`, interactive navigation pills, and a bottom progress bar. On the right, custom procedural low-poly 3D models morph with scale/rotation springs, color shifts, metallic materials, and wireframe auras.
   - 01. Technology Solutions
   - 02. Web Design
   - 03. Web Development
   - 04. App Development
   - 05. Full-Stack Development
   - 06. UI/UX Design
   - 07. Graphic Design
   - 08. Social Media Management
   - 09. Meta Ads
   - 10. Google Ads
   - 11. Branding
   - 12. Video Editing
   - 13. Photography & Shoots
   - 14. Content Creation
6. **Why Wonderpop / Stats**: *"Built to a global standard."* Four animated counter cards: *14 Services*, *2 Founders*, *1 Creative Team*, *100% Custom Built*, plus 4 capability pillars.
7. **Founders**: *"Meet the founders"*. Two big cards facing each other (Vamshi Jurru on the left, Sam Bhukya on the right) with continuous desynchronized floating levitation physics and a central floating sparkle. Friendly animated cartoon SVG avatars with blinking eyes and waving hands, floating stickers, plus direct WhatsApp and Call buttons:
   - **Vamshi Jurru**, Co-Founder: +91 95027 59517 | `vamshijurru24@gmail.com`
   - **Sam Bhukya**, Co-Founder: +91 99592 00960 | `shyambhukya17@gmail.com`
8. **Contact CTA**: Vibrant purple-to-coral gradient panel with floating emojis (🚀, 💡, 🎨, 📈), *"Let's build something wonderful."* heading, quick WhatsApp chat buttons, and an interactive contact form opening an email draft to both founders simultaneously with confetti celebration.
9. **Footer**: Official Wonderpop wordmark logo, navigation links, both founders' contact info, social placeholders, and copyright notice.

---

## ⚡ Performance & Mobile First

- Target 60fps on mobile with hardware-accelerated transforms
- Pixel ratio capped at `Math.min(window.devicePixelRatio, 2)`
- Off-screen 3D canvases pause rendering via `IntersectionObserver`
- Silky Lenis smooth scrolling with wheel and touch support
- Respects `prefers-reduced-motion` for accessibility
- Safe-area insets padding for modern notched devices
- Custom luxury cursor enabled on desktop and hidden on touch devices

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + PostCSS + Autoprefixer
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Smooth Scroll**: Lenis
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide React
- **Celebration**: Canvas Confetti

---

## 📦 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🌐 Deployment

### Deploy to Vercel
1. Push this repository to GitHub/GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Click **Deploy**.

### Deploy to Netlify
1. Connect this repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Click **Deploy Site**.

---

© 2026 Wonderpop. All rights reserved.
