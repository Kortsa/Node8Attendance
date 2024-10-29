import React, { useState } from "react";
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
  // Add more events here as needed
];

const Events = () => {
  const [startIndex, setStartIndex] = useState(0);

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
            {allEventCards
              .slice(startIndex, startIndex + 4)
              .map((event, id) => (
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
