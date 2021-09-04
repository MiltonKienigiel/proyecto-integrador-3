import React, {Component} from 'react';
import Card from '../Card/Card';

class Content extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: []    
        }
    }

    componentDidMount () {
        fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks ')
            .then(function(response){
                return response.json()
            })
            .then(function (info){
                console.log(info)
                this.setState({
                    data: info.data
                })
            })
            .catch(error =>{
                console.log(error)
            })

    }


    render(){
        
        return(
           <div>
                {this.state.data.map((cancion,index )=> {
                    return (
                        <Card key={index} artist = {cancion.artist} duration={cancion.duration} title={cancion.title}/>
                    )
                })}
           </div>
           
                

        )
    } // Render 
}

export default Content;