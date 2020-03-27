import React, { useState, useEffect } from "react";
// import axios from "axios";
import * as yup from "yup";

//set up schema hah (weird word right) line: 10

//set up state for your button! - so you can disable it line: 24ish!!! PS ---- always put true in the parm for usestate! (not sure why.. but just do it )

//then set up useEffect so that the form can not submit with out all the right info!!! starting on line 26ish... Add disabled = {button} to button on the return hah.
//now you should not be able to submit until all feilds are filled

//next work on validateChange - this will help us to implement the error messages to show up! line 39 (also please comment out your orginal handle change (line 38).
// start!! You got this! line: 44 ish - start by making state for the errors

/// don't forget to write your error things in your return statments!!

//next input change! This makes it so that it is watching all the changes in the text box.

///THIS ALL FUCKING WORKS!! YAYAY

//for fun you can add getting a post??? see other file.

const formSchema = yup.object().shape({
  color: yup.string().required("This is a required feild "),
  food: yup.string().required("This is a required feild "),
  thoughts: yup.string().required("This is a required feild ")
});

export default function Form() {
  const [newEntry, setNewEntry] = useState({
    color: "",
    food: "",
    thoughts: ""
  });

  const [error, setError] = useState({
    color: "",
    food: "",
    thoughts: ""
  });

  const [button, setButton] = useState(true);

  useEffect(() => {
    formSchema.isValid(newEntry).then(yes => {
      console.log(yes);
      setButton(!yes);
    });
  }, [newEntry]);

  const validateChange = event => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(yes => {
        console.log(yes);
        setError({
          ...error,
          [event.target.name]: " "
        });
      })
      .catch(err => {
        console.log(err);
        setError({
          ...error,
          [event.target.name]: err.errors[0]
        });
      });
  };

  const formSubmit = event => {
    event.preventDefault();
    console.log("form submitted!");
  };

  const inputChange = event => {
    event.persist();
    const newFormValue = {
      ...newEntry,
      [event.target.name]: event.target.value
    };

    validateChange(event);
    setNewEntry(newFormValue);
  };

  console.log(validateChange);

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="Favorite Color">
        Favorite color :
        <input
          id="color"
          type="text"
          name="color"
          value={newEntry.color}
          onChange={inputChange}
        />
        {error.color.length > 0 ? <p>{error.color}</p> : null}
      </label>
      <br />
      <label htmlFor="Favorite Food">
        Favorite Food :
        <input
          id="food"
          type="text"
          name="food"
          value={newEntry.food}
          onChange={inputChange}
        />
        {error.food.length > 0 ? <p>{error.food}</p> : null}
      </label>
      <br />
      <label htmlFor="Who did you think you would be?">
        Who did you think you would be :
        <input
          id="thoughts"
          type="text"
          name="thoughts"
          value={newEntry.thoughts}
          onChange={inputChange}
        />
        {error.thoughts.length > 0 ? <p>{error.thoughts}</p> : null}
      </label>
      <br />
      <button disabled={button}>Submit</button>
    </form>
  );
}
