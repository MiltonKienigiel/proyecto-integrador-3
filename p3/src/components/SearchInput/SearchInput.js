import React, { Component } from 'react';


class SearchInput  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            input: "",

         }
    }

    preventSubmit(e){
        e.preventDefault()
    }

    getInput(e){
        this.setState({
            input: e.target.value
        }, ()=> this.props.filterByTitle(this.state.input))

    }

    render() { 
        return ( 
            <>
                <form onSubmit={(e)=> this.preventSubmit(e)}>
                <input type="text" onChange={(e)=>{
                    this.getInput(e)
                }} name="search" id="" placeholder="Buscar canción..."/>
                </form>
            </>
         );
    }
}
 
export default SearchInput;