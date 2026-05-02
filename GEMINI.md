# Gemini CLI Instructions - LOP (Logistics Optimization Platform)

This file provides architectural context, development workflows, and system constraints for the LOP project.

## Project Overview
LOP is an **API-first, event-driven logistics platform** designed for high availability and scalability, specifically optimized for the Nigerian market. This repository contains the frontend application, built as a React 19 + Vite 6 app, which serves as a comprehensive dashboard for businesses, logistics providers, and administrators.

- **Primary Mission:** Streamline logistics through intelligent provider matching and real-time tracking.
- **Target Users:** AgriLink platform, e-commerce apps, SMEs, and individual users.
- **AI Integration:** Uses Gemini API for intelligent features (e.g., decision engine orchestration).

## Architecture & Technology Stack

### Frontend
- **Framework:** React 19 (using `BrowserRouter` from `react-router-dom`)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Icons:** Lucide React
- **Animations:** Motion
- **Charts:** Recharts

### Backend (System-wide Architecture)
The frontend interacts with a microservices-based backend:
- **Services:** Delivery Service, Provider Registry, Decision Engine (Python/ML), Tracking Service, Notification Service.
- **Databases:** PostgreSQL (Primary), Redis (Cache), TimescaleDB (Tracking).
- **Communication:** Message Bus (RabbitMQ/AWS SQS) for async events.

### Project Structure
- `src/`: Core application source.
  - `pages/`: Route-specific components (Business, Provider, Admin dashboards, etc.).
  - `components/`: Reusable UI elements (`DashboardLayout`, `Navbar`, `Button`, `Card`).
  - `lib/`: Utility functions.
- `docs/`: Extensive documentation covering business model, architecture, deployment, and legal aspects.
- `AGENTS.md`: Quick-start guide and dev commands.

## Development Guide

### Core Commands
- `npm run dev`: Start development server on port 3000.
- `npm run build`: Build production assets.
- `npm run lint`: Type-check using `tsc --noEmit`.
- `npm run clean`: Remove the `dist` directory.

### Environment Setup
1. Create `.env.local` based on `.env.example`.
2. Add your `GEMINI_API_KEY`.

### Coding Conventions
- **Path Aliases:** Use the `@/` prefix for imports (points to project root).
- **Styling:** Strictly follow Tailwind CSS 4 utility classes.
- **Type Safety:** Ensure all new components and utilities are properly typed with TypeScript.
- **AI Features:** Utilize the `@google/genai` library for AI-integrated features.

## Important Constraints & Quirks
- **HMR (Hot Module Replacement):** HMR is disabled in the `vite.config.ts` when the `DISABLE_HMR` environment variable is set to 'true'. This is to prevent flickering during AI-assisted edits in AI Studio. **Do not modify this setting.**
- **No Test Framework:** Currently, there is no testing framework (like Vitest) configured. If adding critical logic, consider proposing a testing strategy.
- **API Mocking:** Since the backend is a separate microservices architecture, the frontend may use mocked data or point to an external API gateway. Always verify the current connection strategy in `CONNECTIONS.md`.

## Key Documentation
- `docs/technical/architecture.md`: Detailed system design.
- `docs/technical/decision-engine.md`: Optimization and matching logic.
- `NAVIGATION_FLOW.md`: Detailed mapping of user journeys and routes.
- `USER_GUIDE.md`: Quick start guide and feature overview for all personas.
- `LOP_Platform_Functionality_Specification(1).odt`: Comprehensive feature spec.
