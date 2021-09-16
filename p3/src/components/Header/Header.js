import React, { Component } from "react";
import "./Header.css";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
        <img src="./images/jukebox.svg" alt="jukebox" />
        <div className="text">
          <h2>La Rocola Espacial</h2>
        </div>
      </header>
    );
  }
}

export default Header;
