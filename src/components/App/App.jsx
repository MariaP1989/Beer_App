import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from '../../views/MainPage/MainPage';
import BeerAndFood from '../../views/BeerAndFood/BeerAndFood';
import BeerDetails from '../../views/BeerDetails/BeerDetails';

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={MainPage} />
                    <Route path='/search' component={BeerAndFood} />
                    <Route path='/details/:id' component={BeerDetails} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
