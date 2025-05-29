# 🚀 AATC-RMS — AN INCIDENT AND REPORT MANAGEMENT SYSTEM

**AATC-RMS** is a real-time collaboration platform for academic use, designed for project-based communication between **students** and **supervisors** at Teesside University.

> This is the frontend application built with React, TypeScript, Tailwind CSS, and Vite.

---

## 🛠️ Built With

Frontend stack:

- ![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## ✨ Key Features

- 🔐 File upload and viewing
- 👥 Role-based access (Super-User or Vendor)
- ⚡ OTP verification
- 🧘 Responsive User Interface

---

## ⚙️ How To Run The Project Loaclly

### 1. Clone the repository or download and open the ZIP file

```bash
git clone https://github.com/pentagontechteam/rms.git
cd rms
```

### 2. Install dependencies

```bash
yarn install
```

> Make sure [Yarn](https://classic.yarnpkg.com/en/docs/install) and [Node.js](https://nodejs.org/) (v14 or higher) are installed.

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
VITE_API_URL=https://backend-url
VITE_APP_DOMAIN=https://backend-url
```

> These values are used to communicate with the backend and define the app’s domain origin.

### 4. Start the development server

```bash
yarn dev
```

Visit:  
📍 `http://localhost:3000`

---

## 🧩 Project Structure

```bash
spaces-frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level pages
│   └── utils/           # Utility functions
├── public/              # Static assets
├── .env                 # Environment variables
└── README.md
```

---

## 🧪 Troubleshooting

- Ensure all dependencies are installed (`yarn install`).
- Make sure you're using a compatible Node.js version.
- Double-check the `.env` file values and formatting.
- Confirm that the backend is reachable at `VITE_API_URL`.

---
