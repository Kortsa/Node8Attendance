import React, { useEffect, useState } from "react";
import logo from "../../assets/N8.png";
import searchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";
import "./Allevents.css";
import { FetchAllEvents } from "../../constants";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1); // current page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // to disable "Next" when no more data

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const { events: newEvents, hasMore: more } = await FetchAllEvents(page);
      setEvents(newEvents);
      setHasMore(more);
      setLoading(false);
    };

    loadEvents();
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
                <h6>{event.label}</h6>
              </Link>
            ))
          )}
        </div>

        {events.length > 0 && (
          <div className="pagination-controls">
            {page > 1 && (
              <button className="btn" onClick={showPreviousCards}>
                Previous
              </button>
            )}
            {hasMore && (
              <button className="btn" onClick={showMoreCards}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
