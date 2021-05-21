import React from "react";

function Friend({ details }) {
  console.log("this is friend details", details);
  return (
    <div className="friendContainer">
      <h2>{`Hi, my name is ${details.name} and I like to party`}</h2>
      <p>Email: {details.email}</p>
      <p>Password: it's_a-secret</p>
    </div>
  );
}

export default Friend;
