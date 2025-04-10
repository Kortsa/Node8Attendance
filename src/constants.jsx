import Students from "./assets/Group3.png";
import Events from "./assets/Group36.png";
import Visitors from "./assets/Group.png";
import Employee from "./assets/employees.png";
import AddIcon from "./assets/add.png";

// constants.jsx

export const apiBaseUrl = import.meta.env.VITE_ROOT_API_URL;

export const AdminTabs = [
  {
    id: 1,
    name: "Employees",
    icon: Employee,
    to: "",
  },
  {
    id: 2,
    name: "Students",
    icon: Students,
    to: "",
  },
  {
    id: 3,
    name: "Visitors",
    icon: Visitors,
    to: "",
  },
  {
    id: 4,
    name: "Events",
    icon: Events,
    to: "",
    icon2: AddIcon,
  },
];

export const headers = [
  { label: "#", key: "number" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Gender", key: "sex" },
  { label: "Number", key: "phone_number" },
  { label: "Place", key: "resident" },
  { label: "School", key: "school_level" },
  { label: "Work", key: "position" },
  { label: "How did you hear", key: "ad" },
  { label: "Updates", key: "sms_alert" },
  { label: "Interests", key: "interest" },
];
