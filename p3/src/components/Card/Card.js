import React, { Component } from "react";
import "./Card.css";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "hidden",
      textShow: "Ver Más",
      isShowing: false,
    };
  }

  renderDescription() {
    if (this.state.isShowing) {
      this.setState({
        show: "hidden",
        textShow: "Ver Más",
        isShowing: false,
      });
    } else {
      this.setState({
        show: "show",
        textShow: "Ver Menos",
        isShowing: true,
      });
    }
  }

  render() {
    return (
      <div className="card">
        <img src={this.props.cover} alt="" />
        <h3>{this.props.title}</h3>
        <p> {this.props.artist}</p>

        <div className={this.state.show}>
          <p>Ranking: {this.props.ranking}</p>
          <p>Duración: {this.props.duration}seg </p>
          <p>Álbum: {this.props.albumName} </p>
        </div>
        <button onClick={() => this.renderDescription()}>
          {this.state.textShow}
        </button>
      </div>
    );
  }
}

export default Card;
