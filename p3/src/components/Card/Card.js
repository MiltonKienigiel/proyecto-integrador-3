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
    if (this.props.cardClassName === "vertical"){
      return (
        <div className={this.props.cardClassName}>

          <div><i  onClick={()=>this.props.delete(this.props.id)} className="far fa-window-close"></i></div>

          <div>
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
            <i onClick={(card)=> this.props.moveLeft(card)} className="fas fa-chevron-left"></i>
            <div className="btn_show" onClick={()=> this.renderDescription()}>
              {this.state.textShow}
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>

        </div>
      );
    } else {
      return (
        <div className={this.props.cardClassName}>

          <div>
            <img src={this.props.cover} alt="" />
            <h3>{this.props.title}</h3>
            <p> {this.props.artist}</p>
          </div>

          <div className="show">
            <p>Ranking: {this.props.ranking}</p>
            <p>Duración: {this.props.duration} seg. </p>
            <p>Álbum: {this.props.albumName} </p>
          </div>

          <div><i  onClick={()=>this.props.delete(this.props.id)} className="far fa-window-close"></i></div>

        </div>
      )
    }
  } 
}

export default Card;
