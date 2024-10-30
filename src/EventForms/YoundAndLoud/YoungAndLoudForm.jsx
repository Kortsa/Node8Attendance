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
            <div className="content school">
              <label>School level/work</label>
              <input
                type="text"
                placeholder="Enter your school ..."
                className="inputField"
              />
            </div>
            <div className="content ">
              <label>How did you hear of the festvial</label>
              <select className="inputField">
                <option value="">Select one</option>
                <option value="male">From a friend</option>
                <option value="female">Social Media</option>
              </select>
            </div>
            <div className="content school">
              <label>Which of the festival are most interested in</label>
              <select className="inputField">
                <option value="">Select one</option>
                <option value="male">Arts</option>
                <option value="female">Jams</option>
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
