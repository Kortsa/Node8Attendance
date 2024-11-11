import React, { useEffect, useState } from "react";
import searchIcon from "../../../assets/search.png";
import "../AdminEventsData/Attendees_details.css";

const headers = [
  "Name",
  "Gender",
  "Number",
  "Place",
  "School",
  "Work",
  "How did you hear",
  "Updates",
  "Interests",
];

function Attendees_details() {
  const [attendee, setAttendee] = useState([]);

  useEffect(() => {
    const atttendeeData = async () => {
      try {
        const response = await fetch(
          "https://timesync-backend-production.up.railway.app/attendees/?page=1&page_size=50",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("Fetched attendees:", data); // Log the fetched data
        setAttendee(data.data || []);
      } catch (error) {
        console.error("Error fetching Attendee:", error);
      }
    };

    atttendeeData();
  }, []);
  return (
    <div className="attendee-content">
      <div className="top-content">
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
        <div className="avatar"></div>
      </div>

      <div className="collected-details">
        <div className="headers">
          {headers.map((head, id) => {
            return (
              <div key={id} className="header">
                {head}
              </div>
            );
          })}
        </div>
        <div className="attendee-details">
          <div className="details">
            {attendee.map((attendee, id) => {
              return (
                <div className="detail" key={id}>
                  <div>{attendee.name}</div>
                  <div>{attendee.sex}</div>
                  <div>{attendee.phone_number}</div>
                  <div>{attendee.resident}</div>
                  <div>{attendee.school}</div>
                  <div>{attendee.position}</div>
                  <div>{attendee.ad}</div>
                  <div>{attendee.sms_alert}</div>
                  <div>{attendee.interest}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendees_details;
