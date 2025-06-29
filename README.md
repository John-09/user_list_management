# 🚀 React User Management App

This project is a **React + TypeScript** user management app with **Ant Design**, **Redux Toolkit + Thunk**, and **ReqRes API** integration.  
It features protected routes, reusable components, clean file structure, and a fully responsive UI.

🌐 **Live Demo:** [View on Vercel](https://usermanagement-pearl.vercel.app/)

---

## 📂 Features & Structure

✅ **React + TypeScript + Vite (or CRA)**  
✅ **Ant Design** for all UI components (table, form, modal, pagination, buttons)  
✅ **Redux Toolkit + Thunk middleware** for state management & API handling  
✅ **ReqRes API** integrated for user CRUD (mock API)  
✅ **Protected Routes** using React Router v6 — redirects unauthenticated users  
✅ **Reusable Form Component** that dynamically renders fields and validations  
✅ **File organization**

📁 Constants/ — table columns, form fields, toast utils

📁 Utils/ — helper functions (e.g., filtering users)

📁 Interfaces/ — TypeScript interfaces & types

📁 Store/ — slices (authSlice, userSlice) + store setup with thunk

📁 Pages/ — functional pages (Login, UserList, ErrorPage, Layout)

📁 Components/ — shared components like ReusableForm

✅ **Responsive Design**  
Works across large, medium, and mobile screens (flex/grid + Ant Design breakpoints)

✅ **Error handling**  
User-friendly toast notifications using `react-hot-toast`  
404 Not Found page with link to go back to Users page

## ⚡ How to run locally

1️⃣ Install dependencies
pnpm install

2️⃣ Start the app
pnpm run dev

🔒 Protected Routes
No token → automatic redirect to /login

Logout → clears token + redirect to /login

Auth check implemented via route wrapper

🛠 Main files / logic
Routes: App.tsx
Protected routes, login route, wildcard \* to ErrorPage

Layout: BaseLayout.tsx
Header with user info + logout dropdown + Outlet

Login: Pages/Login/Login.tsx
Uses ReusableForm + Ant Design components

User Management: Pages/UserList/UserList.tsx
Table / Card toggle, search, pagination, modal forms, edit/delete/create

Redux Store: Store/

authSlice.ts — login/logout (token management)

userSlice.ts — fetch, create, edit, delete users (async thunks)

Reusable Form: Components/ReusableForm.tsx
Dynamically renders fields based on config

🌐 Deployment
✅ The app is deployed on Vercel
👉 Live Demo: https://usermanagement-pearl.vercel.app/
