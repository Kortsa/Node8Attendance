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
  const [currentPage, setCurrentPage] = useState(1);
  const attendeesPerPage = 20;

  useEffect(() => {
    const fetchAllAttendees = async () => {
      let allAttendees = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const response = await fetch(
            `https://timesync-backend-production.up.railway.app/attendees/?page=${page}&page_size=50`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          allAttendees = allAttendees.concat(data.data || []);
          totalPages = data.meta.num_of_pages;
          page++;
        }
        setAttendee(allAttendees);
      } catch (error) {
        console.error("Error fetching Attendee:", error);
      }
    };

    fetchAllAttendees();
  }, []);

  const indexOfLastAttendee = currentPage * attendeesPerPage;
  const indexOfFirstAttendee = indexOfLastAttendee - attendeesPerPage;
  const currentAttendees = attendee.slice(
    indexOfFirstAttendee,
    indexOfLastAttendee
  );

  const csvData = attendee.map((attendee, index) => ({
    number: index + 1,
    ...attendee,
    sms_alert: attendee.sms_alert ? "Yes" : "No",
  }));

  const totalPages = Math.ceil(attendee.length / attendeesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        {/* <div className="avatar"></div> */}
        <div className="event_cards">
          <div className="card">
            Young and Loud <br></br>
            {attendee.length}{" "}
          </div>
          <div className="card">Node X</div>
        </div>
        <div className="topbtns">
          <div className="exportBtn">
            <CSVLink
              data={csvData}
              headers={headers}
              filename={"attendees.csv"}
            >
              <h1> Export</h1>
            </CSVLink>
          </div>

          <div className="exportBtn att">
            Total Attendees : {attendee.length}
          </div>
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
            {currentAttendees.map((attendee, index) => (
              <div className="detail" key={index}>
                <div>{indexOfFirstAttendee + index + 1}</div>
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
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Attendees_details;
