import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Events from "./Pages/Events/AllEvents";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";
import Preview from "./Components/Admin/SideBar/Preview";
import Forms from "./EventForms/FormGenerator/Forms";
// import Attendees_details from "./Components/Admin/AdminEventsData/Attendees_details";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event_form/:id" element={<Forms />} />
        <Route path="/mel-attendees/y&l-16-11-2024" element={<AdminHome />} />
        <Route path="/preview" element={<Preview />} />
        {/* <Route path="/attendees-details" element={<Attendees_details/>  }/> */}
      </Routes>
    </>
  );
}

export default App;
