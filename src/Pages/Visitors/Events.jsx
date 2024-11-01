import React, { useEffect, useState } from "react";
import logo from "../../assets/N8.png";
import searchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";
import "../Visitors/Events.css";

const allEventCards = [
  { title: "Young And Loud", to: "/young_loud_form" },
  { title: "Last Friday Hangout", to: "" },
  { title: "BootCamps", to: "" },
  { title: "Women Community", to: "" },
  { title: "Tech Talks", to: "" },
  { title: "Hackathons", to: "" },
  { title: "Networking Nights", to: "" },
  { title: "Code Jams", to: "" },
  { title: "Young And Loud", to: "/young_loud_form" },
];

const Events = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://timesync-backend-production.up.railway.app/events/all?page=1&page_size=50"
          // {
          //   method: "GET",
          //   headers: {
          //     "Content-Type": "application/json",
          //     "X-API-Key": "e0a835e08ffb4406b98edcd153647",
          //   },
          // }
        );

        const data = await response.json();

        setEvents(data.events);
        console.log(data);
      } catch (error) {
        // console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const showMoreCards = () => {
    if (startIndex + 4 < allEventCards.length) {
      setStartIndex((prev) => prev + 4);
    }
  };

  const showPreviousCards = () => {
    if (startIndex - 4 >= 0) {
      setStartIndex((prev) => prev - 4);
    }
  };

  return (
    <div className="contents">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="eventCard">
        <div className="search_container">
          <input
            // type="search"
            placeholder="Search for events, programs ..."
            className="inputField"
          />
          <span className="searchIcon">
            <img src={searchIcon} alt="" />
          </span>
        </div>

        <div className="events_Cards">
          {allEventCards.slice(startIndex, startIndex + 4).map((event, id) => (
            <Link key={id} to={event.to} className="event_card">
              {event.title}
            </Link>
          ))}
        </div>

        <div className="button_container">
          {startIndex > 0 && (
            <div className="btn" onClick={showPreviousCards}>
              Previous
            </div>
          )}
          {startIndex + 4 < allEventCards.length && (
            <div className="btn" onClick={showMoreCards}>
              View More
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
