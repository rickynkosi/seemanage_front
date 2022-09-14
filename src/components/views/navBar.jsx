import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Zokosani
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            Dashboard
          </NavLink>
          <NavLink className="nav-item nav-link" to="branch">
            Branch
          </NavLink>
          <NavLink className="nav-item nav-link" to="district">
            District
          </NavLink>
          <NavLink className="nav-item nav-link" to="/policy">
            Policy
          </NavLink>
          <NavLink className="nav-item nav-link" to="/member">
            Member
          </NavLink>
          <NavLink className="nav-item nav-link" to="/extmember">
            ExtMember
          </NavLink>
          <NavLink className="nav-item nav-link" to="/manage">
            Fleet Management
          </NavLink>
          <NavLink className="nav-item nav-link" to="/cashfuneral">
            Cash Funeral
          </NavLink>
          <NavLink className="nav-item nav-link" to="/payments">
            Payments
          </NavLink>
          <NavLink className="nav-item nav-link" to="/sheet">
            Sheet
          </NavLink>
          {/* <NavLink className="nav-item nav-link" to="/members">Member</NavLink> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
