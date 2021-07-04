import React from 'react'

export const SignupForm = (props) => {
     
const {
    values,
    changeVal,
    checkChange,
    disabled,
    submit,
    errors
  } = props
  return(
    <div>
      <div>
        <div>{errors.name}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.terms}</div>
      </div>
  <form onSubmit={submit}>
            <label>
              Name: <input type='text' name='name' onChange={changeVal} value={values.name} />
            </label>
            <label>
              Email: <input type='text' name='email' value={values.email} onChange={changeVal} />
            </label>
            <label>
              Password: <input type='text' name='password' value={values.password} onChange={changeVal} />
            </label>
            <label>
              Terms of Service <input type='checkbox' checked={values.terms} name='terms' onChange={checkChange}  />
            </label>
            <button disabled={disabled}>
              Submit
            </button>
          </form>
    </div>
  )
 
}
export default SignupForm
