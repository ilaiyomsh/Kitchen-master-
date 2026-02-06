# Kitchen Master - Event Hall Ordering System

A real-time web application for managing orders in event halls. Guests scan QR codes at their tables to browse a digital menu and place orders. The kitchen manager sees incoming orders in real-time and can manage statuses, batch orders by table, and coordinate service.

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js, Express, Socket.io, TypeScript |
| **Frontend** | React 18, Vite, Tailwind CSS, TanStack Query, Zustand |
| **Database** | MongoDB with Mongoose |
| **Real-time** | WebSocket via Socket.io (guest + kitchen namespaces) |
| **Validation** | Zod (shared between client and server) |
| **Monorepo** | npm workspaces (`shared/`, `server/`, `client/`) |

## Prerequisites

- **Node.js** >= 18 (20 LTS recommended)
- **MongoDB** >= 6 (7 recommended) — running locally or via Docker
- **npm** >= 9

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd Kitchen-master-
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` if needed. Defaults work out of the box for local development:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Server port |
| `MONGO_URI` | `mongodb://localhost:27017/kitchen-orders` | MongoDB connection string |
| `CLIENT_URL` | `http://localhost:5173` | Frontend origin (CORS) |
| `KITCHEN_PIN` | `1234` | PIN to access the kitchen dashboard |
| `APP_BASE_URL` | `http://localhost:5173` | Base URL encoded in QR codes |

### 3. Start MongoDB

**Option A — Docker (recommended):**

```bash
docker compose up mongodb -d
```

**Option B — Local install:**

Make sure `mongod` is running on port 27017.

### 4. Seed the database

```bash
npm run seed
```

This populates 5 menu categories, 22 menu items, and 15 tables.

### 5. Start the development servers

```bash
npm run dev
```

This runs the backend (port 3001) and frontend (port 5173) concurrently.

You can also run them separately:

```bash
npm run dev:server   # backend only
npm run dev:client   # frontend only
```

### 6. Open the app

| URL | Purpose |
|---|---|
| `http://localhost:5173/kitchen/login` | Kitchen dashboard (PIN: `1234`) |
| `http://localhost:5173/table/<tableId>` | Guest menu (replace `<tableId>` with a MongoDB table ID from the seed) |

To get a table ID, query the API:

```bash
curl http://localhost:3001/api/tables
```

Or generate a QR code:

```bash
curl http://localhost:3001/api/qr/<tableId> --output qr.png
```

## Running with Docker Compose (full stack)

```bash
docker compose up
```

This starts MongoDB and the backend server. The frontend still needs to run separately via `npm run dev:client` (or build it for production).

## Project Structure

```
Kitchen-master-/
├── shared/          # Shared types, Zod schemas, constants
│   └── src/
│       ├── types/           # Order, Table, Menu, Socket event interfaces
│       ├── constants/       # OrderStatus, TableStatus enums
│       └── validation/      # Zod schemas for API payloads
├── server/          # Express + Socket.io backend
│   └── src/
│       ├── config/          # env validation, DB connection
│       ├── models/          # Mongoose schemas (Order, Table, MenuItem, MenuCategory)
│       ├── routes/          # REST endpoints
│       ├── controllers/     # Request handlers
│       ├── services/        # Business logic
│       ├── socket/          # WebSocket namespaces and event handlers
│       ├── middleware/       # Validation, error handling, auth
│       └── seed/            # Database seed script with sample data
├── client/          # React + Vite frontend
│   └── src/
│       ├── pages/           # GuestMenu, GuestOrderStatus, KitchenDashboard, KitchenLogin
│       ├── components/      # ui/, guest/, kitchen/, layout/
│       ├── hooks/           # useMenu, useOrders, useSocket, useTable, etc.
│       ├── stores/          # Zustand stores (cart, kitchen state)
│       ├── config/          # API client, Socket.io client, query client
│       ├── router/          # React Router routes
│       └── utils/           # Formatting, session ID, notification sound
├── docker-compose.yml
├── package.json             # Root workspace config
└── tsconfig.base.json       # Shared TypeScript config
```

## API Overview

### REST Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/menu` | Full menu (categories + items) |
| `POST` | `/api/orders` | Place a new order |
| `GET` | `/api/orders?tableId=X&guestSessionId=Y` | Guest's orders |
| `GET` | `/api/orders/kitchen` | Active orders (kitchen view) |
| `PATCH` | `/api/orders/:id/status` | Update order status |
| `POST` | `/api/orders/batch` | Batch orders for same-trip delivery |
| `GET` | `/api/tables` | List all tables |
| `GET` | `/api/qr/:tableId` | Generate QR code (PNG, SVG, or data URL) |

### WebSocket Events

Two namespaces: `/guest` and `/kitchen`

**Guest → Server:** `guest:join-table`, `guest:place-order`, `guest:call-waiter`

**Server → Guest:** `order:placed`, `order:status-changed`, `order:cancelled`

**Server → Kitchen:** `kitchen:new-order`, `kitchen:order-updated`, `kitchen:table-call`

**Kitchen → Server:** `kitchen:confirm-order`, `kitchen:start-preparing`, `kitchen:mark-ready`, `kitchen:mark-served`, `kitchen:cancel-order`, `kitchen:batch-orders`

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both server and client in dev mode |
| `npm run dev:server` | Start backend only (with nodemon hot-reload) |
| `npm run dev:client` | Start frontend only (Vite HMR) |
| `npm run seed` | Seed database with sample menu and tables |
| `npm run build` | Build all packages for production |
