import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import * as Yup from "yup";
import SignupForm from './Form'

// variables
const defaultValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}
const defaultErrors = {
  name: '',
  email: '',
  password: '',
  terms: ''
}
const defaultDisable = true
const firstUsers = []

// Schema
const formSchema = Yup.object().shape({
  
 
  name: Yup
    .string()
    .min(3, "Name not long enough"),
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup
    .string()
    .min(6, "Password not long enough")
    .required("Password is Required"),
  terms: Yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions!"),
})

// User Component
function UserCard(props){
  return(
    <div>
      {console.log(props)}
  <h1>{props.details.name}</h1>
  <p>{props.details.email}</p>
  <p>{props.details.password}</p>
    </div>
  )
}



// App Component
function App() {
  // Variables
  const [users, setUsers] = useState(firstUsers)
  const [formValues, setFormValues] = useState(defaultValues)
  const [disabled, setDisabled] = useState(defaultDisable)
  const [errors, setErrors] = useState(defaultErrors)


// post Req
const postNewUser = newUser => {
  axios.post('https://reqres.in/api/users', newUser)
  .then(res=>{
    console.log(res.data)
    setUsers([...users, res.data])
  })
  .catch(err=>{
    console.log(err)
  })
  .finally(()=>{
    setFormValues(defaultValues)
  })
}
  // Effects
    /* Each time the form value state is updated, check to see if it is valid per our schema. 
  This will allow us to enable/disable the submit button.*/
  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    });
  }, [formValues]);




// SUBmit
const submit = event => {
  event.preventDefault()
  const newUser = {
    name: formValues.name,
    email:formValues.email,
    password: formValues.password
  }


  postNewUser(newUser)

}

  // OnCHange Funciton
  const changeVal = event => {
    
    const {name, value} = event.target

    // VALIDATION
    Yup
    .reach(formSchema, name)
    //we can then run validate using the value
    .validate(value)
    // if the validation is successful, we can clear the error message
    .then(() => {
      setErrors({
        ...errors,
        [name]: ""
      })
    })
    /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
    .catch(err => {
      setErrors({
        ...errors,
        [name]: err.errors[0] // investigate
      })
    })

    setFormValues({
      ...formValues,
      [name]:value
    })
  }

  const checkChange = event => {
    const {name, checked} = event.target
    
    setFormValues({
      ...formValues,
      [name]:checked
    })
  }

  return (
    <div className="App">
      <SignupForm values={formValues} changeVal={changeVal} checkChange={checkChange} disabled={disabled} submit={submit} errors={errors} />
        {users.map(user=>{
         return <UserCard details={user} />
        })}
        
     
   
    </div>
  );
}

export default App;
