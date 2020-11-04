import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const blankForm = {
        name: '',
        email: '',
        password: '',
        tos: false
    }

export default function () {
//form state
    const [formState, setFormState] = useState({...blankForm})
//submit button state
    const [btnDisabled, setBtnDisabled] = useState(true);
//error state
    const [errorState, setErrorState] = useState({...blankForm, tos: ''})
//users state
    const [usersState, setUsersState] = useState([])

//change handler and validater
    const handleChanges = (event) => {
        event.persist()
        //if/then if type is checkbox
        validateChange(event)
        setFormState({...formState, [event.target.name]:event.target.name === 'tos' ? event.target.checked : event.target.value})
        //console.log(formState)
    }

//YUP validation
    const formSchema = yup.object().shape({
        name: yup.string().required('❗ Please enter your name.'),
        email: yup.string().email('⚠ Please enter a VALID email.').required('❗ Please enter your email.'),
        password: yup.string().required('❗ Please create a password.'),
        tos: yup.boolean().oneOf([true], '⚠ You must agree to the TOS to register.')
    })

    const validateChange = (event) => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.name === 'tos' ? event.target.checked : event.target.value)
            .then(valid => {
                setErrorState({...errorState, [event.target.name]: " "})
            })
            .catch(error => {
                console.log('👓 Please review the following errors:', errorState)
                setErrorState({...errorState, [event.target.name]: error.errors[0]})
            })
    }

//check for entire form validity then enable submit button
    useEffect(() => {
        formSchema.isValid(formState)
        .then(validity => setBtnDisabled(!validity))
    }, [formState])

//onSubmit function
    const submitForm = (event) => {    
        event.preventDefault();
        axios.post('https://reqres.in/api/users', formState)
            .then(success => {
                console.log('🌟 Posted new user data!', success.data)
                {/* add users to array */}
                const newUser = success.data
                setUsersState([...usersState, {...newUser}])
                setFormState(blankForm)
                
            })
            .catch(failure => console.log('⛔ Failed to post new user data...', failure))
    }

    useEffect(() => {
        console.log('🆕 Users list updated!', usersState)
    }, [usersState])

    return (
        <section>
            <p>Sign up is quick and simple. Please fill out the following information.</p>
            <form onSubmit={ submitForm } data-cy='form'>
{/* Form startes here! Needs: name, email, pw, tos, submit 
    Also, there are validation error message that will display if they exist
*/}
                <label htmlFor='name'>
                    Name:
                    <input type='text' id='name' name='name' placeholder='Phoenix Wright' onChange={handleChanges} value={formState.name} data-cy='name'/>
                    {errorState.name.length > 0 ? <p>{errorState.name}</p> : null}
                </label>
                <label htmlFor='email'>
                    Email:
                    <input type='text' id='email' name='email' placeholder='pwright@aceattorney.com' onChange={handleChanges} value={formState.email} data-cy='email'/>
                    {errorState.email.length > 0 ? <p>{errorState.email}</p> : null}
                </label>
                <label htmlFor='password'>
                    Password:
                    <input type='password' id='password' name='password' placeholder='**********' onChange={handleChanges} value={formState.password} data-cy='password'/>
                    {errorState.password.length > 0 ? <p>{errorState.password}</p> : null}
                </label>
                <label htmlFor='tos'>
                    <input type='checkbox' checked={formState.tos} id='tos' name='tos' onChange={handleChanges} data-cy='tos'/>
                    I have read and agree to the <a href='http://google.com' target='_blank'>Terms of Service</a>.
                    {errorState.tos.length > 0 ? <p>{errorState.tos}</p> : null}
                </label>
                <button disabled={ btnDisabled } type='submit' data-cy='btn'> Register </button>
{/* Show users array here */}
                
            </form>
            <h4>New Members!</h4>
{/* <pre>{JSON.stringify(usersState)}</pre> */}
            <ol>
                {Array.from(usersState).map(item => <li>{item.name} [{item.email}]</li>)}
            </ol>
        </section>
    )
}