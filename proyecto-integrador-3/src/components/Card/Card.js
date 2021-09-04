import React, {Component} from 'react';

class Card extends Component {

    constructor(props){
        super(props)
        this.state = {
            descripcion: ""
        }
    }

    

    mostrar (){
        this.setState ({
            descripcion: ""
        })
    }

    render(){
        return(

            <div>
                {/* <img src = "" />  */}
                <h3>{this.props.title}</h3>
                <p>Artist:{this.props.artist}</p>
                <button> Ver más </button>
                <div>
                    <p>Ranking: {this.props.ranking}</p>
                    <p>Duration: {this.props.duration} </p>
                </div>
                
            </div>

        )
    }
}

export default Card;