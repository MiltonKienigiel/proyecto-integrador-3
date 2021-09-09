import React, { Component } from "react";
import "./Content.css";
import Card from "../Card/Card";
import SearchInput from "../SearchInput/SearchInput";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      cards: [],
      filteredCards: [],
      loaded:false
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
          
          cards: info.data,
          filteredCards: info.data,
          loaded:true
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCard(id) {

    const cartasFiltradas = this.state.cards.filter( card=> card.id !== id )


    this.setState({
      cards: cartasFiltradas,
      filteredCards: cartasFiltradas
    })
  }

  contentShow(){
    if (!this.state.loaded) {
    return  <p> Cargando...</p> 
    }else{
     return this.state.filteredCards.map((cancion, idx) => {
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
      })
    }
  }


  filterByTitle(filterTitle){
    const filteredArray = this.state.cards.filter(card => card.title.toLowerCase().includes(filterTitle.toLowerCase()))
    if (filterTitle === "") {
      this.setState({
        filteredCards:this.state.cards
      })
    }else{
        this.setState({
          filteredCards:filteredArray
        })
    }
  }

  render() {
    return (
      
      <div className="containerBig">
        <SearchInput filterByTitle={(filterTitle)=> {this.filterByTitle(filterTitle)}} />
        <button type="button">Cargar más tarjetas</button>

        <div className="cardContainer">
         {this.contentShow()}
        </div>
      </div>
    );
  } // Render
}

export default Content;