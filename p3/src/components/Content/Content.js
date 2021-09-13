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
      loaded:false,
      contador: 0,
      textoCargando: ""
    };
  }
  
  componentDidMount() {

    fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&index=${this.state.contador}&limit=10`)
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
   
    return  <p> Cargando....  </p> 
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
    if (filteredArray.length <= 0) {
      this.setState({
        filteredCards:[],
        textoCargando: "Lo siento, prueba con otra busqueda"
      })
      
    }else{
        this.setState({
          filteredCards:filteredArray,
          textoCargando: null
          
        })
    }
  }

  // sumarContador(){
    
  // }
  cargarMas(){
    this.setState ({
      contador: this.state.contador + 10,
      loaded: false
    },
    ()=>{
      fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&index=${this.state.contador}&limit=10`)
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log(info.data);
        this.setState({
          
          cards: info.data,
          filteredCards: this.state.filteredCards.concat(info.data),
          loaded:true
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }) // Set state
    console.log(this.state.contador)
  
    
  } // cargasMas

  render() {
    return (
      
      <div className="containerBig">
        <SearchInput filterByTitle={(filterTitle)=> {this.filterByTitle(filterTitle)}} />
        <h3>{this.state.textoCargando} </h3>
        <div className="cardContainer">
         {this.contentShow()}
        </div>
        <button onClick={() => this.cargarMas()} type="button">Cargar más tarjetas</button>
      </div>
    );
  } // Render
}

export default Content;