// Librairies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkValidity } from '../../../shared/utility';
import classes from './Authentification.module.css';

// Components
import Input from '../../../Components/UI/Input/Input';

function Authentification() {
  // States
  const [inputs, setInputs] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      label: 'Adresse email',
      valid: false,
      validation: {
        required: true,
        email: true,
      },
      touched: false,
      errorMessage: "L'adresse email n'est pas valide.",
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Mot de passe',
      },
      value: '',
      label: 'Mot de passe',
      valid: false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'Le mot de passe doit être renseigné.',
    },
  });

  const [valid, setValid] = useState(false);

  // Fonctions
  const inputChangedHandler = (event, id) => {
    // Change la valeur
    const nouveauxInputs = { ...inputs };
    nouveauxInputs[id].value = event.target.value;
    nouveauxInputs[id].touched = true;

    // Vérification de la valeur
    nouveauxInputs[id].valid = checkValidity(
      event.target.value,
      nouveauxInputs[id].validation
    );

    setInputs(nouveauxInputs);

    // Vérification du formulaire : on regarde si tous les champs sont bien complétés selon nos conditions
    let formIsValid = true;
    for (let input in nouveauxInputs) {
      formIsValid = nouveauxInputs[input].valid && formIsValid;
    }
    setValid(formIsValid);
  };

  // Variables
  const navigate = useNavigate();

  const formElementsArray = [];
  for (let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key],
    });
  }

  let form = (
    <form>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          id={formElement.id}
          value={formElement.config.value}
          label={formElement.config.label}
          type={formElement.config.elementType}
          config={formElement.config.elementConfig}
          valid={formElement.config.valid}
          touched={formElement.config.touched}
          errorMessage={formElement.config.errorMessage}
          changed={(e) => inputChangedHandler(e, formElement.id)}
        />
      ))}
      <div className={classes.buttons}>
        <button className={classes.button}>Inscription</button>
        <button className={classes.button}>Connexion</button>
      </div>
    </form>
  );

  return (
    <>
      <h1>Authentification</h1>
      <div className={classes.form}>{form}</div>
    </>
  );
}

export default Authentification;
