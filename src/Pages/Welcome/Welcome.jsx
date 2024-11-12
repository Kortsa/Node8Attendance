import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import logo from "../../assets/N8.png";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";

import "../Welcome/Welcome.css";

// Set the app element for accessibility
Modal.setAppElement("#root");

const Welcome = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const eventBtn = () => {
    navigate("/events");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === "admin@nodeeight" && password === "randomBytes") {
        setLoading(false);
        Swal.fire({
          title: "Tym Sync",
          text: `You've Successfully Logged in as ${"Admin"}`,
          icon: "success",
          customClass: {
            title: "font-quicksand",
            text: "font-quicksand",
          },
        });
        navigate("/admin/home");
      } else {
        Swal.fire({
          title: "Tym Sync",
          text: `No user found, try again`,
          icon: "error",
          customClass: {
            title: "font-quicksand",
            text: "font-quicksand",
          },
        });
        setLoading(false);
        return;
      }

      // After loading, navigate to the next page
      setLoading(false);
      // Navigate logic here
    }, 2000); // Simulated loading time: 2 seconds
  };

  return (
    <>
      <div className="contents">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="welcomeCard">
          <h2>Welcome</h2>
          <div className="card" onClick={openModal}>
            <h1>Login</h1>
            <p>Admin, staff and students</p>
          </div>
          <div className="card">
            <h1>Visitors</h1>
          </div>
          <div className="card" onClick={eventBtn}>
            <h1>Events</h1>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Login</h2>
        <form className="login-form" onSubmit={(e) => handleLoginClick(e)}>
          <div className="form-group">
            {/* <MdPerson className="icon" /> */}
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Student/Staff/Admin ID"
              required
            />
          </div>
          <div className="form-group">
            {/* <AiOutlineEye className="icon" /> */}
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <a>Forget Password</a>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Please wait... logging in" : "Login"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Welcome;
