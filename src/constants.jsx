import Students from "./assets/Group3.png";
import Events from "./assets/Group36.png";
import Visitors from "./assets/Group.png";
import Employee from "./assets/employees.png";
import AddIcon from "./assets/add.png";

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




export const FetchAllEvents = async (page = 1, pageSize = 4) => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/events/?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    
    const events = data.data || [];
    const hasMore = events.length === pageSize;

    return {
      events,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      events: [],
      hasMore: false,
    };
  }
};


export const AdminFetchAllEvents = async (pageSize = 50) => {
  let allEvents = [];
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const response = await fetch(
        `${apiBaseUrl}/events/?page=${page}&page_size=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      allEvents = allEvents.concat(data.data || []);
      totalPages = data.meta?.num_of_pages || 1;
      page++;
    }

    return {
      events: allEvents,
      hasMore: false,
    };
  } catch (error) {
    console.error("Error fetching all events:", error);
    return {
      events: [],
      hasMore: false,
    };
  }
};

