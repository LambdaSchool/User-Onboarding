import React from 'react'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Form() {

  const initialFormState =
{
  name: '',
  email: '',
  password: '',
  terms: false,
}

  const [formState, setFormState] = useState(initialFormState)

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errorState, setErrorState] = useState({
    name: '',
    email: '',
    password: '',
    tos: '',
  })

  const newUserSchema = yup.object().shape({
    name: yup.string().required('please enter a name'),
    email: yup.string().required('please enter a valid email address').email(),
    password: yup.string().required('please provide a valid password'),
    tos: yup.boolean().oneOf([true],'Must accept terms of service')
   })

   useEffect(() => {
     newUserSchema.isValid(formState).then((valid) => {
       setButtonDisabled(!valid);
     });
   }, [formState])

   const inputChange = e => {
    e.persist();
    validate(e);
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormState({ ...formState, [e.target.name]: value })
  };

  const onSubmit = e => {
    e.preventDefault()
    console.log('form has been submitted')
    setFormState(formState)
    axios.post('https://reqres.in/api/users', formState)
    .then(response => {
      console.log(response.data)
  })
  .catch(err => console.log('error'))
  }

  const validate = e => {
  yup.reach(newUserSchema, e.target.name)
  .validate(e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  .then(valid => {
    setErrorState({
      ...errorState,
      [e.target.name]: '',
    });
  })
  .catch(err => {
    setErrorState({
      ...errorState,
      [e.target.name]: err.errors[0],
    })
  })

   // end of handle submit
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
      <label>Name
        <input
          name='name'
          type='text'
          id="name"
          onChange={inputChange}
        />
        {errorState.name.length > 0 ? <p>{errorState.name}</p> : null}
      </label>
      <label>Email
        <input
          name='email'
          type='text'
          id="email"
          onChange={inputChange}
        />
        {errorState.email.length > 0 ? <p>{errorState.email}</p> : null}
      </label>
      <label>Password
        <input
          name='password'
          type='password'
          id="password"
          onChange={inputChange}
        />
        {errorState.password.length > 0 ? <p>{errorState.password}</p> : null}
      </label>
      <label>Terms of Service
        <input
          name='tos'
          type='checkbox'
          id="tos"
          onChange={inputChange}
        />
        {errorState.tos.length > 0 ? <p>{errorState.tos}</p> : null}
      </label>
      <label>
          <input
            type='submit'
            disabled={buttonDisabled}
          />
        </label>
    </form>
    </div>
  )
}
