// Librairie
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Components
import Layout from './hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/articles/:id' element={<Article />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
