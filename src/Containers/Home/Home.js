// Librairies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios-firebase';
import routes from '../../config/routes';

// Components
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';
import classes from './Home.module.css';

function Home() {
  // State
  const [articles, setArticles] = useState([]);

  // Component didMount
  useEffect(() => {
    axios
      .get('/articles.json') // limitToFirst=3 pour afficher les 3 premiers articles ou limitToLast=3 pour afficher les 3 derniers articles
      .then((response) => {
        let articlesArray = [];

        for (let key in response.data) {
          articlesArray.push({
            ...response.data[key],
            id: key,
          });
        }

        // Chronologie
        articlesArray.reverse(); // Pour avoir mon dernier article publié en premier

        // Trier nos articles
        articlesArray = articlesArray.filter(
          (article) => article.brouillon == 'false'
        );

        // Limiter à 3 articles
        articlesArray = articlesArray.slice(0, 3);

        setArticles(articlesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h1>Accueil</h1>
      <DisplayedArticles articles={articles} />

      <div className='container'>
        <div className={classes.mainLink}>
          <Link to={routes.ARTICLES}>
            Voir les articles &nbsp;
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-airplane-engines'
              viewBox='0 0 16 16'
            >
              <path d='M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0ZM7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1c.213 0 .458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7V3Z' />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
