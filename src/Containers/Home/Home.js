import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

function Home() {
  return (
    <>
      <h1>Accueil</h1>
      <Link to={routes.ARTICLES + '/1'}>Voir mon article</Link>
      <Link
        to={{
          pathname: '/articles/1',
          // hash: '#projets'
          // search: '?order=new',
        }}
        state={{ fromHome: true }}
        style={{ marginLeft: '10px' }}
      >
        Lien vers une ancre
      </Link>
    </>
  );
}

export default Home;
