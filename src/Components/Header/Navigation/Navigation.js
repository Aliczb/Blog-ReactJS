// Librairie
import React from 'react';
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import { useNavigate } from 'react-router-dom';
import fire from '../../../config/firebase';
import { getAuth, signOut } from 'firebase/auth';

// Composants
import NavigationItem from './NavigationItem/NavigationItem';

function Navigation() {
  //React router v6
  let navigate = useNavigate();

  //Firebase
  const auth = getAuth(fire);

  //Functions
  const logoutClickedHandler = () => {
    signOut(auth);
    navigate(routes.HOME);
  };

  return (
    <ul className={classes.Navigation}>
      <NavigationItem to={routes.HOME}>Accueil</NavigationItem>
      <NavigationItem to={routes.ARTICLES}>Articles</NavigationItem>
      <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
      <NavigationItem to={routes.MANAGE_ARTICLE}>
        Ajouter
      </NavigationItem>
      <NavigationItem to={routes.AUTHENTIFICATION}>
        Authentification
      </NavigationItem>
      <button
        onClick={logoutClickedHandler}
        className={classes.logout}
      >
        Déconnexion
      </button>
    </ul>
  );
}

export default Navigation;
