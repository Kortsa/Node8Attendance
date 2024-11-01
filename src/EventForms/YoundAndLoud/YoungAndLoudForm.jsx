import { Link } from "react-router-dom";
import logo from "../../assets/N8.png";
import "../YoundAndLoud/YoundAndLoudForm.css";

const YoungAndLoudForm = () => {
  return (
    <>
      <div className="contents">
        <div className="logo">
          <Link to="/events">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="form_card">
          <h2>Provide your Details below</h2>
          <div className="form_content">
            <div className="content name">
              <label>
                Name <span>*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Enter your full name ..."
                className="inputField"
              />
            </div>
            <div className="content sex">
              <label>
                Sex <span>*</span>
              </label>

              <select className="inputField" required>
                <option value="">Select your sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="content place">
              <label>Place of residence</label>
              <input type="text" className="inputField" />
            </div>
            <div className="content place">
              <label>Phone number (optional)</label>
              <input
                type="text"
                placeholder="Enter your number ..."
                className="inputField"
              />
            </div>
            <div className="content ">
              <label>School Level</label>
              <select className="inputField">
                <option value="">Select one</option>
                <option value="male">JHS</option>
                <option value="female">SHS</option>
                <option value="female">Tertiary</option>
              </select>
            </div>
            <div className="content ">
              <label>Work</label>
              <select className="inputField">
                <option value="">Select one</option>
                <option value="male">Apprentice</option>
                <option value="female">Keke Driver</option>
                <option value="female">Trader</option>
                <option value="female">Teacher</option>
                <option value="female">Banker</option>
                <option value="female">Others</option>
              </select>
            </div>
            <div className="content ">
              <label>How did you hear of the festvial</label>
              <select className="inputField">
                <option value="">Select one</option>
                <option value="male">Radio</option>
                <option value="female">School Annoucement</option>
                <option value="female">Instagram</option>
                <option value="female">Facebook</option>
                <option value="female">Friends</option>
                <option value="female">Others</option>
              </select>
            </div>
            <div className="content school">
              <label>Which of the festival are most interested in</label>
              <select className="inputField">
                <option value="">Select one</option>
                <option value="male">Artist Performance</option>
                <option value="female">Live Painting</option>
                <option value="female">Street Games</option>
                <option value="female">Skating</option>
                <option value="female">Talent Contest</option>
                <option value="female">All</option>
                {/* add more categories */}
              </select>
            </div>
            <div className="content school">
              <label>
                Will you like to receive updates on the Young and Loud festival
                and Young and Safe Project in general via sms
              </label>
              <select className="inputField">
                <option value="">Select one</option>
                <option value="male">Yes</option>
                <option value="female">No</option>
              </select>
            </div>
          </div>
          <div className="btn">Submit</div>
        </div>
      </div>
    </>
  );
};

export default YoungAndLoudForm;
