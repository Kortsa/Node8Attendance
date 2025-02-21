import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import logout from "../../../assets/icons.png";
import warning from "../../../assets/warning.png";
import AddIcon from "../../../assets/add.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoToggle } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AdminTabs } from "../../../constants";
import "./SideBar.css";
Modal.setAppElement("#root");

function SideBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [logoutIsOpen, setlogoutIsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  // const [forms, setForms] = useState([{ id: Date.now() }]);
  const [forms, setForms] = useState([{ id: Date.now(), isTemplate: true }]);

  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    venue: "",
    time: "",
  });

  const [events, setEvents] = useState([]);

  const handleLogout = () => {
    navigate("/");
  };

  // modal for form creation
  const closeFormModal = () => {
    setFormOpen(false);
  };

  // modal for create button
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // modal for logout
  const closelogoutModal = () => {
    setlogoutIsOpen(false);
  };
  // Function to duplicate the form
  const duplicateForm = () => {
    setForms([
      ...forms, 
      { id: Date.now(), isTemplate: false } //set new form as template
    ]); // Add a new form with a unique ID
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
          {AdminTabs.map((tab, id) => {
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
                        setModalIsOpen(true);
                      }}
                    />
                  )}
                </Link>
              </>
            );
          })}

          <div
            className="logout"
            onClick={(e) => {
              setlogoutIsOpen(true);
            }}
          >
            <img src={logout} alt="" />
            Log Out
          </div>
        </div>
      </div>

      {/* Modal for the add events button */}
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

          <button
            type="submit"
            className="btn"
            onClick={() => setFormOpen(true)}
          >
            Next
          </button>
        </form>
      </Modal>

      {/* modal for creation of form for an event */}

      <Modal
        isOpen={formOpen}
        onRequestClose={closeFormModal}
        // contentLabel="Add Event Modal"
        className="modal form_creation"
        overlayClassName="overlay"
      >
        <h1>MEETUP FORM</h1>
        <input type="text" placeholder="Title" className="newform" />

        {forms.map((form, id) => (
          <form action="" className="modal_form" key={form.id}>
            <div className="newformlabels">
              <div className="form-creation-container">
                <div className="top">
                  <input
                    type="text"
                    placeholder="Untitled Question"
                    className="questionInput"
                    disabled={form.isTemplate} 
                  />
                  <select 
                  className="select-tab" 
                  disabled={form.isTemplate} // Disable dropdown for the template
                  >
                    <option>Options</option>
                    <option value="Short answers">Short answers</option>
                    <option value="Paragraph">Paragraph</option>
                    <option value="multiple answers">Multiple Choice</option>
                    <option value="CheckBox">CheckBox</option>
                  </select>
                  {id === 0 && (
                    <div
                      className="form-duplicate"
                      onClick={duplicateForm} // Duplicate form on click
                      style={{ cursor: "pointer" }}
                    >
                      <img src={AddIcon} alt="Add icon" />
                    </div>
                  )}
                </div>

                <div className="bottom">
                  <h5>Short Answers</h5>
                  <hr />
                  <div className="required-tab">
                    <RiDeleteBin6Line />
                    <h3>required</h3>
                    <IoToggle />
                  </div>
                </div>
              </div>
            </div>
          </form>
        ))}
        <button className="pagination-btn">Preview</button>
      </Modal>

      {/* modal for the logout onclick */}
      <Modal
        isOpen={logoutIsOpen}
        onRequestClose={closelogoutModal}
        // contentLabel="Add Event Modal"
        className="logout-modal modal"
        overlayClassName="overlay"
      >
        <h2>Do you want to logout?</h2>
        <div className="warning-img">
          <img src={warning} alt="" />
        </div>
        <div className="logout-options">
          <button className="btn yes" onClick={handleLogout}>
            Yes
          </button>
          <button className="btn no" onClick={closelogoutModal}>
            No
          </button>
        </div>
      </Modal>

      <Outlet />
    </>
  );
}

export default SideBar;
