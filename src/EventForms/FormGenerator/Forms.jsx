import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../../assets/N8.png";
import { apiBaseUrl } from "../../constants";
import Swal from "sweetalert2";
import "./Forms.css";

const Forms = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/events/${id}`);
        const data = await response.json();
        setEventData(data);
        // Initialize form values
        const initialValues = {};
        data.form_data?.forEach((q) => {
          initialValues[q.name] = "";
        });
        setFormValues(initialValues);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    // Validate required fields
    const errors = {};
    eventData.form_data?.forEach((q) => {
      if (q.required && !formValues[q.name]?.trim()) {
        errors[q.name] = "This field is required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmit(false);
      return;
    } else {
      setFormErrors({});
    }

    const submissionData = {
      name: eventData.name,
      form_data: formValues,
    };
    console.log("Submitting:", submissionData);

    try {
      const res = await fetch(`${apiBaseUrl}/attendees/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Form submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormValues({});
      } else {
        Swal.fire({
          title: "Error!",
          text: `Failed to submit form.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setSubmit(false);
    }
  };

  if (loading) {
    return (
      <div className="contents">
        <div className="loading">
          <p>Loading form...</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="contents">
        <div className="no-events">
          <p>Could not load the event form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contents">
      <div className="logo">
        <Link to="/events">
          <img src={logo} alt="" />
        </Link>
      </div>

      <div className="form_card">
        <h2>Provide your Details below</h2>
        <form className="form_content" onSubmit={handleSubmit}>
          {eventData.form_data?.map((q, i) => (
            <div key={i} className="content name">
              <label htmlFor={q.name}>
                {q.label}
                {q.required && <span style={{ color: "red" }}> * </span>}
              </label>
              <input
                className="inputField"
                type="text"
                id={q.name}
                name={q.name}
                // required={q.required}
                placeholder={q.label}
                value={formValues[q.name] || ""}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    [q.name]: e.target.value,
                  }))
                }
              />
              {formErrors[q.name] && (
                <p className="error-text">{formErrors[q.name]}</p>
              )}
            </div>
          ))}
          <button type="submit" className="btn" disabled={submit}>
            {submit ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;
