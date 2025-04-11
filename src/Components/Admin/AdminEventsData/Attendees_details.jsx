import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import searchIcon from "../../../assets/search.png";
import "../AdminEventsData/Attendees_details.css";
import { headers, apiBaseUrl, AdminFetchAllEvents } from "../../../constants";

function Attendees_details() {
  const [attendee, setAttendee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventHeaders, setEventHeaders] = useState([]);
  const [eventAttendees, setEventAttendees] = useState([]);

  const attendeesPerPage = 20;

  const [formFields, setFormFields] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEventClick = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/events/${id}`);
      const data = await response.json();

      setFormFields(data.form_data || []);
      setSelectedEventId(id);

      // Fetch attendees for that specific event
      const res = await fetch(`${apiBaseUrl}/attendees/?event_id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const attendeeData = await res.json();
      setAttendee(attendeeData.data || []);
      setCurrentPage(1); // Reset pagination
    } catch (err) {
      console.error("Error fetching event or attendees:", err);
    }
  };

  useEffect(() => {
    // const fetchAllAttendees = async () => {
    //   let allAttendees = [];
    //   let page = 1;
    //   let totalPages = 1;

    //   try {
    //     while (page <= totalPages) {
    //       const response = await fetch(
    //         `${apiBaseUrl}/attendees/?page=${page}&page_size=50`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       const data = await response.json();
    //       allAttendees = allAttendees.concat(data.data || []);
    //       totalPages = data.meta.num_of_pages;
    //       page++;
    //     }
    //     setAttendee(allAttendees);
    //   } catch (error) {
    //     // console.error("Error fetching Attendee:", error);
    //   }
    // };
    const loadEvents = async () => {
      const { events: allEvents } = await AdminFetchAllEvents();
      setEvents(allEvents);
    };

    loadEvents();

    // fetchAllAttendees();
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

        <div className="event_cards">
          <div className="card_events">
            {events.map((event, id) => (
              <div
                key={id}
                onClick={() => handleEventClick(event.id)}
                className={`card ${
                  selectedEvent?.id === event.id ? "selected" : ""
                }`}
              >
                {event.name}
              </div>
            ))}
          </div>
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
        {/* <div className="headers">
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
        </div> */}
        {selectedEvent ? (
          <>
            <div className="headers">
              <div className="header">#</div>
              {formFields.map((field, id) => (
                <div key={id} className="header">
                  {field.label}
                </div>
              ))}
            </div>

            <div className="attendee-details">
              <div className="details">
                {currentAttendees.map((attendee, index) => (
                  <div className="detail" key={index}>
                    <div>{indexOfFirstAttendee + index + 1}</div>
                    {formFields.map((field, i) => (
                      <div key={i}>
                        {attendee.form_values?.[field.name] || "—"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Select an event to view its form responses.</p>
        )}
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
