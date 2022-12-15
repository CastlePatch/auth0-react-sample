import {NavLink} from "react-router-dom";
import React from "react";

const MainNav = () => (
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <NavLink to="/" exact className="nav-link" activeClassName="router-link-exact-active">
        Home
      </NavLink>
    </li>
    <li className="nav-item dropdown">
      <NavLink className="nav-link"
          role="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
          to="/todos"
          exact
          activeClassName="router-link-exact-active">
        Todos <i className="bi bi-chevron-down"></i>
      </NavLink>
      <ul className="dropdown-menu">
      <li><NavLink className="dropdown-item" role="button" to="/todos" exact 
                      activeClassName="router-link-exact-active">
            Todos
            </NavLink></li>
        <li><NavLink className="dropdown-item" role="button" to="/todos/kanban" exact 
                      activeClassName="router-link-exact-active">
            Kanban board
            </NavLink></li>
        <li><NavLink className="dropdown-item" role="button" to="/todos/all" exact 
                  activeClassName="router-link-exact-active">
        All Todos
        </NavLink></li>
      </ul>
    </li>
    <li className="nav-item">
    <NavLink
      to="/groceries"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Groceries
    </NavLink>
    </li>
    <li className="nav-item">
    <NavLink
      to="/calendar"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Calendar
    </NavLink>
    </li>
    <li className="nav-item">
    <NavLink
      to="/profile"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Profile
    </NavLink>
    </li>
  </ul>
);

export default MainNav;
