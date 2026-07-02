# Thinkly 🤖

Thinkly is an AI-powered chatbot inspired by ChatGPT that enables users to have intelligent conversations through a clean and modern interface. It supports authentication, chat history management, and AI-generated responses using Google's Gemini API.

## 🚀 Live Demo

🔗 https://thinkly-chat.vercel.app/

## ✨ Features

- User Authentication (Signup/Login)
- Secure JWT-based Authorization
- AI-Powered Responses using Gemini API
- Create and Manage Multiple Chat Threads
- Persistent Chat History with MongoDB
- Markdown Support for Responses
- Syntax Highlighting for Code Blocks
- Responsive and Modern UI
- Real-time Conversation Experience

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS
- React Markdown
- React Hot Toast
- Rehype Highlight

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt.js

### AI Integration
- Google Gemini API

## 📂 Project Structure

```text
Thinkly/
│
├── Frontend/
│   ├── Components
│   ├── Assets
│   ├── Context API
│   └── Styling
│
├── Backend/
│   ├── Models
│   ├── Routes
│   ├── Middleware
│   ├── Utils
│   └── Database Config
│
└── README.md
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/vidushish/Thinkly.git
cd thinkly
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Thinkly_Key=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

Run the frontend:

```bash
npm run dev
```

## 📸 Screenshots

Add screenshots of your application here.

## 🌟 Future Improvements

- Chat Streaming Responses
- Theme Switching (Dark/Light Mode)
- Image Generation Support
- File Upload Support
- Voice Input & Output
- Chat Search Functionality

## 👩‍💻 Author

**Vidushi Sharma**

B.Tech Computer Science Student passionate about Web Development, AI, and Problem Solving.

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
