// Librairie
import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import fire from './config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Components
import Layout from './hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import ManageArticle from './Containers/Admin/ManageArticle/ManageArticle';
import Authentification from './Containers/Security/Authentification/Authentification';

function App() {
  // State
  const [user, setUser] = useState('');

  //ComponentDidMount
  useEffect(() => {
    authListener();
  }, []);

  //Function
  const authListener = () => {
    const auth = getAuth(fire);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  return (
    <div className='App'>
      <Layout>
        <Routes>
          <Route exact path={routes.HOME} element={<Home />} />
          <Route path={routes.CONTACT} element={<Contact />}>
            <Route
              exact
              path='email'
              element={
                <p style={{ padding: '15px' }}>helloWord@gmail.com</p>
              }
            />
            <Route
              exact
              path='phone'
              element={
                <p style={{ padding: '15px' }}>+33600000000</p>
              }
            />
          </Route>
          <Route
            exact
            path={routes.ARTICLES}
            element={<Articles />}
          />
          <Route
            path={routes.ARTICLES + '/:slug'}
            element={<Article />}
          />
          <Route
            exact
            path={routes.MANAGE_ARTICLE}
            element={<ManageArticle />}
          />
          <Route
            exact
            path={routes.AUTHENTIFICATION}
            element={<Authentification />}
          />
          <Route path='*' element={<h1>404 not found</h1>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
