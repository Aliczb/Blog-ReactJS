import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './Contact.module.css';

function Contact() {
  return (
    <>
      <h1>Contact</h1>
      <p className={classes.p}>Par quel moyen de contact souhaitez-vous échanger ?</p>
      <Link to='/contact/email' className={classes.button}>
        Email
      </Link>
      <Link to='/contact/phone' className={classes.button}>
        Téléphone
      </Link>
      <Outlet />
    </>
  );
}

export default Contact;
