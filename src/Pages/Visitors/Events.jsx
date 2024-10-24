import logo from "../../assets/N8.png";
import searchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";
import "../Visitors/Events.css";

const EventCards = [
  "Young And Loud",
  "Last Friday Hangout",
  "BootCamps",
  "Women Community",
];
const Events = () => {
  return (
    <>
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
            {EventCards.map((event, id) => (
              <div key={id} className="event_card">
                {event}
              </div>
            ))}
          </div>

          <div className="btn">View More</div>
        </div>
      </div>
    </>
  );
};

export default Events;
