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


---

## Approach

- Choosing Node.js + Express for backend

- Using Puppeteer for scraping Eventbrite’s event data

- Storing data in MongoDB Atlas

- Scheduling scraping every 30 mins with node-cron

- Enabling CORS for multiple frontends

- Creating API endpoints for events and subscriptions



---


---
### Chalenges

- Handling dynamic content scraping with Puppeteer

- Managing duplicate events and data caching

- Dealing with CORS issues and multiple client origins

- Optimizing scraping to avoid being blocked or slowing down

- Connecting securely to MongoDB Atlas

- Validating user inputs for subscriptions

---

---
![image](https://github.com/user-attachments/assets/9ac00cf8-8c2b-4413-aa74-052a9c9c2925)
<br>

![image](https://github.com/user-attachments/assets/951a5235-43ee-439e-bb7e-f5443fa52498)

<br>

![image](https://github.com/user-attachments/assets/b860f5fa-a086-41a8-bec0-6289af5f2b70)

<br>

![image](https://github.com/user-attachments/assets/65be58f7-bb1c-4897-88e3-98c5d257829a)

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AMANKUMAR22MCA/Event-Subscription-Scraper-API.git
cd Event-Subscription-Scraper-API
```

### 2. Install dependencies => cd client

```bash
npm install
npm start
```

### 3. update mongodb in case if want to use yours 


```env
MONGO_URI=your_mongo_connection_string
PORT=5000
```

> Replace `your_mongo_connection_string` with your MongoDB Atlas connection string.

### 4. Start the server => cd server 

```bash
npm install
npm start
```

The server will run at `http://localhost:5000`.

---
---
once client and server started click on the scrap button to c=scrap the events 
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


---

## 📂 Project Structure

```
event-subscription-platform/
├── client/        # React frontend
├── server/        # Node.js backend
└── README.md
```

---

## 📄 License

MIT License. Free to use and modify.
