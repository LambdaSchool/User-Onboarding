import React from "react";

/////needs values, errors (and form values from props likely) needs onchange, and disable feature for button

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className="formContainer" onSubmit={onSubmit}>
      <div className="errors">
        <div>{errors.name}</div>
        <div>{errors.terms}</div>
        <div>{errors.password}</div>
      </div>
      <div>
        form container
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={values.name}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={onChange}
            value={values.email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </label>
        <label>
          Terms of Service:
          <input
            type="checkbox"
            name="terms"
            checked={values.terms}
            onChange={onChange}
          />
        </label>
        <button id="submitBtn" disabled={disabled}>
          submit
        </button>
      </div>
    </form>
  );
}
