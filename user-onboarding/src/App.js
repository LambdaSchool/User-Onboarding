import React, { useState, useEffect } from 'react'
import User from './User'
import Form from './Form'

// 🔥  FLESH OUT Form.js
// 🔥  FLESH THE SCHEMA IN ITS OWN FILE
// 🔥  IMPORT THE SCHEMA, AXIOS AND YUP
import axios from 'axios'
import formSchema from './formSchema'
import * as yup from 'yup'


//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  name: '',
  email: '',
  password: '',
  ///// CHECKBOXES /////
  Agree: false,
  Disagree: false,
  
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
 
}
const initialUsers = []
const initialDisabled = true


export default function App() {
  //////////////// STATES ////////////////
  const [users, setUsers] = useState(initialUsers)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean
  //////////////// HELPERS ////////////////
  const postNewMember = newMember => {
    // 🔥 IMPLEMENT! ON SUCCESS ADD NEWLY CREATED MEMBER TO STATE
    //    helper to [POST] `newMember` to `http://buddies.com/api/friends`
    //    and regardless of success or failure, the form should reset
    axios.post('https://reqres.in/api/users', newMember)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err);
      })
      setFormValues(initialFormValues)
  }

  //////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        // happy path
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      
      // 🔥 AGREE TO THE TERMS
      TermsOfService: ['Agree', 'Disagree','Skip'].filter(term => formValues[term])
    }
    // 🔥 STEP 8- POST NEW MEMBER USING HELPER
    postNewMember(newUser)
  }

  //////////////// SIDE EFFECTS ////////////////
  
  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>User-onboard App</h1></header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}