# Portfolio

A modern, interactive developer portfolio built with React, TanStack Start, Three.js, Tailwind CSS, and Framer Motion. Features a 3D skills pyramid, animated theme switcher (Cyberpunk / Terminal / AI / Light / Matrix), and immersive scroll experiences.

---

## 🚀 Run Locally

### 1. Prerequisites

Make sure you have these installed:

- **Node.js** ≥ 18 — [download](https://nodejs.org/)
- **Bun** (recommended) or **npm** — [install Bun](https://bun.sh/)
- **Git** — [download](https://git-scm.com/)

### 2. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 3. Install dependencies

Using **Bun** (fastest):

```bash
bun install
```

Or using **npm**:

```bash
npm install
```

### 4. Start the dev server

```bash
bun run dev
# or
npm run dev
```

The app will be running at:

👉 **http://localhost:8080**

(Vite will pick the next available port if 8080 is taken — check your terminal output.)

### 5. Build for production

```bash
bun run build
bun run start
```

---

## 🛠 Tech Stack

- **Framework:** TanStack Start (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4
- **3D / Animation:** Three.js (`@react-three/fiber`, `@react-three/drei`), Framer Motion, GSAP
- **Icons:** lucide-react, react-icons
- **UI Components:** shadcn/ui

---

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/      # Hero, About, Skills, Projects, Contact
│   ├── three/         # 3D scenes (HeroScene, SkillsPyramid)
│   ├── theme/         # Theme provider, switcher, backdrops
│   └── ui/            # shadcn/ui primitives
├── routes/            # File-based routing (TanStack Router)
├── styles.css         # Global styles + theme tokens
└── router.tsx         # Router config
```

---

## 🎨 Themes

Click the floating theme switcher (bottom-right) to swap between:

- 🌌 **Cyberpunk** — neon purple/pink glassmorphism
- 💻 **Terminal** — green-on-black monospace, CRT scanlines
- 🤖 **AI / Future** — deep blue with neural network background
- ⚡ **Light Dev** — clean minimal light mode
- 🔥 **Matrix** — falling green code rain

Your selected theme is saved in `localStorage`.

---

## 📝 Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `bun run dev`     | Start dev server (HMR enabled)    |
| `bun run build`   | Production build                  |
| `bun run start`   | Run production build locally      |
| `bun run lint`    | Lint the codebase                 |

---

## 🤝 Contributing

Pull requests welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

Built with ❤️ on [Lovable](https://lovable.dev).
