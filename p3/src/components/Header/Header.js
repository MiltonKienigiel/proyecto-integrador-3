import React, {Component} from 'react';

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(

            <div>
                <img src="../images/logo-spotify.png" alt="logo"></img>
                <ul>
                    <li>Home</li>
                    <li>Álbumes</li>
                    <li>Artistas</li>
                    <li>Más populares</li>
                </ul>
            </div>

        )
    }
}

export default Header;