import React from "react";
import SideBar from "../SideBar/SideBar";

import "../AdminHome/AdminHome.css";
import Attendees_details from "../AdminEventsData/Attendees_details";

const AdminHome = () => {
  return (
    <div className="admin-content">
      <SideBar />
      <Attendees_details />
    </div>
  );
};

export default AdminHome;
