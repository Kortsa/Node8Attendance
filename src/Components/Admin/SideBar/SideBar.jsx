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
import { AdminTabs, apiBaseUrl } from "../../../constants";
import "./SideBar.css";

Modal.setAppElement("#root");

function SideBar() {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [logoutIsOpen, setlogoutIsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatToISO = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toISOString();
  };

  const [newEvent, setNewEvent] = useState({
    name: "",
    start_at: "",
    end_at: "",
    venue: "",
    deleted: false,
    form_details: [
      {
        name: "",
        required: false,
        type: "",
      },
    ], // Store meetup form questions
  });

  // console.log("Submitting:", JSON.stringify(newEvent, null, 2));

  const [forms, setForms] = useState([{ id: Date.now() }]);

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

  const duplicateForm = () => {
    // Get the template (first item) data
    const templateForm = newEvent.form_details[0];

    // Don't add if the template is empty
    if (!templateForm.name.trim()) return;

    // Insert the filled template as a new form below
    setForms((prevForms) => [
      prevForms[0], // keep template at top
      { id: Date.now() }, // new duplicated form
      ...prevForms.slice(1),
    ]);

    setNewEvent((prevState) => ({
      ...prevState,
      form_details: [
        // Keep template at top but reset it
        { name: "", required: false, type: "" },
        templateForm, // insert duplicated filled one
        ...prevState.form_details.slice(1),
      ],
    }));
  };

  // Event handler for form inputs (Event and Meetup forms)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_at" || name === "end_at") {
      setNewEvent((prevState) => ({
        ...prevState,
        [name]: value ? formatToISO(value) : "",
      }));
    } else if (name.startsWith("question")) {
      const index = parseInt(name.split("-")[1]);
      const updatedFormDetails = [...newEvent.form_details];
      updatedFormDetails[index].name = value;
      setNewEvent((prevState) => ({
        ...prevState,
        form_details: updatedFormDetails,
      }));
    } else {
      setNewEvent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDelete = (index) => {
    setForms((prevForms) => prevForms.filter((_, idx) => idx !== index));
    setNewEvent((prevState) => ({
      ...prevState,
      form_details: prevState.form_details.filter((_, idx) => idx !== index),
    }));
  };

  const handleTypeChange = (index, newType) => {
    const updatedFormDetails = [...newEvent.form_details];
    updatedFormDetails[index].type = newType;
    setNewEvent((prevState) => ({
      ...prevState,
      form_details: updatedFormDetails,
    }));
  };

  const toggleRequired = (index) => {
    const updatedFormDetails = [...newEvent.form_details];
    updatedFormDetails[index].required = !updatedFormDetails[index].required;
    setNewEvent((prevState) => ({
      ...prevState,
      form_details: updatedFormDetails,
    }));
  };

  // Submit both event and meetup data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure both forms are filled before submitting
    if (
      !newEvent.name ||
      !newEvent.start_at ||
      !newEvent.end_at ||
      !newEvent.venue
    ) {
      alert("Please fill out all fields in the event form.");
      setLoading(false);
      return;
    }

    if (newEvent.form_details.some((q) => !q.name || !q.type)) {
      alert("Please fill out all fields in the meetup form.");
      setLoading(false);
      return;
    }
    console.log("Submitting event:", newEvent);
    const formNames = new Set();
    const hasDuplicates = newEvent.form_details.some((q) => {
      if (!q.name || !q.type) return true;
      if (formNames.has(q.name)) return true;
      formNames.add(q.name);
      return false;
    });

    if (hasDuplicates) {
      alert(
        "Please ensure all form questions are unique and filled out properly."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      // console.log("server response:", data);

      if (res.ok) {
        navigate("/preview", {
          state: { event: data.event },
        });
      } else {
        alert(
          `Failed to add event. Server responded with: ${
            data.message || "unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
        <form className="modal_form">
          <div className="labels">
            <label>
              Name of event*
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
              Start Date*
              <input
                type="date"
                name="start_at"
                className="inputfield"
                value={newEvent.start_at.split("T")[0]}
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
              End date*
              <input
                type="date"
                name="end_at"
                className="inputfield"
                value={newEvent.end_at.split("T")[0]}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button
            type="button"
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
        <form className="form-contents" onSubmit={handleSubmit}>
          <h1>MEETUP FORM</h1>
          <input
            type="text"
            placeholder="Title"
            className="newform"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
          />
          {/* <input type="text" placeholder="Description" className="newform" /> */}

          {forms.map((form, id) => (
            <div className="modal_form" key={form.id}>
              <div className="newformlabels">
                <div className="form-creation-container">
                  <div className="top">
                    <input
                      type="text"
                      placeholder="Untitled Question"
                      className="questionInput"
                      name={`question-${id}`}
                      value={newEvent.form_details[id]?.name || ""}
                      onChange={handleChange}
                    />
                    <select
                      className="select-tab"
                      value={newEvent.form_details[id].type}
                      onChange={(e) => handleTypeChange(id, e.target.value)}
                    >
                      <option>Select Type</option>
                      <option value="Short answers">Short answers</option>
                      <option value="Paragraph">Paragraph</option>
                      <option value="multiple answers">Multiple Choice</option>
                      <option value="CheckBox">CheckBox</option>
                    </select>

                    {id === 0 && (
                      <div
                        className="form-duplicate"
                        onClick={duplicateForm}
                        style={{
                          cursor: newEvent.form_details[0].name.trim()
                            ? "pointer"
                            : "not-allowed",
                          opacity: newEvent.form_details[0].name.trim()
                            ? 1
                            : 0.5,
                        }}
                      >
                        <img src={AddIcon} alt="Add icon" />
                      </div>
                    )}
                  </div>

                  <div className="bottom">
                    <h5>{newEvent.form_details[id].type}</h5>
                    <hr />
                    <div className="required-tab">
                     
                      {id !== 0 && (
                        <RiDeleteBin6Line
                          className="delete-icon"
                          onClick={() => handleDelete(id)}
                          style={{ cursor: "pointer" }}
                        />
                      )}

                      <h3>required</h3>
                      <IoToggle
                        onClick={() => toggleRequired(id)}
                        style={{
                          transform: newEvent.form_details[id].required
                            ? "rotate(180deg)"
                            : "none",
                          color: newEvent.form_details[id].required
                            ? "#5cb85c"
                            : "#ccc",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button type="submit" className="pagination-btn" disabled={loading}>
            {loading ? "Previewing..." : "Preview"}
          </button>
        </form>
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
