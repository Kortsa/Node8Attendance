import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Events from "./Pages/Visitors/Events";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/events" element={ <Events /> } />
      </Routes>
     
    </>
  );
}

export default App;
