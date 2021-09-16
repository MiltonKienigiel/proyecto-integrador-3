import React, { Component } from "react";
import "./Header.css"
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() { 


    return (
      <header>
        <img src="./images/jukebox.svg" />
        <div className="text">
            <h1>La Rockola Espacial</h1>
        </div>
      </header>
    );
  }
}

export default Header;
