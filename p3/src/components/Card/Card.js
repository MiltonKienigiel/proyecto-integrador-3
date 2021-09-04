import React, { Component } from "react";
import "./Card.css";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: "",
    };
  }

  mostrar() {
    this.setState({
      descripcion: "",
    });
  }

  render() {
    return (
      <div className="card">
        <img src={this.props.cover} alt="" />
        <h3>{this.props.title}</h3>
        <p> {this.props.artist}</p>
        <div>
          <p>Ranking: {this.props.ranking}</p>
          <p>Duration: {this.props.duration} </p>
        </div>
        <button> Ver más </button>
      </div>
    );
  }
}

export default Card;
