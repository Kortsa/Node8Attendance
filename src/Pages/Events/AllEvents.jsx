import React, { useEffect, useState } from "react";
import logo from "../../assets/N8.png";
import searchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";
import "./YnL.css";
import { apiBaseUrl } from "../../constants";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1); // current page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // to disable "Next" when no more data

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/events/?page=${page}&page_size=4`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setEvents(data.data || []);
        setHasMore((data.data || []).length === 4); // if less than 4, disable Next
      } catch (error) {
        // console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  const showMoreCards = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const showPreviousCards = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="contents">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
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
            <img src={searchIcon} alt="Search" />
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
            events.map((event, id) => (
              <Link
                key={id}
                
                to={`/event_form/${event.id}`}
                className="event_card"
              >
                {event.name}
              </Link>
            ))
          )}
        </div>

        {events.length > 0 && (
          <div className="pagination-controls">
            <button className="btn" onClick={showPreviousCards} disabled={page === 1}>
              Previous
            </button>
            <button className="btn" onClick={showMoreCards} disabled={!hasMore}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
