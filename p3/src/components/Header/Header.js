import React, {Component} from 'react';

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(

            <header>
            <h1>Título/ Nombre de la app</h1>
            <section>
                <p>Ordenar ASC/ DESC</p>
                <i className="fas fa-th"></i>
                <i className="fas fa-align-justify"></i>
                
            </section>
        </header>

        )
    }
}

export default Header;