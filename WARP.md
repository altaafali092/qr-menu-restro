# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Laravel 12 application with React 19 frontend using Inertia.js for seamless SPA-like experience without API complexity. The stack includes TypeScript, Tailwind CSS v4, Radix UI components, and Spatie Laravel Permission for role/permission management.

## Essential Development Commands

### Development Server
```bash
# Start development environment (Laravel + Queue + Vite)
composer dev

# Alternative: Start individual services
php artisan serve                 # Laravel server on :8000
npm run dev                      # Vite dev server with HMR
php artisan queue:listen --tries=1  # Queue worker
```

### Building and Assets
```bash
npm run build                    # Production build
npm run build:ssr               # SSR production build
npm run types                   # TypeScript type checking
```

### Code Quality
```bash
# Backend (Laravel)
vendor/bin/pint                 # Format PHP code (Laravel Pint)
composer test                   # Run Pest test suite
./vendor/bin/pest               # Direct Pest execution
php artisan test               # Alternative test command

# Frontend
npm run lint                    # ESLint with auto-fix
npm run format                  # Prettier formatting
npm run format:check           # Check formatting without changes
```

### Database Operations
```bash
php artisan migrate             # Run migrations
php artisan migrate:fresh --seed  # Fresh database with seeders
php artisan db:seed            # Run seeders only
php artisan make:migration     # Create new migration
```

### Single Test Execution
```bash
# Run specific test file
./vendor/bin/pest tests/Feature/Auth/AuthenticationTest.php

# Run specific test method
./vendor/bin/pest --filter=test_login_screen_can_be_rendered

# Run tests with coverage
./vendor/bin/pest --coverage
```

## Architecture Overview

### Technology Stack
- **Backend**: Laravel 12 (PHP 8.2+) with Inertia.js server-side adapter
- **Frontend**: React 19 with TypeScript in JSX automatic mode
- **Styling**: Tailwind CSS v4 with custom components via Radix UI
- **Build Tool**: Vite 7 with Laravel plugin and React plugin
- **Testing**: Pest (PHP), configured for feature and unit tests
- **Permissions**: Spatie Laravel Permission package

### Request Flow
1. Routes defined in `routes/web.php`, `routes/admin.php`, `routes/auth.php`
2. Controllers return `Inertia::render()` responses with props
3. Vite resolves React pages from `resources/js/pages/**/*.tsx`
4. Components use Inertia's `usePage()` hook to access server data
5. Forms submit via Inertia's `router` methods maintaining SPA experience

### Authentication & Permissions
- Built-in Laravel authentication with Inertia integration
- Spatie Permission package for role/permission management
- Admin routes protected by `auth` and `verified` middleware
- Permission-based UI rendering in React components

## Frontend Architecture

### Directory Structure
```
resources/js/
├── actions/           # Generated Ziggy-like route helpers (if using Wayfinder)
├── components/        # Reusable React components
│   └── ui/           # Radix UI component primitives
├── hooks/            # Custom React hooks (appearance, mobile, etc.)
├── layouts/          # Page layout components
│   ├── app/          # App-specific layouts (sidebar, header)
│   ├── auth/         # Authentication layouts
│   └── settings/     # Settings page layouts
├── lib/              # Utility functions (utils.ts)
├── pages/            # Inertia page components
│   ├── Admin/        # Admin panel pages
│   ├── auth/         # Authentication pages
│   └── settings/     # User settings pages
├── routes/           # Frontend route definitions/helpers
├── types/            # TypeScript type definitions
└── wayfinder/        # Laravel Wayfinder integration
```

### Component Patterns
- UI primitives in `components/ui/` follow Radix UI + Tailwind patterns
- Page components receive props via Inertia and use shared layouts
- Custom hooks manage global state (theme, mobile detection)
- TypeScript path mapping: `@/*` resolves to `resources/js/*`

### Styling Approach
- Tailwind CSS v4 with Vite plugin integration
- Component variants via `class-variance-authority`
- Utility-first CSS with custom component abstractions
- Dark/light theme support via CSS custom properties

## Backend Architecture

### Directory Structure
```
app/
├── Http/
│   ├── Controllers/   # Route controllers (Admin/, Auth/, Settings/)
│   ├── Middleware/    # Custom middleware (HandleInertiaRequests)
│   └── Requests/      # Form request validation classes
├── Models/           # Eloquent models (User, etc.)
└── Providers/        # Service providers
```

### Controller Patterns
- Controllers return `Inertia::render()` with page name and props
- Resource controllers for CRUD operations (PermissionController)
- Form requests handle validation with automatic error passing to frontend
- Success messages via `->with('success', 'message')` flash data

### Database & Models
- SQLite default for development (configured in `.env.example`)
- Spatie Permission models (Role, Permission) integrated
- Migrations in `database/migrations/`
- Model factories for testing in `database/factories/`

## Testing Strategy

### Backend Testing (Pest)
- Test files in `tests/Feature/` and `tests/Unit/`
- Uses in-memory SQLite for fast test execution
- Authentication and feature testing via HTTP tests
- Database refreshed automatically per test

### Test Organization
```
tests/
├── Feature/
│   ├── Admin/         # Admin functionality tests
│   ├── Auth/          # Authentication tests
│   └── Settings/      # User settings tests
└── Unit/              # Unit tests for individual classes
```

### Running Specific Tests
```bash
# Test authentication features
./vendor/bin/pest tests/Feature/Auth/

# Test admin functionality
./vendor/bin/pest tests/Feature/Admin/

# Test with coverage reporting
./vendor/bin/pest --coverage-html=coverage/
```

## Development Patterns

### Adding New Pages
1. Create route in appropriate route file (`routes/admin.php`)
2. Create controller method returning `Inertia::render()`
3. Create React page component in `resources/js/pages/`
4. Add TypeScript types in `resources/js/types/` if needed

### Permission Management
- Permissions managed via Spatie package
- Check permissions in controllers: `$user->can('permission')`
- Frontend permission checks via shared props
- Seed permissions in database seeders

### Component Development
- Extend UI primitives from `components/ui/`
- Use TypeScript interfaces for prop validation
- Follow Radix UI patterns for accessibility
- Implement responsive design with Tailwind utilities

### Form Handling
- Use Laravel Form Request classes for validation
- Inertia automatically handles validation errors
- Frontend forms use `useForm()` hook from Inertia
- Flash messages handled via `usePage().props.flash`

## CI/CD Pipeline

### GitHub Actions
- **Tests**: Runs Pest suite on push/PR to main/develop
- **Linting**: Runs Laravel Pint and npm format/lint
- PHP 8.4 and Node 22 in CI environment
- Builds assets and validates TypeScript compilation

### Code Quality Gates
- Laravel Pint for PHP formatting
- ESLint + Prettier for TypeScript/React
- Pest tests must pass
- TypeScript compilation must succeed

## Troubleshooting

### Common Issues
- **Asset build fails**: Check Node version (requires 22+)
- **Permission errors**: Run `php artisan permission:cache-reset`
- **Vite HMR issues**: Restart `npm run dev`
- **Database issues**: Run `php artisan migrate:fresh --seed`

### Development Environment
- Requires PHP 8.2+, Node 22+, SQLite
- Uses Laravel's built-in server (no Docker/Sail dependency)
- Vite handles asset compilation and HMR
