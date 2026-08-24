<div align="center">
  <h1>🌍 CivicLoop</h1>
  <p><strong>Modernizing Municipal Waste Management and Civic Engagement with AI</strong></p>
  
  [![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vitejs.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg)](https://nodejs.org/)
  [![Turso](https://img.shields.io/badge/Turso-LibSQL-4EAA25.svg)](https://turso.tech/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748.svg)](https://www.prisma.io/)
</div>

---

## 📖 Comprehensive Overview

**CivicLoop** is a production-grade, AI-driven platform engineered to seamlessly bridge the gap between citizens, municipal waste collection workers, and city administrators. By leveraging the latest in front-end performance (React 19 + Vite) and scalable backend architecture (Node.js + Prisma + Turso DB), CivicLoop digitizes and gamifies the waste lifecycle.

The platform provides a highly polished, Apple-inspired cinematic user experience, doing away with sterile, traditional municipal portals. With micro-interactions powered by Framer Motion and GSAP, every touchpoint feels fluid, responsive, and engaging.

---

## 🏗️ Core Portals & Page Architecture

### 1. Citizen Portal 🚀
A fully gamified environmental footprint tracker aimed at encouraging civic participation and recycling.
- **`EcoImpactPage.tsx`**: A visually stunning dashboard where citizens track their carbon offset, recycling volume, and community rank.
- **`ReportWastePage.tsx` & `ClassifyWastePage.tsx`**: Upload a photo of uncollected waste or recyclable items; Google Gemini AI analyzes the image, determines the category (Plastic, Organic, Glass, e-Waste), and assigns a confidence score.
- **`GreenPointsPage.tsx`**: Tracks the `civicCredits` earned by citizens for successful reports and verifications, driving an internal micro-economy.
- **`CollectionPointsPage.tsx` & `PickupSchedulePage.tsx`**: Real-time maps and schedules of active municipal disposal locations.

### 2. Admin Portal 👨‍💼
The command center for city planners and operational managers, featuring high-fidelity modal workflows.
- **`CityIntelligencePage.tsx`**: A top-level macro-view utilizing Recharts to map recycling density, common waste categories, and real-time operational efficiency.
- **`AdminVehicleRegistryPage.tsx`**: A cinematic CRUD interface for managing the fleet, assigning drivers, and tracking vehicle capacity and status (Active, Idle, Maintenance).
- **`AdminRewardsPage.tsx`**: Allows admins to configure partner rewards, setting `creditsRequired` and managing available stock.
- **`AdminVerificationsPage.tsx` & `AdminTicketsPage.tsx`**: Review and verify citizen waste reports, triggering civic credit disbursements via the Transaction ledger.

### 3. Worker Portal 🚛
Designed for the mobile-first needs of field drivers, focusing on efficiency and navigation.
- **`SmartRouteOptimizerPage.tsx` & `WorkerVehicleNavigationPage.tsx`**: Dynamic pathfinding interfaces that re-route drivers based on high-priority incoming reports and vehicle capacity.
- **`WorkerTasksPage.tsx`**: A streamlined task list representing `Report` records marked as `ASSIGNED` or `EN_ROUTE`.
- **`WorkerPerformancePage.tsx`**: Visualizes personal metrics like tons collected and routes completed.

---

## 🗄️ Database Schema & Data Models (Prisma)

The backend is built on a highly relational SQLite schema (migrated to Turso for edge availability), centered around the following core models:

1. **`User`**: Tracks `CITIZEN`, `WORKER`, and `ADMIN` roles. Maintains `civicCredits` and relationships to both reports made (as citizens) and tasks assigned (as workers).
2. **`Report`**: The central operational unit. Contains coordinates (`latitude`, `longitude`), `imageUrl`, AI metadata (`category`, `aiConfidence`), and state-machine statuses (`REPORTED`, `EN_ROUTE`, `COMPLETED`, `VERIFIED`).
3. **`Vehicle`**: Represents the fleet. Maintains current `capacity`, operational `status`, and active `driverId`.
4. **`Reward` & `Transaction`**: The dual pillars of the gamified economy. `Transaction` acts as an immutable ledger for `civicCredits` earned and spent on `Reward` items.
5. **`CollectionPoint`**: Geo-spatial nodes detailing opening hours, accepted waste categories (stored as JSON), and capacities.
6. **`AuditLog`**: Compliance tracking for administrative actions and system-level mutations.

---

## 🧠 AI Integration Mechanics

CivicLoop incorporates **Google Generative AI (Gemini)** directly into the submission pipeline.
- When a `Report` is created via `ClassifyWastePage.tsx`, the base64 image or description is sent to the Express API.
- The Node.js controller prompts Gemini to identify the primary material.
- The response populates the `category` (e.g., `E-Waste`, `Plastic`) and the `aiConfidence` float value.
- If `aiConfidence` is extremely high, the system can auto-verify the report for immediate civic credit disbursement; otherwise, it falls into the `AdminVerificationsPage.tsx` queue.

---

## 🛠️ Technology Stack Breakdown

### Frontend Engine
- **Core:** React 19, TypeScript, Vite 8
- **Styling Architecture:** Tailwind CSS, `class-variance-authority`, `tailwind-merge` for scalable, collision-free utility classes.
- **UI Primitives:** Shadcn UI combined with Radix UI for accessible, unstyled foundational components. Vaul is used for highly polished, mobile-friendly bottom-sheet modals.
- **Animation Frameworks:** Framer Motion for component-level orchestrations; GSAP + `tw-animate-css` for scroll-driven, cinematic storytelling elements (e.g., the 100-frame 3D truck animation on `HomePage.tsx`).
- **State & Data:** Zustand for localized state stores, `@tanstack/react-query` for server-state synchronization and caching, Axios for robust HTTP requests.

### Backend Engine
- **Server:** Node.js, Express 5, TypeScript (`tsx` for seamless dev execution without separate build steps).
- **ORM:** Prisma v6 with `@prisma/adapter-libsql` tailored for distributed SQLite environments.
- **Database Environments:** Local file-based SQLite (`dev.db`) for isolated development; Turso (LibSQL) for high-availability production deployment.
- **Security & Auth:** `bcryptjs` for password hashing, `jsonwebtoken` for stateless auth, `helmet` & `cors` for header security, `express-rate-limit` to prevent abuse.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- Docker (optional, for containerized running)
- Turso CLI (optional, if interacting directly with the Turso DB)

### 1. Repository Setup
```bash
git clone <repository-url>
cd civicloop
```

### 2. Environment Configuration
Create a `.env` file in the `backend` directory:
```bash
cd backend
touch .env
```
Add the following keys to your `.env`:
```env
# Local SQLite for dev. Comment this out to use Turso in Production.
# DATABASE_URL="file:./dev.db"

# Turso DB Configuration (Production)
# TURSO_DATABASE_URL="libsql://your-turso-db-url.turso.io"
# TURSO_AUTH_TOKEN="your-turso-auth-token"

# JWT Encryption Key
JWT_SECRET="civicloop-super-secret"

# Google Generative AI (Required for Waste Classification)
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Backend Initialization
```bash
npm install

# Push the Prisma schema to your active database provider
npx prisma db push

# (Optional) Hydrate the database with mock data for testing
npx tsx src/seed.ts

# Start the Express server with live-reloading
npm run dev
```
The API is now listening at `http://localhost:3000`.

### 4. Frontend Initialization
```bash
cd ../frontend
npm install

# Start the Vite development server
npm run dev
```
Navigate to `http://localhost:5173` to view the application. The frontend automatically targets `http://localhost:3000/api` via Vite's proxy or `.env` configuration.

---

## 🐳 Docker Architecture

The project includes a robust `docker-compose.yml` for unified deployment:
```bash
docker-compose up --build
```
- The backend API binds to `localhost:3000` and mounts a volume (`backend_data`) to persist the SQLite `prisma` directory.
- The frontend builds statically and binds to `localhost:80`.
- Environment variables (`PORT`, `VITE_API_URL`, `JWT_SECRET`) are seamlessly injected during orchestration.

---

## 🔮 Roadmap & Future Enhancements
1. **IoT Fleet Integration:** Upgrading the `Vehicle` model to ingest real-time MQTT telemetry from physical garbage trucks.
2. **Blockchain Ledger:** Moving the `Transaction` table for `civicCredits` to a layer-2 smart contract for decentralized transparency.
3. **PWA Support:** Upgrading the Vite build to output a Progressive Web App for fully offline capabilities in the Worker Portal.

---

<div align="center">
  <i>Empowering citizens. Optimizing operations. Cleaning our cities.</i>
</div>
