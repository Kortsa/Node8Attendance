import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/N8.png";
import "../YoundAndLoud/YoundAndLoudForm.css";

const YoungAndLoudForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    place: "",
    phone: "",
    schoolLevel: "",
    work: "",
    heardFrom: "",
    interest: "",
    receiveUpdates: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "phone") {
        newErrors[key] = "This field is required";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Handle form submission logic here
      console.log("Form submitted with data:", formData);
      // Reset form fields
      setFormData({
        name: "",
        sex: "",
        place: "",
        phone: "",
        schoolLevel: "",
        work: "",
        heardFrom: "",
        interest: "",
        receiveUpdates: "",
      });
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
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="inputField"
            />
            {errors.place && <p className="error-text">{errors.place}</p>}
          </div>
          <div className="content place">
            <label>Phone number (optional)</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your number ..."
              className="inputField"
            />
          </div>
          <div className="content">
            <label>School Level</label>
            <select
              name="schoolLevel"
              value={formData.schoolLevel}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="JHS">JHS</option>
              <option value="SHS">SHS</option>
              <option value="Tertiary">Tertiary</option>
            </select>
            {errors.schoolLevel && (
              <p className="error-text">{errors.schoolLevel}</p>
            )}
          </div>
          <div className="content">
            <label>Occupation</label>
            <select
              name="work"
              value={formData.work}
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
            {errors.work && <p className="error-text">{errors.work}</p>}
          </div>
          <div className="content">
            <label>How did you hear of the festival</label>
            <select
              name="heardFrom"
              value={formData.heardFrom}
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
            {errors.heardFrom && (
              <p className="error-text">{errors.heardFrom}</p>
            )}
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
              name="receiveUpdates"
              value={formData.receiveUpdates}
              onChange={handleChange}
              className="inputField"
            >
              <option value="">Select one</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.receiveUpdates && (
              <p className="error-text">{errors.receiveUpdates}</p>
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
