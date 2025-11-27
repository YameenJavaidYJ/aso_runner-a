# Alain Monorepo

A Turbo monorepo containing:
- **Backend**: NestJS API with BetterAuth and PostgreSQL (Drizzle ORM)
- **Admin**: Next.js 15 admin dashboard
- **Mobile**: React Native mobile application

## Tech Stack

- **Runtime**: Bun
- **Monorepo**: Turbo
- **Backend**: NestJS 10+
- **Frontend**: Next.js 15, React 19
- **Mobile**: React Native 0.76
- **Database**: PostgreSQL with Drizzle ORM (Neon)
- **Authentication**: BetterAuth
- **Language**: TypeScript 5.3+

## Getting Started

### Prerequisites

- Bun >= 1.0.0
- PostgreSQL database (Neon recommended)

### Installation

```bash
# Install dependencies
bun install
```

### Environment Variables

Create `.env` files in the root and each app directory:

**Root `.env`:**
```env
DATABASE_URL=your_neon_postgresql_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3001
```

**apps/admin/.env.local:**
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001
```

**apps/mobile/.env:**
```env
BETTER_AUTH_URL=http://localhost:3001
```

### Development

```bash
# Run all apps in development mode
bun run dev

# Run specific app
turbo run dev --filter=@alain/backend
turbo run dev --filter=@alain/admin
turbo run dev --filter=@alain/mobile
```

### Database Migrations

```bash
# Generate migrations
cd packages/database
bun run db:generate

# Push schema changes
bun run db:push

# Run migrations
bun run db:migrate
```

## Project Structure

```
/
├── apps/
│   ├── backend/          # NestJS API
│   ├── admin/            # Next.js admin dashboard
│   └── mobile/           # React Native app
├── packages/
│   ├── config/           # Shared configs (ESLint, TypeScript)
│   ├── shared/           # Shared types and utilities
│   └── database/         # Drizzle schema and client
└── turbo.json           # Turbo configuration
```

## Scripts

- `bun run dev` - Start all apps in development
- `bun run build` - Build all apps
- `bun run lint` - Lint all packages
- `bun run test` - Run tests
- `bun run format` - Format code with Prettier

## License

Private

