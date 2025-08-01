# My Reads

A full-stack MERN application that allows users to search, discover, and manage their personal reading lists. Built as a learning project to demonstrate React development skills and modern web technologies.

**Last Updated:** December 14, 2021

## 🚀 Features

- **Book Search**: Search for books using the Open Library API
- **User Authentication**: Secure registration and login with JWT tokens and Google OAuth
- **Personal Reading Lists**: Organize books into different categories (Want to Read, Currently Reading, Read)
- **Responsive Design**: Mobile-first design built with Tailwind CSS
- **Real-time Updates**: Context API for global state management
- **User Profile Management**: Personalized user experience

## 🛠️ Tech Stack

### Frontend

- **React** (v17.0.2) - UI framework
- **React Router** (v6.0.2) - Client-side routing
- **Tailwind CSS** (v2.2.19) - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Toastify** - Notification system
- **Firebase** (v9.6.1) - Google OAuth authentication

### Backend

- **Node.js** & **Express.js** - Server framework
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Joi** - Data validation

### External APIs

- **Open Library API** - Book search and metadata

## 📁 Project Structure

```
my-reads/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Global state management
│   │   ├── services/       # API services
│   │   └── assets/         # Styles and images
│   └── public/             # Static assets
├── config/                 # Database configuration
├── controllers/            # Route handlers
├── middleware/             # Authentication middleware
├── models/                 # MongoDB schemas
├── routes/                 # API routes
└── server.js              # Express server entry point
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js v16.13.0
- npm v8.1.0
- MongoDB Atlas account
- Firebase project (for Google OAuth)

### Environment Variables

Create a `config/config.env` file with:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Installation

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

### Development

```bash
# Run both server and client concurrently
npm run dev

# Or run separately
npm run server  # Backend only
npm run client  # Frontend only
```

## 🎯 Purpose

This project was created as a learning exercise to:

- Master full-stack MERN development
- Implement modern React patterns and hooks
- Practice RESTful API design
- Demonstrate authentication and authorization
- Showcase responsive UI/UX design skills

The application serves as a portfolio piece demonstrating proficiency in React and modern web development practices.

## 📝 License

This project is for educational and demonstration purposes only. Not intended for commercial use.
