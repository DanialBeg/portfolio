# 🌟 Danial Beg - Personal Portfolio

A modern, minimalist portfolio website built with React and TypeScript, featuring a starry night background animation.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with CSS Variables for theming
- **Linting**: ESLint with TypeScript support
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint code analysis |
| `npm run preview` | Preview production build locally |

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Profile image and name display
│   ├── Section.tsx          # Reusable content section wrapper
│   ├── SocialLinks.tsx      # Social media links with icons
│   ├── StarryNight.tsx      # Animated starry background
│   └── ThemeToggle.tsx      # Dark/light mode toggle
├── contexts/
│   └── ThemeContext.tsx     # Theme state management
├── App.tsx                  # Main application component
├── App.css                  # Global styles and theme variables
├── main.tsx                 # React app entry point
└── vite-env.d.ts           # Vite type definitions
```

## 📦 Build and Deployment

### Production Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.


**Made with ❤️ by Danial Beg**