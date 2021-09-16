import React, { Component } from "react";
import "./Content.css";
import Card from "../Card/Card";
import SearchInput from "../SearchInput/SearchInput";
import Slider from "../Slider/Slider";
// import {arrayMoveImmutable} from 'array-move';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      filteredCards: [],
      loaded: false,
      contador: 0,
      loadingText: "",
    };
  }

  componentDidMount() {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&index=${this.state.contador}&limit=10`
    )
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log(info.data);
        this.setState({
          cards: info.data,
          filteredCards: info.data,
          loaded: true,
          cardClassName: "vertical",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCard(id) {
    const cartasFiltradas = this.state.cards.filter((card) => card.id !== id);

    this.setState({
      cards: cartasFiltradas,
      filteredCards: cartasFiltradas,
    });
  }

  contentShow() {
    if (!this.state.loaded) {
      return <p> Cargando... </p>;
    } else {
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
            delete={(id) => this.deleteCard(id)}
            cardClassName={this.state.cardClassName}
            moveLeft={(card) => this.moveLeft(card)}
          />
        );
      });
    }
  }

  verticalOrder() {
    this.setState({
      cardClassName: "vertical",
    });
  }

  horizontalOrder() {
    this.setState({
      cardClassName: "horizontal",
    });
  }

  filterByTitle(filterTitle) {
    const filteredArray = this.state.cards.filter((card) =>
      card.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
    if (filteredArray.length <= 0) {
      this.setState({
        filteredCards: [],
        loadingText: "Lo siento, prueba con otra búsqueda.",
      });
    } else {
      this.setState({
        filteredCards: filteredArray,
        loadingText: null,
      });
    }
  } // Filter by title

  // moveLeft(card){
  //   const arrayNuevo = arrayMoveImmutable(this.state.filteredCards,0, 1)
  //   console.log(card)
  //   this.setState ({
  //     filteredCards: arrayNuevo
  //   }) //Solo anda con los primeros 2. Hay que ver como cambiar los numeros 0 y 1 a algo genérico. Para eso, averiguar como se referencia a un elemento padre
  // }

  loadMore() {
    this.setState(
      {
        contador: this.state.contador + 10,
        loaded: false,
      },
      () => {
        fetch(
          `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&index=${this.state.contador}&limit=10`
        )
          .then((response) => {
            return response.json();
          })
          .then((info) => {
            console.log(info.data);
            this.setState({
              cards: info.data,
              filteredCards: this.state.filteredCards.concat(info.data),
              loaded: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    ); // Set state
    console.log(this.state.contador);
  } // loadMore

  sortArray(array, type) {
    this.setState({
      filteredCards: array.sort(function (a, b) {
        if (a.title > b.title) {
          return type == "asc" ? 1 : -1;
        } else {
          return type == "asc" ? -1 : 1;
        }
        // a must be equal to b
        return 0;
      }),
    });
  } //sortArray

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({
      filteredCards: array,
    });
  } //Shuffle

  render() {
    return (
      <div className="containerBig">
        <Slider />
        <section className="filtersContainer">
          
          <div className="controlButtons">
            <i className="fas fa-th control-btn" onClick={() => this.verticalOrder()}></i>
            <i className="fas fa-align-justify control-btn" onClick={() => this.horizontalOrder()}></i>
            <button className="control-btn btn_show" onClick={() => this.sortArray(this.state.filteredCards, "asc")}>
              A - Z
            </button>
            <button className="control-btn btn_show" onClick={() => this.sortArray(this.state.filteredCards, "desc")}>
              Z - A
            </button>
            <button className="control-btn btn_show" onClick={() => this.shuffle(this.state.filteredCards)}>
              La mixeta espacial
            </button>
          </div>

          <SearchInput
            filterByTitle={(filterTitle) => {
              this.filterByTitle(filterTitle);
            }}
          />
        </section>
        <h3>{this.state.loadingText} </h3>
        <div className="cardContainer">{this.contentShow()}</div>
        <button
          className="loadMore"
          onClick={() => this.loadMore()}
          type="button"
        >
          Cargar más tarjetas
        </button>
      </div>
    );
  } // Render
}

export default Content;
