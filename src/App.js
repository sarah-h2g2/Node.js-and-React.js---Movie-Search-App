import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import MovieSearch from './components/MovieSearch/MovieSearch';
import MovieDetail from './components/MovieDetail/MovieDetail';

class App extends Component {

	render() {
		return (
			 <BrowserRouter>
			<div className="app">
	            <header>
			        <h1>Movie Search</h1>
	            </header>
				<main>
				 <Switch>
				    <Route exact path="/" component={MovieSearch} />
    <Route exact path="/MovieDetail/:id" component={MovieDetail} />
     </Switch>

				</main>
			</div>
			 </BrowserRouter>
		);
	}
}

export default App;