import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Events from "./Pages/Visitors/Events";
import YoungAndLoudForm from "./EventForms/YoundAndLoud/YoungAndLoudForm";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/events" element={ <Events /> } />
        <Route path="/young_loud_form" element={ <YoungAndLoudForm /> } />
      </Routes>
     
    </>
  );
}

export default App;
