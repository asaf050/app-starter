# NP React Starter

A boilerplate React application for building NP (Next Plus) MES plugins using Vite and the NP App SDK.

## Overview

This starter template provides a foundation for creating React-based applications that run within NP MES as iframe plugins. It demonstrates how to:

- Initialize and communicate with NP MES using the `@nextplus/app-sdk`
- Fetch data from NP services (e.g., WorkorderService)
- Handle user authentication and display user information
- Build modern React components with Vite's fast development experience

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm or yarn
- NP MES environment for testing

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

1. Start the development server:

```bash
npm run dev
```

2. In another terminal, expose the local server:

```bash
npm run expose
```

3. Copy the ngrok URL from the second terminal and paste it into the NP plugin preview page.

### Available Scripts

- `npm run dev` - Start development server on port 8301
- `npm run expose` - Expose local server via ngrok for NP integration
- `npm run stop` - Kill the development server running on port 8301
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## AI Development

When using AI tools for writing apps, it is recommended to attach `llm.md` as context. This file contains:

- Information about the NP MES iframe environment
- SDK communication patterns
- Entity types and method documentation
- LoopBack 3 filter examples and query syntax

## Project Structure

```
src/
  ├── App.jsx          # Main application component
  ├── App.css          # Application styles
  ├── main.jsx         # Application entry point
  └── assets/          # Static assets (logos, images)
```

## NP SDK Usage

The starter demonstrates key SDK patterns:

### Initialization

```javascript
const clientRef = useRef(null);

useEffect(() => {
  if (!clientRef.current) {
    clientRef.current = new NextPlusClient();
  }

  // Wait for SDK to be ready
  await clientRef.current.waitForReady();
}, []);
```

### User Information

```javascript
const user = clientRef.current.getCurrentUser();
```

### Service Calls

```javascript
const workorders = await clientRef.current.services.WorkorderService.find({
  filter: {
    where: {
      /* LoopBack 3 where conditions */
    },
    fields: {
      /* fields to return */
    },
    limit: 10,
    sort: { created: 1 },
  },
});
```

## LoopBack 3 Filters

The NP services use LoopBack 3 query syntax. Common filter patterns:

```javascript
// Basic where clause
where: { status: 'active' }

// Operators
where: { quantity: { gt: 10 } }

// OR conditions
where: {
  or: [
    { workorderNumber: { like: "SC23000613" } },
    { workorderNumber: { like: "ADR.*" } }
  ]
}

// Field selection
fields: { id: 1, workorderNumber: 1, quantity: 1 }
```

## Deployment

1. Build the application:

```bash
npm run build
```

2. The `dist/` folder contains the production build ready for deployment.

3. Configure your NP plugin to point to the deployed application URL.

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **NP App SDK** - Communication with NP MES
- **ESLint** - Code linting
