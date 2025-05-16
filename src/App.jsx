import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Events from "./Pages/Events/AllEvents";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";
import Preview from "./Components/Admin/SideBar/Preview";
import Forms from "./EventForms/FormGenerator/Forms";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event_form/:id" element={<Forms />} />
        <Route path="/admin-dashboard" element={<AdminHome />} />
        <Route path="/preview" element={<Preview />} />
        
      </Routes>
    </>
  );
}

export default App;
