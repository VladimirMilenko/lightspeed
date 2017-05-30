import React, {Component} from 'react';
import './App.css';
import {Header} from "../../components/Header/Header";
import Basket from "../Basket/Basket";
import {Home} from "../Home/Home";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
                    <div className="header__wrapper">
                        <Header />
                        <Basket />
                    </div>
                </div>
                <Home/>
                {this.props.children}
            </div>
        );
    }
}

export default App;
