# Blinkit - E-commerce Platform

A modern e-commerce platform built with React, Node.js, and MongoDB, featuring a robust frontend and backend architecture.

## 🚀 Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Secure payment processing with Stripe
- Image upload with Cloudinary
- Responsive design with Tailwind CSS
- Real-time notifications
- Infinite scroll for product listings
- Form validation with React Hook Form
- State management with Redux Toolkit

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit for state management
- React Router DOM for routing
- Tailwind CSS for styling
- Axios for API requests
- React Hook Form for form handling
- React Hot Toast for notifications
- React Icons for icons
- React Infinite Scroll Component
- SweetAlert2 for beautiful alerts

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Stripe for payment processing
- Multer for file uploads
- Helmet for security
- Morgan for logging
- Resend for email services

## 📦 Project Structure

```
├── client/                      # Frontend React application
│   ├── src/                    # Source files
│   │   ├── assets/            # Static assets (images, fonts, etc.)
│   │   ├── components/        # Reusable UI components
│   │   ├── common/            # Common utilities and constants
│   │   ├── hooks/             # Custom React hooks
│   │   ├── layout/            # Layout components
│   │   ├── pages/             # Page components
│   │   ├── provider/          # Context providers
│   │   ├── route/             # Route configurations
│   │   ├── store/             # Redux store configuration
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static files
│   └── package.json           # Frontend dependencies
│
└── server/                     # Backend Node.js application
    ├── controllers/           # Route controllers
    ├── models/               # Database models
    ├── routes/               # API routes
    ├── middleware/           # Custom middleware
    ├── utils/                # Utility functions
    ├── db/                   # Database configuration
    ├── server.js             # Main server file
    └── package.json          # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/blinkit.git
cd blinkit
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Install backend dependencies
```bash
cd ../server
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RESEND_API_KEY=your_resend_api_key
```

### Running the Application Locally

1. Start the backend server
```bash
cd server
npm start
```

2. Start the frontend development server
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Deployment

### Backend Deployment (Vercel)

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy the backend
```bash
cd server
vercel
```

4. Configure environment variables in Vercel dashboard

### Frontend Deployment (Vercel)

1. Build the frontend
```bash
cd client
npm run build
```

2. Deploy to Vercel
```bash
vercel
```

3. Configure environment variables in Vercel dashboard

### Database Deployment (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Set up database access (user and password)
4. Set up network access (IP whitelist)
5. Get your connection string and update the MONGODB_URI in your environment variables

### Environment Variables Setup

For both frontend and backend deployments, set up the following environment variables in your hosting platform:

```env
# Backend Environment Variables
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RESEND_API_KEY=your_resend_api_key

# Frontend Environment Variables
VITE_API_URL=your_backend_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 🔧 Development

- Frontend runs on Vite development server
- Backend uses Nodemon for automatic server restart
- ESLint is configured for code quality
- Environment variables are managed through dotenv
- Git hooks for pre-commit linting
- Automated testing setup (Jest + React Testing Library)

## 📝 License

This project is licensed under the ISC License.

## 👥 Author

Sameer Suryawanshi

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 