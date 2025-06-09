# Shipping Management System

A React-based shipping management system with role-based access control for Admins, Merchants, and Couriers.

## Features

- Role-based authentication and authorization
- Separate dashboards for Admin, Merchant, and Courier
- Shipment tracking and management
- User management
- Responsive design with Tailwind CSS
- Modern UI with Material-UI components

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Material-UI
- Firebase (prepared for integration)
- Axios for API calls

## Prerequisites

- Node.js 16.x or later
- npm 8.x or later

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd shipping-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
/src
├── assets/         # Static files
├── components/     # Reusable UI components
├── layouts/        # Layout components for different roles
├── pages/         # Public pages (login, register)
├── routes/        # Route configurations
├── roles/         # Role-specific components
├── services/      # API services
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
└── utils/         # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Test Credentials

For testing purposes, use these email patterns:
- Admin: `admin@example.com`
- Merchant: `merchant@example.com`
- Courier: `courier@example.com`

(Password can be anything in development mode)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT 