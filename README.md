<div align="center">
  <h1>FYP-CALORIESCARE</h1>
  <p><em>Empower Your Health Journey, One Calorie at a Time</em></p>
  <!-- Tech Stack -->
  <p><strong>Built with:</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socketdotio&logoColor=white" alt="Socket.io" />
    <img src="https://img.shields.io/badge/Mongoose-F04D35?style=flat&logo=Mongoose&logoColor=white" alt="Mongoose" />
    <img src="https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white" alt="npm" />
    <img src="https://img.shields.io/badge/.ENV-ECD53F?style=flat&logo=dotenv&logoColor=black" alt=".ENV" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon" />
    <br />
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat&logo=Stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=ESLint&logoColor=white" alt="ESLint" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white" alt="Axios" />
    <img src="https://img.shields.io/badge/CSS-663399?style=flat&logo=CSS&logoColor=white" alt="CSS" />
    <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  </p>
</div>

---

## 📚 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [License](#license)

---

## 🔍 Overview

**FYP-CaloriesCare** is a powerful full-stack system designed to streamline calorie management and healthy food ordering through an intuitive admin interface.

### 💡 Key Features

- 🍽️ **Dynamic Admin Panel** - Built with React for a fast and smooth experience.
- ⚡ **Real-time Communication** - Socket.io for instant updates and notifications.
- 📊 **Data Visualization** - Integrated Chart.js for visual insights.
- 🔐 **User Authentication** - Secure access with role-based management.
- 🍏 **Food Management System** - Full CRUD functionality for food inventory.
- 📱 **Responsive UI** - Works seamlessly across devices.

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node v22.x.x
- Npm v10.x.x

### 🧩 Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/Panda102903/FYP-CaloriesCare
cd FYP-CaloriesCare
cd frontend || backend || admin
npm install
```

Create .env for `backend`
```bash
JWT_SECRET="random#secret"
STRIPE_SECRET_KEY=YOUR_URL_STRIPE_API
```

### ⚙️ Usage
- Frontend and Admin: Run `npm run dev` to run local server of each source.
- Backend: Run `npm run server` to run backend API. Pls check the port of Backend URL, then update it in `context folder` of `frontend` and `App.jsx` of `admin` to ensure it connect and run.
- Frontend: UI for customer. Customer can view food without login. They need to login to view cart and edit it. User also can checkout and track their order.
- Admin: CRUD for food and Update status for customer order

## 📝 License
This project is for educational purposes only.

Please do not copy the full source code without permission.
