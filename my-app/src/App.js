import logo from './logo.svg'
import App from './App.css'
import Form from "./Form"
import React, {useState, useEffect} from "react"
import * as Yup from "yup";
import axios from "axios"






// schema for vaildation  [  object, with certain shape, shape willhave key per input, a yup string requred  for vaildation error, lastly, add requirements  ]
const schema = Yup.object().shape({
  user: Yup.string().required("user is required").min(10,"must add 10 characters"),
  email:Yup.string().required("email is required"),
  password:Yup.string().required("password is required"),
agree:Yup.boolean().oneOf([true], "please provide your data"),
})


 export default function Appst(){
//(1)
const [errors, setErrors] = useState({ user: "", email: "", password:"", agree:"" })
  const [formState, setFormState] = useState({ user: "", email: "", password:"", agree: false,})
  const [disabled, setDisabled] = useState(true)
  
 
  const change = event => {
  const {checked,value,name,type} = event.target
  const valueTouse = type ==="checkbox" ? checked : value
  setFormErrors(name, valueTouse)
  setFormState({ ...formState, [name]: valueTouse })
  };

//add a new function for errors (5)
const setFormErrors = (name, value) => {
  Yup.reach(schema,name).validate(value).then(() => setErrors({...errors,[name]:""}) )
  .catch( err => setErrors({...errors, [name] : err.errors[0] }))
 } // the callback happens in a change durring a particular input




const submit = event => {
  event.preventDefault()
  const newUser = {user: formState.user.trim(), agree: formState.agree,  email: formState.email, password: formState.password}
  axios.post("https://reqres.in/api/users", newUser)
.then(res =>{
/// (7) 
setFormErrors({user: "", email: "", password:"", agree:"" })
})
.catch(err => {
 
})
}


    useEffect(() => {
      schema.isValid(formState).then( vaild => setDisabled(!vaild))
    },[formState])
//(2)
  return (
    <div className="App">

      <div style = {{ color: "red"}}>
        <div> {errors.user}</div>  <div> {errors.email}</div>   <div> {errors.password}</div> <div> {errors.agree}</div> </div>
       <form onSubmit={submit}>
      <label>
        User
        <input  onChange={change} value={formState.user}  name="user" type="text"  placeholder="name" />
      </label>
      <label >
        Email
        <input onChange={change}   value={formState.email}  name="email" type="text" placeholder="email" />
      </label>


      <label>
        Password
        <input  onChange={change}  value={formState.password}   name="password" type="password"  placeholder="input" />
      </label>
    

      <label >
        Do you agree to the terms and conditions? 
        <input onChange={change}  checked={formState.agree}  name = "agree" type="checkbox"/>
      </label>
      <button  disabled={disabled}> Submit!</button> 
    </form>
    </div>
  
  );
  

  // name is the input
// checkboxes work differently compare to the other inputs
// the check weonly care if its checked
 



//(1)
// lets put all out the information
// [name] will over the text input
// here the change triggers the input.
// we will design a liabery that will shape of the state
// basic submit event handler and console.log to confirm the sibmit
// this slice of state enables the submit button
  // this will to update the state later 


  //(2)
  // adding thier values appedning the state will make 
  //everything state driven

// (3) we add another slice state to check out for errors 

}

// the appliaction fails to comply because the submit button disable doesn't exist yet


//step (5) don't take in the errors from the state
// when it passes through the .then the .validate the value


//(6) the axios post required two arguments including the payload.


/// (7) clearing out the form durring successsful submission 


//(8) dont forget to have a submited form to send out a post request