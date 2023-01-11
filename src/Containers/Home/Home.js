// Librairies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios-firebase';

// Components
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Home() {
  // State
  const [articles, setArticles] = useState([]);

  // Component didMount
  useEffect(() => {
    axios
      .get('/articles.json?orderBy="date"&limitToLast=3') // limitToFirst=3 pour afficher les 3 premiers articles ou limitToLast=3 pour afficher les 3 derniers articles
      .then((response) => {
        const articlesArray = [];

        for (let key in response.data) {
          articlesArray.push({
            ...response.data[key],
            id: key,
          });
        }

        articlesArray.reverse(); // Pour avoir mon dernier article publié en premier

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
    </>
  );
}

export default Home;
