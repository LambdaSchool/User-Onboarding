import React from 'react';
import styled from 'styled-components';

// Form takes the 5 props below
function Form({ values, submit, change, disabled, errors }) {
  const onSubmit = (event) => {
    event.preventDefault(); // prevent reload on submit
    submit();
  };

  // when something changes, access properties of evt.target to see if checkbox was alterec
  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <div className='errors'>
        <h2>Add new user:</h2>
        <div className='error-container'>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
        </div>
      </div>
      <div className='inputs'>
        <label>
          Name
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={onChange}
          />
        </label>
        <label>
          Email
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={onChange}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={onChange}
          />
        </label>
        <label>
          <div>{errors.tos}</div>
          Accept Terms of Service:
          <input
            type='checkbox'
            name='tos'
            checked={values.tos}
            onChange={onChange}
          />
        </label>
        <div>
          <button disabled={disabled}>Add</button>
        </div>
      </div>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    margin: 8px;
  }
`;

export default Form;