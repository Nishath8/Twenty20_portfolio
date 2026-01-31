# Professional Portfolio Setup

A modern, full-stack portfolio application designed to showcase skills, projects, and professional experience. Built with performance and scalability in mind using the MERN stack.

## 🚀 Features

- **Dynamic Project Showcase**: detailed views for featured projects with tech stacks and links.
- **About Me & Skills**: Professional introduction and categorized skills section.
- **Authentication System**: Secure user registration and login (JWT-based).
- **Responsive Design**: Mobile-first UI built with React and Vite.
- **Modern Styling**: Clean aesthetics using custom CSS/Tailwind.

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- CSS3 / Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT (JSON Web Tokens)
- Bcrypt (Password Hashing)

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

### Backend (`backend/.env`)
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
```

### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:5000/api
```
*(For production, update `VITE_API_BASE_URL` to your deployed backend URL)*

## 📦 Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file with variables above
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    # Open a new terminal
    cd frontend
    npm install
    # Create .env file with variables above
    npm run dev
    ```

4.  **Visit App**
    Open [http://localhost:5173](http://localhost:5173) to view the application.

## 🌐 Live Demo

[Link to Live Demo](https://your-portfolio-url.vercel.app)
