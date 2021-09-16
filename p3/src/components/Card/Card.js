import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "hidden",
      textShow: "Ver más",
      isShowing: false,
    };
  }

  renderDescription() {
    if (this.state.isShowing) {
      this.setState({
        show: "hidden",
        textShow: "Ver más",
        isShowing: false,
      });
    } else {
      this.setState({
        show: "show",
        textShow: "Ver menos",
        isShowing: true,
      });
    }
  } // Render description

  render() {
    if (this.props.cardClassName === "vertical") {
      return (
        <div className={this.props.cardClassName}>
          <div className="closeSong">
            <i
              class="fas fa-times"
              onClick={() => this.props.delete(this.props.id)}
            ></i>
          </div>

          <div className="containerSong">
            <img className="imageSong" src={this.props.cover} alt="" />
            <h3>{this.props.title}</h3>
            <p> {this.props.artist}</p>
          </div>

          <div className={this.state.show}>
            <p>Ranking: {this.props.ranking}</p>
            <p>Duración: {this.props.duration} seg.</p>
            <p>Álbum: {this.props.albumName} </p>
          </div>

          <div className="containerBottom">
            <i
              onClick={() => this.props.moveLeft(this.props.id)}
              className="fas fa-chevron-left"
            ></i>
            <div className="btn_show" onClick={() => this.renderDescription()}>
              {this.state.textShow}
            </div>
            <i
              onClick={() => this.props.moveRight(this.props.id)}
              className="fas fa-chevron-right"
            ></i>
          </div>
        </div>
      );
    } else {
      return (
        <div className={this.props.cardClassName}>
          <div className="containerSong">
            <img className="imageSong" src={this.props.cover} alt="" />
            <h3>{this.props.title}</h3>
            <p> {this.props.artist}</p>
          </div>

          <div className="show">
            <p className="pShow">Ranking: {this.props.ranking}</p>
            <p className="pShow">Duración: {this.props.duration} seg. </p>
            <p className="pShow">Álbum: {this.props.albumName} </p>
          </div>

          <div className="closeSong">
            <i
              class="fas fa-times"
              onClick={() => this.props.delete(this.props.id)}
            ></i>
          </div>
        </div>
      );
    }
  }
}

export default Card;
