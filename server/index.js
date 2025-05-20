const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const Subscriber = require("./models/Subscriber");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
  origin: [
    'http://localhost:3000', // for development
    // optional render test deployment URLs can go here
  ],
  credentials: true,
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://amanmongo:5soH4Z2Ety6EYTo9@cluster0.umrf0km.mongodb.net/event_subscriptions?retryWrites=true&w=majority";
const SCRAPE_INTERVAL = "*/30 * * * *"; // every 30 minutes

let cachedEvents = [];

// Connect to MongoDB Atlas (removed deprecated options)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Scrape function
async function scrapeEvents() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto("https://www.eventbrite.com.au/d/australia--sydney/all-events/", {
      waitUntil: "networkidle2",
    });

    const events = await page.evaluate(() => {
      const cards = document.querySelectorAll("div.Stack_root__1ksk7");
      const data = [];

      cards.forEach((card) => {
        const link = card.querySelector("a.event-card-link");
        const title = link?.querySelector("h3")?.innerText.trim();
        const url = link?.href;

        const infoParagraphs = card.querySelectorAll("p.Typography_root__487rx");
        const date = infoParagraphs[1]?.innerText.trim() || null;
        const location = infoParagraphs[2]?.innerText.trim() || null;

        if (title && url) {
          data.push({ title, url, date, location });
        }
      });

      // Deduplicate by URL
      const uniqueMap = {};
      const uniqueEvents = [];

      data.forEach((event) => {
        if (!uniqueMap[event.url]) {
          uniqueMap[event.url] = true;
          uniqueEvents.push(event);
        }
      });

      return uniqueEvents;
    });

    await browser.close();
    cachedEvents = events;
    console.log("Events scraped and cached");

  } catch (error) {
    console.error("Scraping error:", error.message);
  }
}

// Initial scrape on server start
scrapeEvents();

// Schedule scrape every 30 minutes
cron.schedule(SCRAPE_INTERVAL, scrapeEvents);

// API: Get cached events
app.get("/api/events", (req, res) => {
  res.json(cachedEvents);
});

// API: Subscribe with email
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email, eventUrl } = req.body;

    if (!email || !eventUrl) {
      return res.status(400).json({ error: "Missing email or event URL" });
    }

    const newSubscriber = new Subscriber({ email, eventUrl });
    await newSubscriber.save();

    console.log(`New subscriber: ${email} for ${eventUrl}`);
    res.json({ success: true });

  } catch (error) {
    console.error("Subscription error:", error.message);
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

// API: Get all subscribers
app.get("/api/subscribers", async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
