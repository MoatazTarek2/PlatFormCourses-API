# 🚀 Platform Courses API

A full-featured **Backend REST API** for an online courses platform built with **Node.js, Express, and MongoDB**.

---

## 📌 Features

* 🔐 Authentication & Authorization (JWT + Refresh Token)
* 👤 User Roles (Student / Instructor / Admin)
* 📚 Courses Management
* 🎥 Lessons Management
* 🛒 Booking System
* ⭐ Reviews & Ratings
* 📧 Email Verification & Password Reset
* 🛡️ Validation using Joi
* ⚠️ Centralized Error Handling

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* Bcrypt (Password Hashing)
* Nodemailer (Emails)
* Joi (Validation)

---

## 📂 Project Structure

```
project/
│── models/
│── routes/
│── services/
│── middleware/
│── validation/
│── utils/
│── app.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```
PORT=2300
MONGO_URL=your_mongodb_connection
Moataz101=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🚀 Installation & Run

```bash
git clone <your-repo-url>
cd project
npm install
npm run dev
```

---

## 🔑 API Endpoints

### 🔐 Auth

| Method | Endpoint                       | Description          |
| ------ | ------------------------------ | -------------------- |
| POST   | /api/auth/register             | Register user        |
| POST   | /api/auth/verify-email         | Verify email         |
| POST   | /api/auth/login                | Login                |
| POST   | /api/auth/refresh-token        | Get new access token |
| POST   | /api/auth/forgotpassword       | Send reset code      |
| POST   | /api/auth/verify-resetpassword | Verify reset code    |
| POST   | /api/auth/resetpassword        | Reset password       |

---

### 📚 Courses

| Method | Endpoint               | Description     |
| ------ | ---------------------- | --------------- |
| GET    | /api/course            | Get all courses |
| POST   | /api/course/add        | Add course      |
| GET    | /api/course/get/:id    | Get course      |
| PATCH  | /api/course/update/:id | Update course   |
| DELETE | /api/course/delete/:id | Delete course   |

---

### 🎥 Lessons

| Method | Endpoint               | Description   |
| ------ | ---------------------- | ------------- |
| POST   | /api/lesson/add        | Add lesson    |
| PATCH  | /api/lesson/update/:id | Update lesson |
| DELETE | /api/lesson/delete/:id | Delete lesson |

---

### 🛒 Booking

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | /api/Booking/add        | Book course              |
| GET    | /api/Booking            | Get all bookings (Admin) |
| DELETE | /api/Booking/delete/:id | Delete booking           |

---

### ⭐ Reviews

| Method | Endpoint    | Description |
| ------ | ----------- | ----------- |
| POST   | /api/review | Add review  |

---

## 🔒 Authentication

Use Bearer Token:

```
Authorization: Bearer <access_token>
```

---

## 🧪 Example Requests

### 🔐 Register

```json
{
  "name": "Moataz",
  "age": 22,
  "email": "moataz@example.com",
  "password": "123456",
  "role": "student"
}
```

### 🔐 Login

```json
{
  "email": "moataz@example.com",
  "password": "123456"
}
```
### 🔐 Verify Email

```json
{
  "resetcode": "123456"
}
```


### 📚 Add Course

```json
{
  "title": "Node.js Course",
  "price": 100,
  "category": "Programming"
}
```

### 🎥 Add Lesson

```json
{
  "title": "Intro Lesson",
  "course_id": "COURSE_ID",
  "url": "https://example.com/video"
}
```

### 🛒 Book Course

```json
{
  "course_id": "COURSE_ID",
  "price": 100,
  "payment_method": "vodafone cash"
}
```

### ⭐ Add Review

```json
{
  "course_id": "COURSE_ID",
  "rating_": 5,
  "comment": "Great course!"
}
```

### 🔑 Forgot Password

```json
{
  "email": "moataz@example.com"
}
```

### 🔑 Verify Reset Code

```json
{
  "email": "moataz@example.com",
  "resetcode": "123456"
}
```

### 🔑 Reset Password

```json
{
  "newwpassword": "newpassword123"
}
```

---

## 📌 Notes

* **Admin** and **Instructor** can create courses
* **Admin** can delete or update any course
* **Instructor** can delete or update **only courses they created**
* Students must book a course before accessing lessons
