// Librairie
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

function NavigationItem(props) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.to}
        style={({ isActive }) =>
          isActive ? { color: '#fb743e' } : undefined
        }
        end
      >
        {' '}
        {props.children}
      </NavLink>
    </li>
  );
}

export default NavigationItem;
