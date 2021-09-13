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
      loadingText: "",

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
          loaded:true,
          cardClassName: "vertical"
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
   
      return  <p> Cargando...  </p>

    } else{
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
            cardClassName={this.state.cardClassName}
          />
        );
      })
    }
  }

  verticalOrder(){
    this.setState({
      cardClassName: "vertical"
    })
  }

  horizontalOrder(){
    this.setState({
      cardClassName: "horizontal",
    })
  }

  filterByTitle(filterTitle){
    const filteredArray = this.state.cards.filter(card => card.title.toLowerCase().includes(filterTitle.toLowerCase()))
    if (filteredArray.length <= 0) {
      this.setState({
        filteredCards:[],
        loadingText: "Lo siento, prueba con otra búsqueda."
      })
    } else{
        this.setState({
          filteredCards:filteredArray,
          loadingText: null
        })
    }
  }

  loadMore(){
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
  
    
  } // loadMore

sortArray(array, type){
 this.setState({
   filteredCards: array.sort(function (a, b) {
     if (a.title> b.title) {
       return type == "asc"? 1 : -1;
     }else {
       return type == "asc"? -1 : 1;
     }
     // a must be equal to b
     return 0;
   })
   
 })
}

shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({
      filteredCards: array
    })
  
 
}

  render() {
    return (
      
      <div className="containerBig">
        <section>
          <i className="fas fa-th" onClick={()=> this.verticalOrder()}></i>
          <i className="fas fa-align-justify" onClick={()=> this.horizontalOrder()}></i>  
          <button onClick={()=>this.sortArray(this.state.filteredCards, "asc")}> A - Z </button>
          <button onClick={()=>this.sortArray(this.state.filteredCards, "desc")}> Z - A </button>
          <button onClick={()=>this.shuffle(this.state.filteredCards)}> La mixeta espacial </button>

        </section>
        <SearchInput filterByTitle={(filterTitle)=> {this.filterByTitle(filterTitle)}} />
        <h3>{this.state.loadingText} </h3>
        <div className="cardContainer">
         {this.contentShow()}
        </div>
        <button onClick={() => this.loadMore()} type="button">Cargar más tarjetas</button>
      </div>
    );
  } // Render
}

export default Content;