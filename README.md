# 🛒 E-Com Cart Application

A **full-stack e-commerce application** with shopping cart functionality, built using **React.js** on the frontend and **Node.js + Express** on the backend.

---

## 🚀 Features

- 🔐 **User Authentication** – Register, login, and logout functionality  
- 📦 **Product Management** – Add, view, update, and delete products  
- 🛒 **Shopping Cart** – Add items to cart, update quantities, and remove items  
- 🖼️ **Image Upload** – Integrated with **Cloudinary** for image hosting  
- 📱 **Responsive Design** – Fully optimized for mobile and desktop  
- 🔒 **JWT Authentication** – Secure token-based login system  

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- ⚛️ **React.js**
- 🔄 **Axios** (for API requests)
- 🏪 **Context API** (state management)
- 🎨 **CSS3** (styling)

### ⚙️ Backend
- 🟢 **Node.js**
- 🚂 **Express.js**
- 🍃 **MongoDB** with **Mongoose**
- 🔑 **JWT** for authentication
- ☁️ **Cloudinary** for image uploads
- 🌐 **CORS** for cross-origin requests

---

## 📁 Project Structure

├── 🎨 frontend/ # React.js frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── context/ # React Context for state management
│ │ ├── api/ # API service functions
│ │ └── utils/ # Utility functions
│ └── package.json
│
├── ⚙️ backend/ # Node.js backend
│ ├── controllers/ # Route controllers
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── middleware/ # Authentication middleware
│ ├── utils/ # Helper utilities
│ └── uploads/ # Local file storage (dev)
│
└── 📖 README.md


---

## 🚀 Quick Start

### 📦 Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas or local MongoDB installation
- Cloudinary account (for image uploads)

---

## ⚙️ Installation

### 📥 Clone the Repository
```bash
git clone <your-repo-url>
cd ecom-cart
🚀 Quick Start
Prerequisites
📦 Node.js (v14 or higher)

🗄️ MongoDB Atlas account or local MongoDB installation

☁️ Cloudinary account (for image uploads)

Installation
📥 Clone the repository

bash
git clone <your-repo-url>
cd ecom-cart
⚙️ Backend Setup

bash
cd backend
npm install
🔧 Environment Variables (Backend)
Create a .env file in the backend directory:

env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
🎨 Frontend Setup

bash
cd ../frontend
npm install
🔧 Environment Variables (Frontend)
Create a .env file in the frontend directory:

env
VITE_API_URL=http://localhost:5000/api
Running the Application
🚀 Start the Backend Server

bash
cd backend
npm run dev
🔗 Server will run on http://localhost:5000

🎨 Start the Frontend Development Server

bash
cd frontend
npm run dev
🔗 Frontend will run on http://localhost:3000

📚 API Endpoints
🔐 Authentication
POST /api/users/register - User registration

POST /api/users/login - User login

POST /api/users/logout - User logout

GET /api/users/profile - Get user profile

📦 Products
GET /api/products - Get all products

GET /api/products/:id - Get single product

POST /api/products - Create new product (protected)

PUT /api/products/:id - Update product (protected)

DELETE /api/products/:id - Delete product (protected)

🛒 Cart
GET /api/cart - Get user cart (protected)

POST /api/cart - Add item to cart (protected)

PUT /api/cart/:id - Update cart item quantity (protected)

DELETE /api/cart/:id - Remove item from cart (protected)

DELETE /api/cart - Clear entire cart (protected)

🔐 Authentication Flow
👤 User registers or logs in

🔑 Backend returns JWT token

💾 Frontend stores token in localStorage

📨 Token is automatically included in subsequent requests via Axios interceptors

🛡️ Protected routes verify the token before processing

🗄️ Database Models
👤 User Model
javascript
{
  name: String,
  email: String,
  password: String (hashed)
}
📦 Product Model
javascript
{
  name: String,
  price: Number,
  imageUrl: String
}
🛒 Cart Model
javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number
  }]
}
🌐 Deployment
⚙️ Backend (Render)
🔗 Connect your GitHub repository to Render

⚙️ Set environment variables in Render dashboard

🚀 Deploy from main branch

🎨 Frontend (Vercel)
🔗 Connect your GitHub repository to Vercel

⚙️ Set environment variables:

env
VITE_API_URL=https://your-render-app.onrender.com/api
🚀 Deploy from main branch

Environment Variables for Production
⚙️ Backend (Render):

env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
FRONTEND_URL=https://your-vercel-app.vercel.app
🎨 Frontend (Vercel):

env
VITE_API_URL=https://your-render-app.onrender.com/api
🐛 Troubleshooting
Common Issues
❌ 401 Unauthorized Errors

✅ Check if JWT token is being sent in Authorization header

✅ Verify token is stored in localStorage after login

✅ Ensure JWT_SECRET is set in environment variables

🌐 CORS Issues

✅ Verify FRONTEND_URL in backend environment variables

✅ Check CORS configuration in server.js

🖼️ Image Upload Issues

✅ Verify Cloudinary credentials

✅ Check file size and format restrictions

🗄️ Database Connection Issues

✅ Verify MONGODB_URI connection string

✅ Check MongoDB Atlas IP whitelist settings

🔧 Debug Mode
Enable detailed logging by adding console logs in:

📨 Axios interceptors (frontend)

🔐 Auth middleware (backend)

🛒 Cart controllers (backend)

🤝 Contributing
🍴 Fork the repository

🌿 Create a feature branch (git checkout -b feature/amazing-feature)

💾 Commit your changes (git commit -m 'Add some amazing feature')

📤 Push to the branch (git push origin feature/amazing-feature)

