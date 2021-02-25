import "./App.css";
import Form from "./Form";
import { useState, useEffect } from "react";
import React from "react";
import User from "./User";
import Axios from "axios";
import AppBar from "@material-ui/core/AppBar";

function App() {
  const [users, setUsers] = useState([]);

  // Initially grabbed users from API
  // useEffect(() => {
  //   Axios.get("https://reqres.in/api/users")
  //     .then((res) => {
  //       const data = res.data.data;
  //       setUsers(
  //         data.map((person) => {
  //           return {
  //             name: person.first_name,
  //             email: person.email,
  //             pic: person.avatar,
  //           };
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const addUser = (user) => {
    Axios.post("https://reqres.in/api/users", user)
      .then((res) => {
        let userGot = res.data;
        setUsers([
          ...users,
          {
            name: userGot.name.trim(),
            email: userGot.email.trim(),
            password: userGot.password.trim(),
            favDog: userGot.favDog.trim(),
            id: userGot.id,
            createdAt: userGot.createdAt,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <AppBar position="static">
        {" "}
        <h1> Controlled Form Module</h1>
      </AppBar>
      <Form addUser={addUser} />
      <h3> Existing Users</h3>
      {users.map((user, idx) => {
        return <User user={user} key={idx} />;
      })}
    </div>
  );
}

export default App;
