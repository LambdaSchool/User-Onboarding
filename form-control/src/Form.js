import React from "react";
import { useState, useEffect } from "react";
import { userSchema } from "./Validations/UserValidation";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core";

const Form = ({ addUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    favDog: "",
    likesCheese: "",
    tos: false,
  });

  const [disabled, setDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState({
    name: "Enter your Name",
    email: "",
    password: "",
    tos: "",
  });

  const submitHandler = (evt) => {
    evt.preventDefault();
    addUser(form);
    setForm({
      name: "",
      email: "",
      password: "",
      favDog: "",
      tos: false,
      likesCheese: "",
    });
  };

  useEffect(() => {
    userSchema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const changeHandler = (evt) => {
    const { name, value, type, checked } = evt.target;
    const realVal = type === "checkbox" ? checked : value;
    yup
      .reach(userSchema, name)
      .validate(realVal)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
    setForm({ ...form, [name]: realVal });
  };

  return (
    <div class="form">
      <form onSubmit={submitHandler}>
        <label>
          <TextField
            type="text"
            name="name"
            value={form.name}
            onChange={changeHandler}
            placeholder="Name"
          />
        </label>
        <label>
          <TextField
            type="text"
            name="email"
            onChange={changeHandler}
            value={form.email}
            placeholder="email"
          />
        </label>
        <label>
          <TextField
            type="password"
            name="password"
            value={form.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </label>
        <br />
        <br />
        <span class="input">Preferred Cheese - </span>
        <label>
          {" "}
          Blue
          <input
            type="radio"
            name="likesCheese"
            value="blue"
            checked={form.likesCheese === "blue"}
            onChange={changeHandler}
          />
        </label>
        <label>
          {" "}
          Cheddar
          <input
            type="radio"
            name="likesCheese"
            value="cheddar"
            checked={form.likesCheese === "cheddar"}
            onChange={changeHandler}
          />
        </label>
        <label>
          {" "}
          I don't like cheese
          <input
            type="radio"
            name="likesCheese"
            value="no"
            checked={form.likesCheese === "no"}
            onChange={changeHandler}
          />
        </label>
        <br />
        <br />

        <label class="input">
          <select value={form.favDog} onChange={changeHandler} name="favDog">
            <option value="0">Select a doggo if you like doggos</option>
            <option value="1">Lab</option>
            <option value="2">Poodle</option>
            <option value="3">Bulldog</option>
          </select>
        </label>
        <br />
        <br />
        <br />
        <label class="input">
          {" "}
          Agree to Terms of Service
          <Checkbox
            type="checkbox"
            name="tos"
            checked={form.tos}
            onChange={changeHandler}
            color="primary"
          />
        </label>
        <br />
        <br />
        <Button
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          onSubmit={submitHandler}
          disabled={disabled}
          endIcon={<SaveIcon />}
        >
          {" "}
          Submit{" "}
        </Button>
      </form>
      <Card>
        <CardContent>
          <Typography>
            {disabled ? "*Form is not ready to submit. See errors below" : ""}
          </Typography>
          {formErrors.name}
          <Typography>{formErrors.email}</Typography>
          <Typography>{formErrors.password}</Typography>
          <Typography>{formErrors.tos}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
