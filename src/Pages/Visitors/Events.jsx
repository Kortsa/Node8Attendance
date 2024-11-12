import React, { useEffect, useState } from "react";
import logo from "../../assets/N8.png";
import searchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";
import "../Visitors/Events.css";

const Events = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://timesync-backend-production.up.railway.app/events/?page=${
            Math.floor(startIndex / 4) + 1
          }&page_size=4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // console.log("Fetched data:", data); // Log the fetched data
        setEvents(data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [startIndex]);

  const showMoreCards = () => {
    if (startIndex + 4 < events.length) {
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
            type="search"
            placeholder="Search for events, programs ..."
            className="inputField"
          />
          <span className="searchIcon">
            <img src={searchIcon} alt="" />
          </span>
        </div>
        <div className="events_Cards">
          {loading ? (
            <div className="loading">
              <p>Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="no-events">
              <p>No events available here</p>
            </div>
          ) : (
            events.slice(startIndex, startIndex + 4).map((event, id) => (
              <Link
                key={id}
                to={event.to || "/young_loud_form"}
                className="event_card"
              >
                {event.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
