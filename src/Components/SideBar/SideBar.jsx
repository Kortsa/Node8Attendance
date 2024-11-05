import React from "react";
import { Link } from "react-router-dom";
import Students from "../../assets/students.png";
import Events from "../../assets/Visitors.png";
import Visitors from "../../assets/visitors.png";
import Employee from "../../assets/employees.png";
import "../SideBar/SideBar.css"

const tabs = [
  {
    name: "Employees",
    icon: Employee,
    to: "",
  },
  {
    name: "Students",
    icon: Students,
    to: "",
  },
  {
    name: "Visitors",
    icon: Visitors,
    to: "",
  },
  {
    name: "Events",
    icon: Events,
    to: "",
  },
];

function SideBar() {
  return (
    <div className="sidebar_content">
      <div className="tabs">
        {tabs.map((tab, id) => {
          return (
            <Link key={id} className="tab">
              <img src={tab.icon} alt="" />
              <div>{tab.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
