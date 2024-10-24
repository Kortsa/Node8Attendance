import logo from "../../assets/N8.png";
import "../Welcome/Welcome.css";
import { useNavigate, Link } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const eventBtn = () => {
    navigate("/events");
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
          <div className="card">
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
    </>
  );
};

export default Welcome;
