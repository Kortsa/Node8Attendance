import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../../assets/N8.png";
import "./Preview.css";

function Preview() {
  const location = useLocation();
  const eventData = location.state?.event; // ✅ Get event data from router state

  if (!eventData) return <div>No event data found.</div>;

  return (
    <>
      {/* <h1>Preview: {eventData.name} Form</h1> */}
      <div className="contents">
        <div className="logo">
          <Link to="/events">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="form_card">
          <h2>Provide your Details below</h2>
          <form className="form_content">
            {[...eventData.form_data].reverse().map((q, i) => (
              <div key={i} className="content name">
                <label htmlFor={q.name}>
                  {q.label}
                  {q.required && <span style={{ color: "red" }}> * </span>}
                </label>
                <input
                  className="inputField"
                  type="text"
                  id={q.name}
                  name={q.name}
                  required={q.required}
                  placeholder={q.label}
                />
              </div>
            ))}
            <Link to="/mel-attendees/y&l-16-11-2024" className="btn">
              Done
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Preview;
