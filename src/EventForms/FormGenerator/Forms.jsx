import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../../assets/N8.png";
import { apiBaseUrl } from "../../constants";

const Forms = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/events/${id}`);
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  if (loading) {
    return (
      <div className="contents">
        <div className="loading">
          <p>Loading form...</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="contents">
        <div className="no-events">
          <p>Could not load the event form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contents">
      <div className="logo">
        <Link to="/events">
          <img src={logo} alt="" />
        </Link>
      </div>

      <div className="form_card">
        <h2>Provide your Details below</h2>
        <form className="form_content">
          {eventData.form_data?.map((q, i) => (
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
          <Link to="" className="btn">
            Submit
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Forms;
