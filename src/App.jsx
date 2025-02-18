import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Events from "./Pages/Events/YnL";
import YoungAndLoudForm from "./EventForms/YoundAndLoud/YoungAndLoudForm";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";
import Attendees_details from "./Components/Admin/AdminEventsData/Attendees_details";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/events" element={ <Events /> } />
        <Route path="/young_loud_form" element={ <YoungAndLoudForm /> } />
        <Route path="/mel-attendees/y&l-16-11-2024" element={ <AdminHome /> } />
        {/* <Route path="/attendees-details" element={<Attendees_details/>  }/> */}
      </Routes>
     
    </>
  );
}

export default App;
