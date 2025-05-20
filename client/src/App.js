import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEvents = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/events")
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  };

  const handleGetTickets = (url) => {
    setSelectedUrl(url);
    document.getElementById("email-modal").style.display = "flex";
  };

  const handleSubmitEmail = () => {
    axios.post("http://localhost:5000/api/subscribe", {
      email,
      eventUrl: selectedUrl
    }).then(() => {
      window.location.href = selectedUrl;
    });
  };

  return (
    <div className="App">
      <h1>Sydney Events</h1>
      <button className="scrape-button" onClick={fetchEvents}>
        {loading ? "Scraping..." : "Scrape Events"}
      </button>

      <div className="events-grid">
        {events.map((event, i) => (
          <div className="card" key={i}>
            <h2>{event.title}</h2>
            <p className="date">{event.date}</p>
            <p className="location">{event.location}</p>
            <button className="ticket-button" onClick={() => handleGetTickets(event.url)}>
              GET TICKETS
            </button>
          </div>
        ))}
      </div>

      <div id="email-modal" className="modal">
        <div className="modal-content">
          <h2>Enter your email to continue</h2>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubmitEmail}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default App;
