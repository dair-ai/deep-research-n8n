# Research Assistant - Powered by n8n

## Overview

This is a full-stack web application that serves as an AI-powered research assistant. The application provides a clean, modern interface for users to submit research queries and receive comprehensive insights through an n8n workflow automation system. The frontend is built with React and Vite, while the backend uses Express.js to proxy requests to an external n8n webhook service.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with JSON responses
- **External Integration**: Proxies requests to n8n webhook service
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error middleware with appropriate HTTP status codes

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Type-safe schema definitions in shared directory
- **Migration System**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL (configured but not actively used)

## Key Components

### Frontend Components
1. **SearchForm**: Handles user input with suggestions and loading states
2. **SearchResults**: Displays formatted research results with multiple view modes
3. **ToastNotification**: Provides user feedback for actions and errors
4. **UI Components**: Comprehensive shadcn/ui component library

### Backend Components
1. **Route Handler**: `/api/search` endpoint that validates and proxies requests
2. **Storage Layer**: In-memory storage implementation (prepared for database integration)
3. **Vite Integration**: Development server setup with HMR support

### Shared Components
1. **Schema Definitions**: Zod schemas for type-safe data validation
2. **Type Exports**: Shared TypeScript types between frontend and backend

## Data Flow

1. **User Input**: User submits a research query through the SearchForm component
2. **Client Validation**: Request data is validated using Zod schemas
3. **API Request**: Frontend makes POST request to `/api/search` endpoint
4. **Server Processing**: Express server validates request and forwards to n8n webhook
5. **External Processing**: n8n workflow processes the query and returns research results
6. **Response Handling**: Server returns formatted results to client
7. **UI Update**: Frontend displays results with formatted and raw view options

## External Dependencies

### Production Dependencies
- **UI Framework**: Radix UI components for accessible, unstyled primitives
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Data Fetching**: TanStack Query for server state management
- **Validation**: Zod for runtime type checking and validation
- **Database**: Drizzle ORM with Neon Database serverless driver
- **Forms**: React Hook Form with Zod resolvers
- **Icons**: Lucide React for consistent iconography

### Development Dependencies
- **Build Tools**: Vite with React plugin and TypeScript support
- **Development**: tsx for TypeScript execution and esbuild for production builds
- **Replit Integration**: Custom plugins for development environment integration

### External Services
- **n8n Webhook**: `https://omarsar.app.n8n.cloud/webhook-test/search` for research processing
- **Database**: Neon Database for PostgreSQL hosting (configured via DATABASE_URL)

## Deployment Strategy

### Development
- Uses Vite development server with HMR for frontend
- Express server runs with tsx for TypeScript execution
- Integrated development environment with Replit-specific tooling

### Production Build
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Startup**: Node.js runs the bundled server file
4. **Static Serving**: Express serves built frontend assets in production

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **CORS**: Configured for cross-origin requests during development
- **Logging**: Request/response logging with performance metrics

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```