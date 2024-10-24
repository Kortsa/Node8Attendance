import logo from "../../assets/N8.png";
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
          <input
            type="search"
            placeholder="Search for events, programs ..."
            className="inputField"
          />
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
