# 🚗 My Car Value API

A RESTful API built with [NestJS](https://nestjs.com/) that allows users to estimate car values, create and manage reports, and explore documentation via Swagger.

---

## 📚 Features

- 🧮 Get car values based on make, model, year, mileage, and location.
- 👤 User authentication (register, login, sessions).
- 🧾 Manage car reports (create, read, update, delete).
- 🛡️ Guards and interceptors for role-based access control.
- 📘 Auto-generated API documentation using **Swagger** (`/api/docs`).
- 🖥️ Welcome HTML page for visitors at `/`.
- 💾 Database powered by **Prisma** and **mongodb** .

---

## 🛠️ Tech Stack

| Layer             | Technology                       |
| ----------------- | -------------------------------- |
| Backend Framework | [NestJS](https://nestjs.com/)    |
| ORM               | [Prisma](https://www.prisma.io/) |
| Database          | MongoDB                          |
| Auth              | Cookie-based sessions            |
| API Docs          | Swagger (OpenAPI)                |
| View Engine       | Handlebars (HBS)                 |
| Runtime           | Node.js                          |

---

## ⚙️ Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/OsamaShaker0/my-car-valueAPI.git
cd my-car-value
npm install
```
## Update .env with your database connection for prisma :

DATABASE_URL=ADD_YOUR_DB_CONNECTION_STRING

## add .env.develop file to add app setting :

COOKIE_SECRET=ADD_YOUR_SECRET_KEY



💬 Author

Osama shaker 

📧 osamashaker136@gmail.com

🌐 www.linkedin.com/in/osama-shaker-a91067266

