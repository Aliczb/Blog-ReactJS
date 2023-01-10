// Librairie
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

// Components
import Layout from './hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import Ajouter from './Containers/Admin/Ajouter/Ajouter';

function App() {
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
            path={routes.ARTICLES + '/:id'}
            element={<Article />}
          />
          <Route exact path={routes.AJOUTER} element={<Ajouter />} />
          <Route path='*' element={<h1>404 not found</h1>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
