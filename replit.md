# Voting Agent Automation Tool

## Overview

This is a full-stack web application built for automating daily voting tasks. The application features a React frontend with a shadcn/ui component library and an Express.js backend, designed to manage usernames and website lists for automated voting processes.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state, local storage hooks for client state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for bundling server code

### Data Storage Solutions
- **Database**: PostgreSQL 16 (configured but not yet implemented)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Local Storage**: Browser localStorage for client-side persistence
- **Session Management**: Configured for PostgreSQL sessions with connect-pg-simple

### Authentication and Authorization
- Basic user schema defined with username/password fields
- Session-based authentication infrastructure prepared
- Currently using in-memory storage implementation

## Key Components

### Client-Side Components
1. **Home Page**: Main interface for username management and website configuration
2. **UI Components**: Comprehensive shadcn/ui component library
3. **Custom Hooks**: 
   - `useLocalStorage`: Persistent client-side state management
   - `useClipboard`: Copy-to-clipboard functionality
   - `useToast`: Custom toast notification system

### Server-Side Components
1. **Storage Interface**: Abstract storage layer with in-memory implementation
2. **Route Registration**: Modular route handling system
3. **Vite Integration**: Development server with HMR support
4. **Error Handling**: Centralized error middleware

### Database Schema
- **Users Table**: ID, username (unique), password fields
- **Migration System**: Drizzle migrations configured for schema changes

## Data Flow

1. **Client Storage**: User preferences and website lists stored in localStorage
2. **API Communication**: TanStack Query handles server communication with proper error handling
3. **Database Layer**: Drizzle ORM provides type-safe database operations
4. **Session Management**: PostgreSQL-backed sessions for user authentication

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with resolvers
- **Utilities**: clsx, date-fns, lucide-react icons

### Backend Dependencies
- **Server Framework**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session Management**: express-session, connect-pg-simple
- **Development Tools**: tsx, esbuild
- **Validation**: Zod with Drizzle integration

### Development Dependencies
- **Build Tools**: Vite, esbuild
- **TypeScript**: Full TypeScript support across frontend and backend
- **Replit Integration**: Cartographer and runtime error overlay plugins

## Deployment Strategy

### Development Environment
- **Replit Configuration**: Node.js 20, PostgreSQL 16 modules
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Port Configuration**: Backend on port 5000, frontend served via Vite

### Production Build
- **Frontend Build**: Vite builds optimized React application
- **Backend Build**: esbuild bundles server code for production
- **Deployment Target**: Autoscale deployment on Replit
- **Static Assets**: Frontend assets served from dist/public

### Database Configuration
- **Environment**: DATABASE_URL environment variable required
- **Migrations**: Drizzle migrations for schema management
- **Connection**: Configured for PostgreSQL with serverless driver

## Changelog

- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.