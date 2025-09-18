

# Event Management System

A **full-stack Event Management System** built with the **MERN stack** (**MongoDB, Express, React, Node.js**).
Features include:

* User authentication
* Event creation & management
* Event registration
* Dashboards for users
* Responsive UI for seamless event organization

---

## \:rocket: Tech Stack

* **Frontend:**  Vite, JavaScript, Tailwind CSS
* **Backend:** Node.js, Express, MongoDB, Mongoose
* **Authentication:** JWT, bcryptjs
* **Others:** Axios, CORS, dotenv 

---

## \:milky\_way: Backend Setup (Node.js + Express + MongoDB)

1. **Create project folder**

```bash
mkdir backend
cd backend
```

2. **Initialize npm**

```bash
npm init -y
```

3. **Update `package.json`**
   Set `"type": "module"` and add scripts:

```json
"scripts": {
  "start": "nodemon index.js"
}
```

4. **Install dependencies**

```bash
npm install express mongoose dotenv cors morgan bcryptjs jsonwebtoken
npm install --save-dev nodemon eslint prettier
```

5. **Start the server**

```bash
npm start       # production
npm run dev     # development with nodemon
```

> Make sure your backend listens on `process.env.PORT` and you have your MongoDB URI set in `.env`.

---

## \:zap: Frontend Setup (React + Vite + JavaScript + Tailwind)

1. **Scaffold the frontend project**

```bash
npx create-vite react-event-frontend
cd react-event-frontend
npm install
```

2. **Install Tailwind CSS**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure Tailwind**
   Update `tailwind.config.cjs`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. **Add Tailwind directives** to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. **Start frontend development server**

```bash
npm run dev      # dev mode (Vite)
npm run build    # production build
```

> Ensure your **frontend Axios client** points to the correct **backend API URL**.

---

## \:zap: Running Both Backend & Frontend

* **Backend server:** e.g., `localhost:3000`
* **Frontend dev server:** default `localhost:5173`

---

## \:white\_check\_mark: Scripts Overview

**Backend**

| Script        | Description                             |
| ------------- | --------------------------------------- |
| `npm start` | Start server with nodemon (development)   |

**Frontend**

| Script          | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start Vite dev server         |




