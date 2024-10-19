import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="Navbar">
      <div className="nav__container">
        <div className="nav__left">
          <h1 className="heading-1">Mediaboxd</h1>
        </div>
        <div className="nav__right">
          <div className="nav__search">
            {/* <label htmlFor="search">Search</label> */}
            <input type="text" placeholder="Search" id="search" />
          </div>
          <button className="nav__auth nav__btn">Login / Sign-Up</button>
          <a href="#" className="nav__link">
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
