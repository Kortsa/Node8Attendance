import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import searchIcon from "../../../assets/search.png";
import "../AdminEventsData/Attendees_details.css";
import { apiBaseUrl, AdminFetchAllEvents } from "../../../constants";
import { motion, AnimatePresence } from "framer-motion";

function Attendees_details() {
  const [attendee, setAttendee] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formFields, setFormFields] = useState();
  const [loading, setLoading] = useState(false);

  const attendeesPerPage = 20;

  const handleEventClick = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/events/${data.id}`);
      const evendata = await response.json();

      setFormFields(evendata.form_data || []);

      setSelectedEvent(evendata);

      // Use the `event.name` to fetch attendees
      const eventName = evendata.name;
      const sanitizedEventName = encodeURIComponent(eventName.trim());

      const url = `${apiBaseUrl}/attendees/${sanitizedEventName}?page=1&page_size=50`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const attendeeData = await res.json();
      // console.log(attendeeData);

      setAttendee(attendeeData.data || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching event or attendees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedEvent) return;

    const fetchAttendees = async () => {
      const eventName = encodeURIComponent(selectedEvent.name.trim());
      const url = `${apiBaseUrl}/attendees/${eventName}?page=1&page_size=50`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        setAttendee(data.data || []);
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    fetchAttendees(); // Initial call

    const interval = setInterval(() => {
      fetchAttendees();
    }, 15000); // Fetch every 15 seconds

    return () => clearInterval(interval); // Cleanup on unmount or event change
  }, [selectedEvent]);

  useEffect(() => {
    const loadEvents = async () => {
      const { events: allEvents } = await AdminFetchAllEvents();
      setEvents(allEvents);
      // console.log(allEvents);
      if (allEvents.length > 0) {
        handleEventClick(allEvents[0]); // Select first event by default
      }
    };

    loadEvents();
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
                onClick={() => handleEventClick(event)}
                className={`card ${
                  selectedEvent?.id === event.id ? "selected" : ""
                }`}
              >
                <h6>{event.name}</h6>
               
              </div>
            ))}
          </div>
        </div>
        <div className="topbtns">
          <div className="exportBtn">
            <CSVLink
              data={csvData}
              // headers={headers}
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
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <>
          <div className="collected-details">
            {formFields && formFields.length > 0 && (
              <div className="headers">
                <div className="header">#</div>
                {[...formFields].reverse().map((field, index) => (
                  <div key={index} className="header">
                    {field.label}
                  </div>
                ))}
              </div>
            )}

            <div className="attendee-details">
              <div className="details">
                <AnimatePresence mode="wait">
                  {currentAttendees.map((attendee, index) => (
                    <motion.div
                      className="detail"
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "anticipate" }}
                    >
                      <div>{indexOfFirstAttendee + index + 1}</div>
                      {[...(formFields && formFields)]
                        .reverse()
                        .map((field, idx) => (
                          <div key={idx}>
                            {field.type === "CheckBox"
                              ? attendee[field.name] === true
                                ? "Yes"
                                : "No"
                              : attendee[field.name] || ""}
                          </div>
                        ))}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </>
      )}

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
