import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/N8.png";
import "../YoundAndLoud/YoundAndLoudForm.css";

const YoungAndLoudForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    resident: "",
    phone_number: "",
    school_level: "",
    position: "",
    ad: "",
    interest: "",
    sms_alert: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "phone_number") {
        newErrors[key] = "This field is required";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await fetch(
          "https://timesync-backend-production.up.railway.app/attendees/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        // console.log("Response data:", data);

        if (response.ok) {
         
          Swal.fire({
            title: "Success!",
            text: "Form submitted successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          // Reset form fields
          setFormData({
            name: "",
            sex: "",
            resident: "",
            phone_number: "",
            school_level: "",
            position: "",
            ad: "",
            interest: "",
            sms_alert: "",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `Failed to submit form.`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="contents">
      <div className="logo">
        <Link to="/events">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="form_card">
        <h2>Provide your Details below</h2>
        <form onSubmit={handleSubmit} className="form_content">
          <div className="content name">
            <label>
              Name <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name ..."
              className="inputField"
              required
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="content sex">
            <label>
              Sex <span>*</span>
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="inputField"
              required
            >
              <option value="">Select your sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex && <p className="error-text">{errors.sex}</p>}
          </div>
          <div className="content place">
            <label>Place of residence</label>
            <input
              type="text"
              name="resident"
              value={formData.resident}
              onChange={handleChange}
              className="inputField"
            />
            {errors.resident && <p className="error-text">{errors.resident}</p>}
          </div>
          <div className="content place">
            <label>Phone number (optional)</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter your number ..."
              className="inputField"
            />
          </div>
          <div className="content">
            <label>School Level</label>
            <select
              name="school_level"
              value={formData.school_level}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="JHS">JHS</option>
              <option value="SHS">SHS</option>
              <option value="Tertiary">Tertiary</option>
            </select>
            {errors.school_level && (
              <p className="error-text">{errors.school_level}</p>
            )}
          </div>
          <div className="content">
            <label>Occupation</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="Apprentice">Apprentice</option>
              <option value="Keke Driver">Keke Driver</option>
              <option value="Trader">Trader</option>
              <option value="Teacher">Teacher</option>
              <option value="Banker">Banker</option>
              <option value="Others">Others</option>
            </select>
            {errors.position && <p className="error-text">{errors.position}</p>}
          </div>
          <div className="content">
            <label>How did you hear of the festival</label>
            <select
              name="ad"
              value={formData.ad}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="Radio">Radio</option>
              <option value="School Announcement">School Announcement</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Friends">Friends</option>
              <option value="Others">Others</option>
            </select>
            {errors.ad && <p className="error-text">{errors.ad}</p>}
          </div>
          <div className="content school">
            <label>Which part of the festival are you most interested in</label>
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="Artist Performance">Artist Performance</option>
              <option value="Live Painting">Live Painting</option>
              <option value="Street Games">Street Games</option>
              <option value="Skating">Skating</option>
              <option value="Talent Contest">Talent Contest</option>
              <option value="All">All</option>
            </select>
            {errors.interest && <p className="error-text">{errors.interest}</p>}
          </div>
          <div className="content school">
            <label>
              Will you like to receive updates on the Young and Loud festival
              and Young and Safe Project in general via sms
            </label>
            <select
              name="sms_alert"
              value={formData.sms_alert}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.sms_alert && (
              <p className="error-text">{errors.sms_alert}</p>
            )}
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default YoungAndLoudForm;
