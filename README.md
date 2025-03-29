# DevMatch

A full-stack application that simulates a real-world matching platform, helping developers and project owners connect through a clean swipe-based interface. Inspired by common interactions in dating-style apps, the goal is to demonstrate full-stack capabilities including authentication, user flow, and modular structure.

---

## Features

1. **Landing & Authentication**
   - Landing page with a clean design and buttons for login or sign-up.
   - Sign-up and login available via Google OAuth or regular email/password.
   - Users who forgot their password can request a reset link via email and update their password securely.
   - After signing up, users can upload a profile image or skip this step.

2. **Main Interface**
   - Swipe-based interface (left/right) for browsing through user posts.
   - Future plan: swiping right will store liked post IDs in the database and prevent duplicate appearance.

3. **Profile Management**
   - View and update profile information.
   - Edit name, email, password, and delete account.
   - Upload a profile picture (or skip).
   - Logout functionality included.

---

## Technologies Used

### Frontend:
- **React + TypeScript** for building the UI.
- **TailwindCSS** for styling.
- **React Router** for routing.
- **Axios** for HTTP requests.
- **Notyf** for notifications.

### Backend:
- **Node.js & Express** for server-side logic.
- **MongoDB with Mongoose** for database.

### Authentication & Security:
- **Google OAuth** for social login.
- **JWT** for secure token-based authentication.
- **DotENV** for managing environment variables.
- **CORS** for cross-origin access.
- **Bcrypt** for password hashing.

---

## Project Structure

```
Root Directory
│
├── frontend
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── pages/
│       ├── components/
│       └── utils/
│
└── backend
    ├── .env.example
    ├── package.json
    └── src/
        ├── index.js
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        └── utils/
```

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devmatch.git
```

2. Navigate to your project folder:
```bash
cd path/to/your/project
```

3. Install dependencies **from the root project folder** (the one containing both `frontend/` and `backend/`):
```bash
npm install
```
This will install dependencies for both the frontend and backend using `npm-run-all`, without needing to run `npm install` separately in each subfolder.

4. Set up environment variables:
- Each part of the project (both `frontend/` and `backend/`) requires its **own separate** `.env` file.
- Copy the provided `.env.example` in each of them to a new file named `.env`.
- Fill in your own values:

**Backend .env**
```env
PORT=your_port
MongoDB_URL=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

**Frontend .env**
```env
VITE_PORT=your_backend_port
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

5. Run the project **from the root directory**:
```bash
npm run dev
```
This will start both the backend and frontend servers concurrently using `npm-run-all` and `concurrently`.
Make sure to run this command from the **main project folder**, not from the `frontend` or `backend` subfolders.
The frontend output will be shown in blue, and the backend in green.
