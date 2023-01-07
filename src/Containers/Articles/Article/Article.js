import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Article(props) {
  let getId = useParams(props);
  let getState = useLocation(props);
  console.log(getState);

  return (
    <>
      <h1>Ma page article ({getId.id})</h1>
      {getState.state && getState.state.fromHome ? (
        <p>Cliqué depuis Accueil</p>
      ) : null}
    </>
  );
}

export default Article;
