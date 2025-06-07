# ISOwise - Interactive ISO Standards Learning Platform

## Overview
ISOwise is an interactive web application designed to help users learn and test their knowledge of ISO standards through engaging quizzes. The platform features a modern, user-friendly interface with real-time feedback, scoring system, and progress tracking. Built with Next.js and Tailwind CSS, it provides a seamless learning experience across all devices.

## Key Features
- **Interactive Quizzes**: Dynamic question presentation with immediate feedback
- **Real-time Scoring**: Points system with multipliers for correct answer streaks
- **Progress Tracking**: Monitor your learning journey and improvement
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: Built with accessibility in mind, following WCAG guidelines

## Technology Stack
### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Google Fonts (Poppins, Press Start 2P)

### Development Tools
- Visual Studio Code
- Git & GitHub
- Vercel (Deployment)
- NPM

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version)
- npm

### Steps
1. Clone the repository
```bash
git clone https://github.com/yourusername/isowise.git
cd isowise
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```
Open your browser at http://localhost:3000

## Configuration
- Environment variables can be added in `.env.local` if needed
- Next.js configuration can be modified in `next.config.mjs`
- Tailwind configuration is in `tailwind.config.ts`

## Project Structure
```
src/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── lib/             # Utility functions and helpers
├── types/           # TypeScript type definitions
└── styles/          # Global styles and Tailwind config
```

## Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape this project
