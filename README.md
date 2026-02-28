# QuickHire Frontend

A modern job board application built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/           # Admin pages
│   │   ├── jobs/            # Job pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── admin/           # Admin components
│   │   ├── common/          # Shared components
│   │   ├── home/            # Home page components
│   │   └── jobs/            # Job components
│   ├── services/            # API service layer
│   ├── types/               # TypeScript types
│   └── middleware.ts        # Next.js middleware
├── .env.example
└── package.json
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Installation

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`
3. Run development server: `npm run dev`

## Admin Credentials

- Email: `admin@quickhire.com`
- Password: `admin123`
