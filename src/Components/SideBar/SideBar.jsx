import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Students from "../../assets/Group3.png";
import Events from "../../assets/Group36.png";
import Visitors from "../../assets/Group.png";
import Employee from "../../assets/employees.png";
import AddIcon from "../../assets/add.png";
import logout from "../../assets/icons.png";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "../SideBar/SideBar.css";
Modal.setAppElement("#root");
const tabs = [
  {
    name: "Employees",
    icon: Employee,
    to: "",
  },
  {
    name: "Students",
    icon: Students,
    to: "",
  },
  {
    name: "Visitors",
    icon: Visitors,
    to: "",
  },
  {
    name: "Events",
    icon: Events,
    // to: "/attendees-details",
    to: "",
    icon2: AddIcon,
  },
];

function SideBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    venue: "",
    time: "",
  });

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://timesync-backend-production.up.railway.app/events/?page=1&page_size=50",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log("Fetched data:", data); // Log the fetched data
      setEvents(data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://timesync-backend-production.up.railway.app/events/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        }
      );
      const data = await res.json();
      console.log("Response status:", res.status);
      console.log("Response data:", data);

      if (res.ok) {
        // Show a success message
        alert("Event added successfully!");

        // Optionally, fetch the updated list of events
        fetchEvents();

        // Close the modal
        closeModal();
      } else {
        // Handle errors
        alert(
          `Failed to add event. Server responded with: ${
            data.message || res.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="sidebar_content">
        <div className="tabs">
          {tabs.map((tab, id) => {
            return (
              <>
                <Link key={id} to={tab.to} className="tab">
                  <img src={tab.icon} alt="" />
                  <h2>{tab.name}</h2>

                  {tab.icon2 && (
                    <img
                      src={tab.icon2}
                      alt="Add icon"
                      className="add-icon"
                      onClick={(e) => {
                        e.preventDefault();
                        openModal();
                      }}
                    />
                  )}
                </Link>
              </>
            );
          })}

          <Link to="/" className="logout">
            <img src={logout} alt="" />
            Log Out
          </Link>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Event Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Provide Details of new Events here</h2>
        <form className="modal_form" onSubmit={handleSubmit}>
          <div className="labels">
            <label>
              Name of event *
              <input
                type="text"
                name="name"
                className="inputfield"
                value={newEvent.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Event Date*
              <input
                type="text"
                name="date"
                className="inputfield"
                value={newEvent.date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Event Venue*
              <input
                type="text"
                name="venue"
                className="inputfield"
                value={newEvent.venue}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Event Time*
              <input
                type="text"
                name="time"
                className="inputfield"
                value={newEvent.time}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </Modal>
      <Outlet />
    </>
  );
}

export default SideBar;
