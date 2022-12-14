import {NavLink} from "react-router-dom";
import React from "react";

const MainNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Home
    </NavLink>
    <NavLink
      to="/todos"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Todos
    </NavLink>
    <NavLink
      to="/groceries"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Groceries
    </NavLink>
    <NavLink
      to="/calendar"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Calendar
    </NavLink>
    <NavLink
      to="/profile"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Profile
    </NavLink>
  </div>
);

export default MainNav;
