// Librairies
import React from 'react';
import classes from './Input.module.css';

function Input(props) {
  let inputElement;

  switch (
    props.type // si props.type = input alors inputElement = <input />
  ) {
    case 'input':
      inputElement = (
        <input
          {...props.config}
          value={props.value}
          id={props.id}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          value={props.value}
          onChange={props.changed}
          id={props.id}
        ></textarea>
      );
      break;
    case 'select':
      inputElement = (
        <select
          value={props.value}
          onChange={props.changed}
          id={props.id}
        >
          {props.config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
