[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19920872&assignment_repo_type=AssignmentRepo)
# Real-Time Chat Application with Socket.io

This assignment focuses on building a real-time chat application using Socket.io, implementing bidirectional communication between clients and server.

## Assignment Overview

You will build a chat application with the following features:
1. Real-time messaging using Socket.io
2. User authentication and presence
3. Multiple chat rooms or private messaging
4. Real-time notifications
5. Advanced features like typing indicators and read receipts

## Project Structure

```
socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Socket event handlers
│   ├── models/             # Data models
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week5-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week5-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Socket.io configuration templates
  - Sample components for the chat interface

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser
- Basic understanding of React and Express

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement the core chat functionality
3. Add at least 3 advanced features
4. Document your setup process and features in the README.md
5. Include screenshots or GIFs of your working application
6. Optional: Deploy your application and add the URLs to your README.md

   
# 💬 Real-Time Chat App

A full-stack real-time chat application built with **React**, **Node.js**, **Express**, and **Socket.io**. This app allows users to join global or private chat rooms, send messages instantly, receive real-time notifications, and view typing indicators, online statuses, and more.

---

## 🚀 Features

### ✅ Core Chat Features
- User login (username-based or JWT)
- Global chat room for all users
- Real-time messaging with timestamps
- Typing indicators
- Online/offline user status

### 🔐 Advanced Features
- Private 1-on-1 messaging
- Multiple chat rooms/channels
- File and image sharing
- Read receipts
- Message reactions (❤️ 😂 👍)

### 🔔 Real-Time Notifications
- New message alerts
- User join/leave notifications
- Unread message counts
- Sound & browser notifications (Web Notifications API)

### ⚙️ Performance & UX
- Message pagination (load older messages)
- Reconnection logic on disconnection
- Socket.io optimization (namespaces, rooms)
- Message delivery acknowledgment
- Responsive UI (mobile + desktop)
- Message search functionality

---

## 📁 Project Structure

```

chat-app/
├── client/                # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── server/                # Node.js + Express backend
│   ├── controllers/
│   ├── sockets/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore


## 🛠️ Getting Started

### 1. Prerequisites
- Node.js v18+ installed
- npm or yarn

### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
````

### 3. Install Server Dependencies

```bash
cd server
npm install
npm run dev


### 4. Install Client Dependencies

```bash
cd ../client
npm install
npm run dev


## 🌐 Technologies Used

* **Frontend:** React, Tailwind CSS, Socket.io-client
* **Backend:** Node.js, Express, Socket.io, JWT
* **Others:** Web Notifications API, UUID, Multer (for file uploads), Moment.js


## 🧪 Expected Outcome

✅ A fully functional real-time chat application
✅ Smooth bidirectional communication using Socket.io
✅ Responsive design for desktop and mobile
✅ Implementation of at least 3 advanced features

## 📸 Screenshots (Coming Soon)

*Global Chat UI*
*Private Chat UI*
*Typing Indicator and Notification Popups*

## 🙌 Contribution

Feel free to fork this repo and submit pull requests. Open issues for bugs or feature suggestions.

## 💡 Inspiration

Built as a real-time communication project to demonstrate the power of Socket.io, scalable Node.js APIs, and dynamic React frontends.

## Resources

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Building a Chat Application with Socket.io](https://socket.io/get-started/chat) 
