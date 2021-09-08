import React, { Component } from "react";
import "./Content.css";
import Card from "../Card/Card";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cards: [],
      filteredCards: [],
    };
  }
  
  componentDidMount() {
    /* FETCH ANTERIOR */
    /* fetch(
      "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks"
    ) */

    fetch("https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log(info.data);
        this.setState({
          data: info.data,
          cards: info.data,
          filteredCards: info.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCard(id) {
    /* console.log(this.state.data) */

    const cartasFiltradas = this.state.cards.filter( card=> card.id !== id )

    /* console.log(cartasFiltradas) */

    this.setState({
      cards: cartasFiltradas,
      filteredCards: cartasFiltradas
    })
  }

  render() {
    return (
      <div className="containerBig">
        <div className="cardContainer">
          {this.state.filteredCards.map((cancion, idx) => {
            return (
              <Card
                key={idx}
                artist={cancion.artist.name}
                title={cancion.title}
                ranking={cancion.rank}
                duration={cancion.duration}
                cover={cancion.album.cover}
                albumName={cancion.album.title}
                id={cancion.id}
                delete={(id)=>this.deleteCard(id)}
              />
            );
          })}
        </div>
      </div>
    );
  } // Render
}

export default Content;