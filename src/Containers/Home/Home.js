import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Accueil</h1>
      <Link to='/contact' style={{ marginRight: '10px' }}>
        Contact
      </Link>
      <Link to='/articles'>Articles</Link>
    </>
  );
}

export default Home;
