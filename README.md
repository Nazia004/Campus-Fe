# Campusync — Student Engagement & Placement Platform

Campusync is a professional, role-based platform designed to streamline student engagement, placements, and campus activities. Built with a modern tech stack, it provides a seamless experience for students, faculty, and administrators to manage events, clubs, notifications, and career opportunities.

---

## 🚀 Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Material UI (MUI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Client:** Axios
- **State Management:** React Context API
- **Utilities:** React Router DOM, Cloudinary (for media)

---

## ✨ Key Features

- 🔐 **Role-Based Access Control (RBAC):** Dedicated dashboards for Students, Faculty, and Administrators.
- 💼 **Placement Management:** Track job opportunities, applications, and student placement status.
- 🏢 **Club Management:** Organize and join campus clubs with dedicated management tools.
- 📅 **Event Coordination:** Create, manage, and register for campus events and workshops.
- 🔔 **Real-time Notifications:** Stay updated with important announcements and event alerts.
- 💬 **Messaging System:** Integrated communication channel for students and coordinators.
- 📊 **Dynamic Dashboards:** Data-driven insights and metrics for each user role.
- 🛡️ **Authentication:** Secure login and session management.

---

## 📂 Folder Structure

```text
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, and static files
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context for state management
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Shared page layouts
│   ├── pages/           # Page components (role-based)
│   ├── services/        # API service integrations
│   ├── utils/           # Helper functions and constants
│   ├── App.jsx          # Root component & Routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nazia004/Campus-Fe.git
   cd Campus-Fe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   - Rename `.env.example` to `.env`.
   - Update the variables with your actual credentials.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🖼️ Screenshots

*Add screenshots here once the project is deployed or running.*
> [!TIP]
> Use a tool like [CleanShot](https://cleanshot.com/) or browser dev tools to capture high-quality screenshots for this section.

---

## 🌐 Deployment

The frontend is configured for easy deployment on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Deploy the `dist` folder** to your preferred hosting provider.

---

## 🤝 Contributing

This project was collaboratively developed as a full-stack academic and portfolio project focused on scalable campus management solutions.
---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
