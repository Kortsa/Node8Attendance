import { Link } from "react-router-dom"
import logo from "../../assets/N8.png";
import "../YoundAndLoud/YoundAndLoudForm.css"

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

        </div>
      
      </div>
    </>
  )
}

export default YoungAndLoudForm
