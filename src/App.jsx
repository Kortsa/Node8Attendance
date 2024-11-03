import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Events from "./Pages/Visitors/Events";
import YoungAndLoudForm from "./EventForms/YoundAndLoud/YoungAndLoudForm";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/events" element={ <Events /> } />
        <Route path="/young_loud_form" element={ <YoungAndLoudForm /> } />
        <Route path="/admin/home" element={ <AdminHome /> } />
      </Routes>
     
    </>
  );
}

export default App;
