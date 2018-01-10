import React, {Component} from "react";
import "./App.css";

import BookList from "./component/BookList"
import AppSearch from "./component/AppSearch"
import {searchBooks} from "./api"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
        };
    }

    handleSearch = (event) => {
        let searchTerm = event.target ? event.target.value : typeof event == 'string' ? event : null;
        if(!searchTerm) return;
        searchBooks(searchTerm)
            .then((searchedResult) => {
                this.setState({bookList: searchedResult})
            })
    }

    render() {
        return (
            <div className="App">
                <AppSearch bookList={this.state.bookList} handleSearch={this.handleSearch}/>
                <BookList bookList={this.state.bookList}/>
            </div>
        );
    }
}

export default App;
