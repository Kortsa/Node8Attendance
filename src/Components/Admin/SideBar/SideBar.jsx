import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import logout from "../../../assets/icons.png";
import warning from "../../../assets/warning.png";
import AddIcon from "../../../assets/add.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsToggle2Off } from "react-icons/bs";
import { AdminTabs, apiBaseUrl } from "../../../constants";
import "./SideBar.css";

Modal.setAppElement("#root");

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [logoutIsOpen, setlogoutIsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [typeErrors, setTypeErrors] = useState({});

  const openEventModal = location.state?.openEventModal;
  const eventToEdit = location.state?.event;

  const prefillForm = (eventData) => {
    setNewEvent({
      name: eventData.name || "",
      start_at: eventData.start_at || "",
      end_at: eventData.end_at || "",
      venue: eventData.venue || "",
      deleted: false,
      form_details: eventData.form_details?.length
        ? [...eventData.form_details, { name: "", required: false, type: "" }]
        : [{ name: "", required: false, type: "" }],
    });

    setForms(
      eventData.form_details?.map((_, i) => ({ id: Date.now() + i })) || [
        { id: Date.now() },
      ]
    );
  };

  useEffect(() => {
    if (openEventModal) {
      setModalIsOpen(true); // Your function to show the modal
      // setFormOpen(true);

      if (eventToEdit) {
        prefillForm(eventToEdit); // Your function to pre-fill the form with data
      }
    }
  }, [openEventModal, eventToEdit]);
  

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
    const templateForm =
      newEvent.form_details[newEvent.form_details.length - 1];

    // new code starts here
    const lastIndex = newEvent.form_details.length - 1;
    const lastForm = newEvent.form_details[lastIndex];

    // If type is missing, show error
    if (!lastForm.type) {
      setTypeErrors((prev) => ({
        ...prev,
        [lastIndex]: "You must select a type.",
      }));
      return;
    }

    // Clear any existing error for the template
    setTypeErrors((prev) => {
      const updated = { ...prev };
      delete updated[lastIndex];
      return updated;
    });

    // new code ends here

    setForms((prevForms) => [
      ...prevForms.slice(0, -1), // keep all forms except the template
      { id: Date.now() }, // new duplicated form
      prevForms[prevForms.length - 1], // keep the template at the bottom
    ]);

    setNewEvent((prevState) => ({
      ...prevState,
      form_details: [
        ...prevState.form_details.slice(0, -1), // keep all forms except the template
        templateForm, // insert duplicated form
        { name: "", required: false, type: "" }, // reset template
      ],
    }));
  };

  

  // Event handler for form inputs (Event and Meetup forms)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEvent((prev) => ({ ...prev, [name]: value }));

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

    // Update validation errors for the current field
    setErrors((prev) => {
      const updated = { ...prev };
      if (value.trim().length < 1) {
        updated[name] = " required ";
      } else {
        delete updated[name]; // Remove the error for the field if valid
      }
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (newEvent.name.trim().length < 1)
      newErrors.name = "Event name is required.";
    if (newEvent.start_at.trim().length < 1)
      newErrors.start_at = "Start date is required.";
    if (newEvent.venue.trim().length < 1)
      newErrors.venue = "Event venue is required.";
    if (newEvent.end_at.trim().length < 1)
      newErrors.end_at = "End date is required.";

    // Update the errors state
    setErrors(newErrors);

    // Return whether the form is valid (no errors)
    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      setFormOpen(true); // proceed
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure base fields are present
    if (
      !newEvent.name ||
      !newEvent.start_at ||
      !newEvent.end_at ||
      !newEvent.venue
    ) {
      setLoading(false);
      return;
    }

    // Remove last form if it's empty (template)
    const cleanedFormDetails = [...newEvent.form_details];
    const lastForm = cleanedFormDetails[cleanedFormDetails.length - 1];
    if (!lastForm.name && !lastForm.type) {
      cleanedFormDetails.pop();
    }

    // Revalidate cleaned form
    const formNames = new Set();
    const hasInvalid = cleanedFormDetails.some((q) => {
      if (!q.name || !q.type) return true;
      if (formNames.has(q.name)) return true;
      formNames.add(q.name);
      return false;
    });

    if (hasInvalid) {
      alert(
        "Please ensure all form questions are unique and filled out properly."
      );
      setLoading(false);
      return;
    }

    // Update the event data without the empty template before navigation
    const eventWithoutTemplate = {
      ...newEvent,
      form_details: cleanedFormDetails,
    };

    navigate("/preview", {
      state: { event: eventWithoutTemplate },
    });
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
              {errors.name && <p className="error-text">{errors.name}</p>}
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
                min={new Date().toISOString().split("T")[0]} // disables past dates
              />
              {errors.name && <p className="error-text">{errors.start_at}</p>}
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
              {errors.name && <p className="error-text">{errors.venue}</p>}
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
                min={new Date().toISOString().split("T")[0]} // disables past dates
              />
              {errors.name && <p className="error-text">{errors.end_at}</p>}
            </label>
          </div>

          <button type="button" className="btn" onClick={handleNextClick}>
            Next
          </button>
        </form>
      </Modal>

      {/* modal for creation of forms for an event */}
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
                      value={newEvent.form_details[id]?.type || ""}
                      onChange={(e) => {
                        handleTypeChange(id, e.target.value);
                        // Clear error if type is selected
                        if (e.target.value) {
                          setTypeErrors((prev) => {
                            const updated = { ...prev };
                            delete updated[id];
                            return updated;
                          });
                        }
                      }}
                    >
                      <option>Select Type</option>
                      <option value="Short answers">Short answers</option>
                      <option value="Paragraph">Paragraph</option>
                      <option value="multiple answers">Multiple Choice</option>
                      <option value="CheckBox">CheckBox</option>
                    </select>

                    {id === forms.length - 1 && (
                      <div
                        className="form-duplicate"
                        onClick={duplicateForm}
                        style={{
                          cursor: newEvent.form_details[0]?.name?.trim()
                            ? "pointer"
                            : "not-allowed",
                          opacity: newEvent.form_details[0]?.name?.trim()
                            ? 1
                            : 0.5,
                        }}
                      >
                        <img src={AddIcon} alt="Add icon" />
                      </div>
                    )}
                  </div>

                  <div className="bottom">
                    <h5>
                      {newEvent.form_details[id]?.type || "Select a type"}
                    </h5>

                    <hr />
                    {typeErrors[id] && (
                      <p className="error-text">{typeErrors[id]}</p>
                    )}

                    <div className="required-tab">
                      <RiDeleteBin6Line
                        className="delete-icon"
                        onClick={() => handleDelete(id)}
                        style={{ cursor: "pointer" }}
                      />

                      <h3>required</h3>
                      <BsToggle2Off
                        onClick={() => toggleRequired(id)}
                        style={{
                          transform: newEvent.form_details[id]?.required
                            ? "rotate(180deg)"
                            : "none",
                          color: newEvent.form_details[id]?.required
                            ? "#5cb85c"
                            : "#ccc",
                          cursor: "pointer",
                          fontSize: "25px",
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
