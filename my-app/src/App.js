import "./App.css";
import Form from "./Form";
import React, { useState, useEffect } from "react";
import Friend from "./Friend";

import formSchema from "./formSchema";
import * as yup from "yup";
import axios from "axios";

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  terms: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
};

const initialFriends = [];
const initialDisabled = true;

function App() {
  ///////////////STATES//////////////
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [friends, setFriends] = useState(initialFriends);

  const postNewFriend = (newFriend) => {
    axios
      .post("https://reqres.in/api/users", newFriend)
      .then((res) => {
        setFriends([res.data, ...friends]);
      })
      .catch((err) => {
        console.timeLog(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
        console.log(setFormValues);
      });
  };

  const validate = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  ////////////Event Handlers//////////
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newFriend = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    };
    postNewFriend(newFriend);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="appContainer">
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      <div>
        {friends.map((friend) => {
          return <Friend key={friend.id} details={friend} />;
        })}
      </div>
    </div>
  );
}

export default App;
