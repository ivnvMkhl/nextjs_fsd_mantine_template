# Next.js + FSD + Mantine Template - A starter template for modern web applications

# Next.js + FSD + Mantine Template

Modern Next.js template with Feature-Sliced Design architecture and Mantine UI components.

## Tech Stack

- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[Mantine 8](https://mantine.dev)** - React components library with dark/light theme support
- **[FSD](https://feature-sliced.design)** - Feature-Sliced Design architecture
- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **[ESLint](https://eslint.org)** - Code linting with custom FSD rules

## Features

- ✅ Feature-Sliced Design architecture
- ✅ Mantine UI components with default theme
- ✅ Dark/Light theme toggle with SSR support
- ✅ Responsive header with mobile menu
- ✅ Custom ESLint rules for FSD layer imports
- ✅ TypeScript path aliases for clean imports
- ✅ No hydration issues

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/              # Next.js App Router (pages, layouts)
├── widgets/          # Complex UI blocks (Header)
├── features/         # User interactions (theme-toggle)
├── shared/           # Reusable code (providers, layouts)
└── eslint-rules/     # Custom ESLint rules for FSD
```

### FSD Layer Rules

- **app**: can import any layer
- **widgets**: can import features, shared
- **features**: can import shared only
- **shared**: can import node_modules only

These rules are enforced by custom ESLint plugin.

## Path Aliases

```typescript
@app/*       -> ./src/app/*
@widgets/*   -> ./src/widgets/*
@features/*  -> ./src/features/*
@shared/*    -> ./src/shared/*
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine Documentation](https://mantine.dev)
- [Feature-Sliced Design](https://feature-sliced.design)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
