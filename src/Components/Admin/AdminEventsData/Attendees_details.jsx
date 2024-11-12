import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import searchIcon from "../../../assets/search.png";
import "../AdminEventsData/Attendees_details.css";

const headers = [
  { label: "#", key: "number" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Gender", key: "sex" },
  { label: "Number", key: "phone_number" },
  { label: "Place", key: "resident" },
  { label: "School", key: "school_level" },
  { label: "Work", key: "position" },
  { label: "How did you hear", key: "ad" },
  { label: "Updates", key: "sms_alert" },
  { label: "Interests", key: "interest" },
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
        setAttendee(data.data || []);
      } catch (error) {
        console.error("Error fetching Attendee:", error);
      }
    };

    atttendeeData();
  }, []);

  const csvData = attendee.map((attendee, index) => ({
    number: index + 1,
    ...attendee,
    sms_alert: attendee.sms_alert ? "Yes" : "No",
  }));

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
        <div className="exportBtn">
          <CSVLink data={csvData} headers={headers} filename={"attendees.csv"}>
            <h1> Export</h1>
          </CSVLink>
        </div>
      </div>

      <div className="collected-details">
        <div className="headers">
          {headers.map((head, id) => (
            <div key={id} className="header">
              {head.label}
            </div>
          ))}
        </div>
        <div className="attendee-details">
          <div className="details">
            {attendee.map((attendee, index) => (
              <div className="detail" key={index}>
                <div>{index + 1}</div>
                <div>{attendee.name}</div>
                <div>{attendee.age}</div>
                <div>{attendee.sex}</div>
                <div>{attendee.phone_number}</div>
                <div>{attendee.resident}</div>
                <div>{attendee.school_level}</div>
                <div>{attendee.position}</div>
                <div>{attendee.ad}</div>
                <div className="data-cell">
                  {attendee.sms_alert ? "Yes" : "No"}
                </div>
                <div>{attendee.interest}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendees_details;
