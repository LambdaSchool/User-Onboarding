import React from "react";

 function Form(props) {

    const {
        change,
        submit,
        values,
        errors,
        disabled,
    } = props

    const onSubmit = e => {
        e.preventDefault();
        submit()
    }

    const onChange = e => {
        const { name, value, checked, type } = e.target
        const v = type === 'checkbox' ? checked : value
        change(name, v)
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
            <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.terms}</div>
                <button disabled={disabled}>Submit</button>
                <label>Name
                <input
                    value={values.name}
                    onChange={onChange}
                    name='name'
                    type='text'
                />
                </label>
                <input 
                    value={values.email}
                    onChange={onChange}
                    name='email'
                    type='email'
                />
                <input 
                    value={values.password}
                    onChange={onChange}
                    name='password'
                    type='password'
                />
                <input 
                    checked={values.terms}
                    onChange={onChange}
                    name='terms'
                    type='checkbox'

                />

            </form>
        </div>
    )
}

export default Form