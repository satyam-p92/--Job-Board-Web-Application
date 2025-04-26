# 💼 Job Board Web Application

A full-stack web application where employers can post jobs and job seekers can browse and apply for them.

## 🚀 Features

- 👨‍💼 Employer & 👩‍💻 Job Seeker login/signup (role-based)
- 📋 Job listings with filters (title, location, category)
- 📂 Application system with form submission
- 🔐 JWT authentication
- 📊 Admin panel to manage users and jobs
- 📱 Responsive design using Tailwind CSS

## 🛠 Tech Stack

**Frontend:**
- React.js
- Axios
- React Router
- Tailwind CSS

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for auth
- bcrypt for hashing
- Multer for file upload (optional)

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📂 Folder Structure


## ⚙️ How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/job-board-app.git
cd job-board-app

2. Setup BACKEND
cd server
npm install
touch .env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

npm start

3. Setup Frontend
cd ../client
npm install
npm start



![Screenshot 2025-04-26 154230](https://github.com/user-attachments/assets/1786978e-2bc9-4ec0-ac60-ad6e955e74f7)
![Screenshot 2025-04-26 154315](https://github.com/user-attachments/assets/e030e18b-692c-4f33-a9de-463522b9af86)
