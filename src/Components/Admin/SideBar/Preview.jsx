import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { IoMdArrowBack } from "react-icons/io";
import { apiBaseUrl } from "../../../constants";
import "./Preview.css";

function Preview() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const eventData = location.state?.event;

  const handleEditForm = () => {
    navigate("/admin-dashboard", {
      state: {
        openEventModal: true,
        event: eventData,
      },
    });
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        Swal.fire({
          title: "CheckIn App",
          text: `You've Successfully created an event`,
          icon: "success",
          customClass: {
            title: "font-quicksand",
            text: "font-quicksand",
          },
        });
        navigate("/admin-dashboard");
      } else {
        Swal.fire({
          title: "CheckIn App",
          text: `Event not created`,
          icon: "error",
          customClass: {
            title: "font-quicksand",
            text: "font-quicksand",
          },
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!eventData) return <div>No event data found.</div>;

  return (
    <>
      {/* <h1>Preview: {eventData.name} Form</h1> */}
      <div className="contents">
        <div className="editform" onClick={handleEditForm}>
          <IoMdArrowBack size={20} />
          <span>Edit form</span>
        </div>

        <div className="form_card">
          <h2>Provide your Details below</h2>
          <form className="form_content">
            {eventData.form_details.map((q, i) => (
              <div key={i} className="content name">
                <label htmlFor={q.name}>
                  {q.name}
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

            <button
              className="btn"
              type="button"
              onClick={handleFinalSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Preview;
