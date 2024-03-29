// Librairie
import React from 'react';
import classes from './Layout.module.css';

// Composant
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Layout(props) {
  return (
    <div className={classes.Layout}>
      <Header />

      <div className={classes.content}>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
