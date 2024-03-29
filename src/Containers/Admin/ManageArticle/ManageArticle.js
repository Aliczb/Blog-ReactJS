// Librairie
import React, { useState } from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import classes from './ManageArticle.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import { checkValidity } from '../../../shared/utility';
import fire from '../../../config/firebase';

// Components
import Input from '../../../Components/UI/Input/Input';

function ManageArticle(props) {
  const location = useLocation();

  // States
  const [inputs, setInputs] = useState({
    titre: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: "Titre de l'article",
      },
      value:
        location.state && location.state.article
          ? location.state.article.titre
          : '',
      label: 'Titre',
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 85,
      },
      touched: false,
      errorMessage: 'Le titre doit faire entre 5 et 85 caractères.',
    },
    accroche: {
      elementType: 'textarea',
      elementConfig: {},
      value:
        location.state && location.state.article
          ? location.state.article.accroche
          : '',
      label: "Accroche de l'article",
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 140,
      },
      touched: false,
      errorMessage:
        "L'accroche ne doit pas être vide et doit être comprise entre 10 et 140 caractères.",
    },
    contenu: {
      elementType: 'textarea',
      elementConfig: {},
      value:
        location.state && location.state.article
          ? location.state.article.contenu
          : '',
      label: "Contenu de l'article",
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'Le contenu ne doit pas être vide.',
    },
    auteur: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: "Auteur de l'article",
      },
      value:
        location.state && location.state.article
          ? location.state.article.auteur
          : '',
      label: 'Auteur',
      valid: location.state && location.state.article ? true : false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'Il doit y avoir un auteur pour cet article.',
    },
    brouillon: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: true, displayValue: 'Brouillon' },
          { value: false, displayValue: 'Publié' },
        ],
      },
      value:
        location.state && location.state.article
          ? location.state.article.brouillon
          : '',
      label: 'Etat',
      valid: location.state && location.state.article ? true : false,
      validation: {},
    },
  });

  const [valid, setValid] = useState(
    location.state && location.state.article ? true : false
  );

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

  const generateSlug = (str) => {
    if (!str) return;
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaaeeeeiiiioooouuuunc------';

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(
        new RegExp(from.charAt(i), 'g'),
        to.charAt(i)
      );
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  const formHandler = (event) => {
    event.preventDefault();

    const slug = generateSlug(inputs.titre.value);

    const article = {
      titre: inputs.titre.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value,
      accroche: inputs.accroche.value,
      date: Date.now(),
      slug: slug,
    };

    if (location.state && location.state.article) {
      axios
        .put(
          '/articles/' + location.state.article.id + '.json',
          article
        )
        .then((response) => {
          console.log(response);
          navigate(routes.ARTICLES + '/' + article.slug);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post('/articles/' + '.json', article)
        .then((response) => {
          console.log(response);
          navigate(routes.ARTICLES);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
    <form
      className={classes.Ajouter}
      onSubmit={(e) => formHandler(e)}
    >
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
      <div className={classes.submit}>
        <input
          type='submit'
          value={
            location.state && location.state.article
              ? "Modifier l'article"
              : 'Ajouter un article'
          }
          disabled={!valid}
        />
      </div>
    </form>
  );

  return (
    <div className='container'>
      {location.state && location.state.article ? (
        <h1>Modifier</h1>
      ) : (
        <h1>Ajouter</h1>
      )}
      {form}
    </div>
  );
}

export default ManageArticle;
