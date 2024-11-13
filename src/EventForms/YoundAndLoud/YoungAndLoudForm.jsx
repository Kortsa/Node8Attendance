import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/N8.png";
import "../YoundAndLoud/YoundAndLoudForm.css";

const YoungAndLoudForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    name: "",
    sex: "",
    resident: "",
    phone_number: "",
    school_level: "",
    position: "",
    ad: "",
    interest: "",
    sms_alert: "",
    other_position: "",
    other_ad: "",
    other_interest: "",
  });
  const [errors, setErrors] = useState({});
  const [showOtherPosition, setShowOtherPosition] = useState(false);
  const [showOtherAd, setShowOtherAd] = useState(false);
  const [showOtherInterest, setShowOtherInterest] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change

    if (name === "position" && value === "Others") {
      setShowOtherPosition(true);
    } else if (name === "position") {
      setShowOtherPosition(false);
    }

    if (name === "ad" && value === "Others") {
      setShowOtherAd(true);
    } else if (name === "ad") {
      setShowOtherAd(false);
    }

    if (name === "interest" && value === "Others") {
      setShowOtherInterest(true);
    } else if (name === "interest") {
      setShowOtherInterest(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        key !== "phone_number" &&
        key !== "name" &&
        key !== "school_level" &&
        key !== "position" &&
        key !== "other_position" &&
        key !== "other_ad" &&
        key !== "other_interest"
      ) {
        newErrors[key] = `${key.replace("_", " ")} is required`;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Replace "Others" with actual input values
      const submissionData = { ...formData };
      if (submissionData.position === "Others") {
        submissionData.position = submissionData.other_position;
      }
      if (submissionData.ad === "Others") {
        submissionData.ad = submissionData.other_ad;
      }
      if (submissionData.interest === "Others") {
        submissionData.interest = submissionData.other_interest;
      }

      try {
        const response = await fetch(
          "https://timesync-backend-production.up.railway.app/attendees/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(formData),
            body: JSON.stringify(submissionData),
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
            age: "",
            name: "",
            sex: "",
            resident: "",
            phone_number: "",
            school_level: "",
            position: "",
            ad: "",
            interest: "",
            sms_alert: "",
            other_position: "",
            other_ad: "",
            other_interest: "",
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
        // console.error("Error submitting form:", error);
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
            <label>First Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name ..."
              className="inputField"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="content name">
            <label>
              Age <span>*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age ..."
              className="inputField"
            />
            {errors.age && <p className="error-text">{errors.age}</p>}
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
            >
              <option value="">Select your sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex && <p className="error-text">{errors.sex}</p>}
          </div>
          <div className="content place">
            <label>
              Place of residence <span>*</span>
            </label>
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
            <label>Phone number</label>
            <input
              type="number"
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
              <option value="Keke Driver">Keke Driver</option>
              <option value="bike Driver">Bike Driver</option>
              <option value="Trader">Trader</option>
              <option value="Teacher">Unemployed</option>
              <option value="Others">Others</option>
            </select>
            {errors.position && <p className="error-text">{errors.position}</p>}
            {showOtherPosition && (
              <input
                type="text"
                name="other_position"
                value={formData.other_position}
                onChange={handleChange}
                placeholder="Please specify"
              />
            )}
          </div>
          <div className="content">
            <label>
              How did you hear of the festival <span>*</span>
            </label>
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
              <option value="Flyers">Flyers in town</option>
              <option value="Others">Others</option>
            </select>
            {errors.ad && <p className="error-text">{errors.ad}</p>}
            {showOtherAd && (
              <input
                type="text"
                name="other_ad"
                value={formData.other_ad}
                onChange={handleChange}
                placeholder="Please specify"
              />
            )}
            {errors.other_ad && <p className="error-text">{errors.other_ad}</p>}
          </div>

          <div className="content school">
            <label>
              Which part of the festival are you most interested in{" "}
              <span>*</span>
            </label>
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="Artist Performance">Artist Performance</option>
              <option value="Live Painting">Homeboyz Performance</option>
              <option value="Live Painting">Live Painting</option>
              <option value="Street Games">Street Games</option>
              <option value="Skating">Skating</option>
              <option value="Talent Contest">Talent Contest</option>
              <option value="All">All</option>
              <option value="Others">Others</option>
            </select>
            {errors.interest && <p className="error-text">{errors.interest}</p>}
            {showOtherInterest && (
              <input
                type="text"
                name="other_interest"
                value={formData.other_interest}
                onChange={handleChange}
                placeholder="Please specify"
              />
            )}
          </div>
          <div className="content school">
            <label>
              Will you like to receive updates on the Young and Loud festival
              and Young and Safe Project in general via sms <span>*</span>
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
