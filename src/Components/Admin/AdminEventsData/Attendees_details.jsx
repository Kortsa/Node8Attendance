import React from "react";
import searchIcon from "../../../assets/search.png";
import "../AdminEventsData/Attendees_details.css";

const headers = [
  "Name",
  "Gender",
  "Number",
  "Place",
  "School",
  "Work",
  "How did you hear",
  "Updates",
  "Interests",
];

const CollectedDetails = [
  {
    name: "Leo Kortsa",
    gender: "Male",
    number: "0544993044",
    place: "Aflao",
    school: "shs",
    work: "dev",
    hear: "instagram",
    upadtes: "Yes",
    interest: "arts",
  },
];
function Attendees_details() {
  return (
    <div className="attendee-content">
      <div className="top-content">
        <div className="search_container">
          <input
            type="search"
            placeholder="Search for events, programs ..."
            className="inputField"
          />
          <span className="searchIcon">
            <img src={searchIcon} alt="" />
          </span>
        </div>
        <div className="avatar"></div>
      </div>

      {/* <div className="card">
        <h3>Last Friday Hangout</h3>
        <h4>40</h4>
      </div> */}
      <div className="collected-details">
        <div className="headers">
          {headers.map((head, id) => {
            return (
              <div key={id} className="header">
                {head}
              </div>
            );
          })}
        </div>
        <div className="attendee-details">
          <div className="details">
            {
              CollectedDetails.map((detail, id) =>{
                return(
                  <div className="detail" key={id}>
                     <h3>{detail.name}</h3>
                    <h3>{detail.gender}</h3>
                    <h3>{detail.number}</h3>
                    <h3>{detail.place}</h3>
                    <h3>{detail.school}</h3>
                    <h3>{detail.work}</h3>
                    <h3>{detail.hear}</h3>
                    <h3 className="update">{detail.upadtes}</h3>
                    <h3 className="interest">{detail.interest}</h3>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendees_details;
