// Librairie
import React from 'react';
import classes from './Layout.module.css';

// Composant
import Header from '../../Components/Header/Header';

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      {/* Pied de page */}
    </>
  );
}

/* - Header
    - logo
    - Navigation
      - NavigationItem
*/

export default Layout;
