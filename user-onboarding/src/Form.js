import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import axios from 'axios';

let schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
    termsInput: yup.boolean().required("Do you agree to terms?")
  });

export default function Form() {

        const [form, setForm] = useState({
            name: "",
            email: "",
            password: "",
            termsInput: false
          });

          const [user, setUser] = useState([])

        const [errors, setErrors] = useState({
            name: "",
            email: "",
            password: "",
            termsInput: false
          });
        const [disabled, setDisabled] = useState(true);

        const setFormErrors = (name, value) => {
            yup
              .reach(schema, name)
              .validate(value)
              .then(() => setErrors({ ...errors, [name]: "" }))
              .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
          };
    
        const onChange = (event) => {
            const { name, type, value, checked } = event.target;
            const valueToUse = type === "checkbox" ? checked : value;
            setFormErrors(name, valueToUse);
            setForm({ ...form, [name]: valueToUse });
            console.log("Being Changed");
          };
    
        const submitHandler = (event) => {
            event.preventDefault();
            console.log(form);
            axios
              .post("https://reqres.in/api/users", form)
              .then((res) => {
                setUser([...user,res.data]);
                console.log("success", res);
              })
              .catch((err) => {
                debugger;
              });
          };

          console.log(axios.post)
          useEffect(() => {
            schema.isValid(form).then((valid) => setDisabled(!valid));
          }, [form]);

         
    

    return (
        <form className='form container' onSubmit={submitHandler}>
          <div className='form-group inputs'>

            <label>Name
              <input type="text" onChange={onChange} name="name" values={form.name}/>
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.name}</div>
            </div>
    
            <label>Email
              <input type="email" onChange={onChange} name="email" values={form.email}/>
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.email}</div>
            </div>

            <label>Password
              <input onChange={onChange} name="password" type="password" values={form.password}/>
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.password}</div>
            </div>

            <label htmlFor="termsInput">
        Do you agree to the terms and conditions?
                <input id="termsInput" type="checkbox" name="terms" />
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.termsInput}</div>
            </div>
    
            <div className='submit'>
              <button disabled={disabled}>Submit</button>
            </div>

            <div>{JSON.stringify(user)}</div>

          </div>
        </form>
      )
    }
