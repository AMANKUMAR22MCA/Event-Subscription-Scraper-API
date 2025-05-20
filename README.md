# 🎫 Event Subscription Scraper API

This Node.js server scrapes upcoming events from Eventbrite (Sydney, Australia), caches them, and allows users to subscribe via email for updates.

## 🚀 Features

- 🔄 Scrapes events every 30 minutes from Eventbrite
- 💾 Caches scraped events for fast API responses
- 📧 Allows users to subscribe to an event with their email
- 🗂️ Stores subscriber information in MongoDB Atlas
- 🌐 CORS enabled for multiple frontends

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **Puppeteer** for headless web scraping
- **MongoDB Atlas** (Mongoose ORM)
- **node-cron** for scheduled scraping
- **CORS** for cross-origin requests

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/event-subscription-api.git
cd event-subscription-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=your_mongo_connection_string
PORT=5000
```

> Replace `your_mongo_connection_string` with your MongoDB Atlas connection string.

### 4. Start the server

```bash
npm start
```

The server will run at `http://localhost:5000`.

---

## 🧪 API Endpoints

### `GET /api/events`
Returns the list of currently cached events.

### `POST /api/subscribe`
Subscribes a user to a specific event.

```json
{
  "email": "user@example.com",
  "eventUrl": "https://www.eventbrite.com.au/e/example-event"
}
```

### `GET /api/subscribers`
Returns all subscribers from the database.

---

## 🌐 CORS Support

The server accepts requests from the following origins:

- `http://localhost:3000`
- `https://tasklist-frontend.onrender.com`
- `https://tasklist-nodejs-tasklist-frontend.onrender.com`

---

## 📂 Project Structure

```
.
├── models/
│   └── Subscriber.js
├── .env
├── server.js
└── README.md
```

---

## 📄 License

MIT License. Free to use and modify.
