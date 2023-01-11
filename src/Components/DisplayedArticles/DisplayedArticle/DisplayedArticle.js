// Librairies
import React from 'react';
import classes from './DisplayedArticle.module.css';

function DisplayedArticle(props) {
  return (
    <div className={classes.DisplayedArticle}>
      <h2>{props.article.titre}</h2>
      <p>{props.article.accroche}</p>
      <small>{props.article.auteur}</small>
    </div>
  );
}

export default DisplayedArticle;
