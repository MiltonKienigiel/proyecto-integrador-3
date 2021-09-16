import React, { Component } from "react";
import "./Footer.css";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer">
        <p>Hecho por Milton Kienigiel, Martin Leon y Mateo Moragues</p>
        <img src="./images/jukebox.svg" alt=""></img>
      </div>
    );
  }
}

export default Footer;
