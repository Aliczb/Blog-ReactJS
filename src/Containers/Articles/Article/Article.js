// Librairies
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../config/axios-firebase';
import classes from './Article.module.css';
import routes from '../../../config/routes';
import { Link } from 'react-router-dom';

function Article(props) {
  let getId = useParams(props);
  const navigate = useNavigate();

  // State
  const [article, setArticle] = useState({});

  //Component didMount
  useEffect(() => {
    axios
      .get(
        '/articles.json?orderBy="slug"&equalTo="' + getId.slug + '"'
      )
      .then((response) => {
        for (let key in response.data) {
          setArticle({
            ...response.data[key],
            id: key,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fonctions
  const deleteClickedHandler = () => {
    axios
      .delete('/articles/' + article.id + '.json')
      .then((response) => {
        navigate(routes.HOME);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Variable
  let date = new Date(article.date).toLocaleDateString('fr-FR');

  return (
    <div className='container'>
      <h1>{article.titre}</h1>

      <div className={classes.content}>
        <div className={classes.lead}>{article.accroche}</div>
        {article.contenu}

        <div className={classes.button}>
          <Link to={routes.AJOUTER} state={{ article: article }}>
            <button>Modifier</button>
          </Link>
          <button onClick={deleteClickedHandler}>Supprimer</button>
        </div>
      </div>

      <div className={classes.author}>
        <b>{article.auteur}</b>
        <span>Publié le {date}.</span>
      </div>
    </div>
  );
}

export default Article;
