import React, {useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup'; 



const Form = () => {



  //STATES

  //control the initial and subsequent states of the form
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    terms: false
  })

  //control submit button visibility
  const [buttonDisabled, setButtonDisabled] = useState(false)

  //post for database control
  const [users, setUsers] = useState([])

  //control errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  })

//END STATES




//VALIDATION

//yup schema-shape to validate input
const formSchema = yup.object().shape({
  name: yup
    .string() //must be a string
    .required('Name is a required field'), 
  email: yup
    .string()//must be a string
    .email()//must be in the shape of an email
    .required('A valid email is required'),
  password: yup
    .string()
    .required('Must create a password'),
  terms: yup
    .boolean()
    .oneOf([true])
})


  //if form meets validation schemas then enable the submit button
  const validForm = () => {
    formSchema.isValid(formState)
      .then(isValid => {
        setButtonDisabled(!isValid)
      })
  }
  useEffect(validForm, [formState]) //triggered by change in form state


  //validate changes from the synthetic event using the yup schema
  const validateChange = e => {

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ''
        })
      })
      .catch(error => {
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0]
        })
      })
  }

  //END VALIDATION




  //CHANGES AND SUBMIT

  //handles changes in the form and updates the formState using the spread op
  const handleChanges = e => {

    e.persist()

    const newFormData = {
      ...formState,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }

    validateChange(e)

    setFormState(newFormData)

  }

  //onSubmit function
  const formSubmit = e => {
    e.preventDefault()
    axios
      .post('https://reqres.in/api/users', formState)
      .then(res => {
        setUsers([...users, res.data])
        setFormState({
          name: '',
          email: '',
          password: '',
          terms: true
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  //END CHANGES AND SUBMIT


  return (
    <form onSubmit={formSubmit}>

      {/*Name input */}
      <label htmlFor='name'>
        Name
        <input 
        id='name'
        type='text'
        name='name'
        data-cy='name'
        value={formState.name}
        onChange={handleChanges}
        />

        {errors.name.length > 0 ? (<p className='error'>{errors.name}</p>): null}

      </label>

      {/*Email input */}
      <label htmlFor='email'>
        Email
        <input 
        id='email'
        type='text'
        name='email'
        data-cy='email'
        value={formState.email}
        onChange={handleChanges}
        />

        {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>): null}

      </label>

      {/*Password input */}
      <label htmlFor='password'>
        Create Password
        <input 
        id='password'
        type='password'
        name='password'
        data-cy='password'
        value={formState.password}
        onChange={handleChanges}
        />

        {errors.password.length > 0 ? (<p className='error'>{errors.password}</p>): null}

      </label>

      {/*Terms box */}
      <label htmlFor='terms' className='terms'>
        <input 
        id='terms'
        type='checkbox'
        name='terms'
        data-cy='terms'
        value={formState.terms}
        onChange={handleChanges}
        />
        Terms & Conditions

        {errors.terms.length > 0 ? (<p className='error'>{errors.terms}</p>): null}

      </label>

      <button data-cy='submit' disabled={buttonDisabled} type='submit'>Submit</button>

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </form>
  )


}


export default Form