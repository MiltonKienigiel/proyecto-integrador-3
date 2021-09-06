import React, { Component } from "react";
import "./Content.css";
import Card from "../Card/Card";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks"
    )
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log(info.data);
        this.setState({
          data: info.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="containerBig">
        <div className="cardContainer">
          {this.state.data.map((cancion, idx) => {
            return (
              <Card
                key={idx}
                artist={cancion.artist.name}
                title={cancion.title}
                ranking={cancion.rank}
                duration={cancion.duration}
                cover={cancion.album.cover}
                albumName={cancion.album.title}
              />
            );
          })}
        </div>
      </div>
    );
  } // Render
}

export default Content;
