# 🎬 Movies App 

A full-stack Movies Application built using **React (Frontend)** and **Node.js / Express (Backend)**.
The app allows users to manage movies (view, search, add, update, delete).

---

# 👥 Team Members

* Raghad Ayad (Frontend)
* Mohammed Abu Samra (Backend)

---
## 📥 Clone the Project

Before running the project, you need to clone the repository from GitHub:

```bash id="cln1"
git clone https://github.com/raghad-pro/PLUTO_movies_app_with_react_and_express
```

Then navigate into the project folder:

```bash id="cln2"
cd PLUTO_movies_app_with_react_and_express
```
# 🚀 How to Run the Project

## 🔵 Backend Setup

Make sure **Node.js** is installed: https://nodejs.org

```bash id="kq9x7m"
cd backend
```
```bash id="cln2"
npm install
```
```bash id="cln2"
node server.js
```


📌 Backend runs on:

```
http://localhost:4000
```

---

## 💻 Frontend Setup

```bash id="p1v7lz"
npm install
```
```
npm start
```

📌 Frontend runs on:

```
http://localhost:3000
```

---

# ⚙️ Features & Contributions (with Issues & PRs)

---

## 🟡 Setup

* Issue #1 — Setup React App (Raghad Ayad) → PR #1
* Issue #2 — Setup Express Server (Mohammed Abu Samra) → PR #2

---

## 🟢 Backend Features

* Issue #3 — GET /movies (Mohammed Abu Samra) → PR #3
* Issue #4 — GET /movies/:id (Mohammed Abu Samra) → PR #4
* Issue #5 — POST /movies (Mohammed Abu Samra) → PR #5
* Issue #6 — PATCH /movies/:id (Mohammed Abu Samra) → PR #6
* Issue #7 — DELETE /movies/:id (Mohammed Abu Samra) → PR #7
* Issue #8 — Search API (Mohammed Abu Samra) → PR #8
* Issue #9 — Limit Results (Mohammed Abu Samra) → PR #9

---

## 🔵 Frontend Features

* Issue #10 — Movie List UI (Raghad Ayad) → PR #10
* Issue #11 — Selected Movie UI (Raghad Ayad) → PR #11
* Issue #12 — Hover & Click Behavior (Raghad Ayad) → PR #12
* Issue #13 — Carousel (Raghad Ayad) → PR #13
* Issue #14 — Search UI (Raghad Ayad) → PR #14

---

## 🔶 Integration Features

* Issue #15 — Connect Frontend to Backend (Raghad Ayad + Mohammed Abu Samra) → PR #15
* Issue #16 — Add Movie (Raghad Ayad + Mohammed Abu Samra) → PR #16
* Issue #17 — Update Movie (Raghad Ayad + Mohammed Abu Samra) → PR #17
* Issue #18 — Delete Movie (Raghad Ayad + Mohammed Abu Samra) → PR #18
* Issue #19 — Poster Images (Mohammed Abu Samra) → PR #19

---

# 📬 Postman API Documentation

We used **Postman** to document and test all backend APIs.

### 📌 Usage:

* Import Postman Collection (included in project if available)
* Test all endpoints easily
* Share APIs between team members

### 📌 Main Endpoints:

* GET /movies
* GET /movies/:id
* POST /movies
* PATCH /movies/:id
* DELETE /movies/:id
* GET /movies?search=term
* GET /movies?limit=value

---

# 💡 Assumptions

* Movie ID is auto-generated
* Data is stored in a JSON file (no database)
* No authentication system required
* Single-user application

---

# ⚠️ Known Limitations

* No database (JSON file only)
* No advanced validation
* No pagination
* No authentication system
* Limited scalability

---

# 📈 Progress

* ✅ Backend fully implemented (CRUD + Search + Limit)
* ✅ Frontend UI completed
* ✅ API integration completed
* ✅ Poster images integration done
* ✅ Postman testing completed
* 🔄 Minor improvements ongoing

---

# 😅 Challenges Faced

## 👤 Individual Challenges

* Handling JSON file instead of database
* Managing async API requests
* Frontend API integration issues

## 👥 Team Challenges

* Git merge conflicts
* Task distribution coordination
* Connecting frontend with backend smoothly

---

# 📌 Notes

* Backend must run before frontend
* Both servers must run simultaneously
* All APIs tested using Postman

---
