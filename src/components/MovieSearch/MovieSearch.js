import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Aux from '../Aux/Aux'
import SearchCard from '../SearchCard/SearchCard';
import * as actionTypes from '../../store/actions';
import styles from './MovieSearch.module.css'

class MovieSearch extends Component {

	state = {
		searchTerm: '',
		loading: false,
		error: false,
		errorMsg: ''
	}

    handleChange = (e) => {
    	this.setState({searchTerm: e.target.value})
    }

    handleSubmit = () => {
        const searchVal = this.state.searchTerm.trim();
        if (searchVal.length > 0) {
        	this.setState({loading: true});
        	axios.get(`http://localhost:3000/searchMovies/${searchVal}`)
		  .then(response => {
		    //console.log('handleSubmit',response.data);
		    this.setState({error: false, loading: false, errorMsg: ''});
		    this.props.addMovies(response.data);
		    this.props.setSearchTitle(`Search results for "${this.state.searchTerm}"`);
		  }).catch(error => {
		  	this.setState({error: true, loading: false, movies: [], errorMsg: error.response.data.message});
		  	this.props.setSearchTitle(`Search results for ${this.state.searchTerm}`);
		  	this.props.addMovies([]);
		  	console.log('error', error.response.data);   
		  })
        }
    }

	componentDidMount() {
		if (!this.props.movies) {
		 axios.get('http://localhost:3000/getPopularMovies')
		  .then(response => {
		    //console.log('getPopularMovies',response.data);
		    this.props.addMovies(response.data);
		    this.props.setSearchTitle('Sharing a few popular movies');
		  }).catch(error => {
		  	 this.props.addMovies([]);
		  	 this.props.setSearchTitle('Sharing a few popular movies');
		  	console.log('error', error.response.data);   
		  })
		}
    }

	render() {
	    return(
	   		<Aux>
			  <div className={styles["search"]}>
				  <input placeholder="Search a movie" 
				  type="text" aria-label="Search Movie" id="search" value={this.state.searchTerm} placeholder="Search for a movie" onChange={this.handleChange}/>
				  <button disabled={this.state.loading} type="submit" onClick={this.handleSubmit}>Search</button>
			  </div>
              {this.state.loading &&
		        <div className={styles["loadingWrapper"]}><div className={styles["spinner"]}></div></div>
		      }
			  <div className={styles["searchResults"]}>
				  <h3><span className={styles["searchTerm"]}>{this.props.searchTitle}:</span></h3>
				  { this.state.error &&
	                    <p>
	                        {this.state.errorMsg}
	                    </p>
	              }
				  { this.props.movies && this.props.movies.length > 0 ? (
	                    this.props.movies.map(movie => (
	                        <SearchCard movieID = {movie.id} key = {movie.id} title = {movie.title} 
	                        posterPath = {movie.poster_path} releaseDate = {movie.release_date} voteAverage = {movie.vote_average}/>
	                    ))
	              ): this.props.movies && <p>Oops! No results found: <span className={styles["searchTerm"]}>{ this.state.searchTerm ? this.state.searchTerm : null}</span></p>}
			  </div>
	        </Aux>
	    )

	}
}

const mapStateToProps = state => {
 return {
    movies: state.movies,
    searchTitle: state.searchTitle
 }
}

const mapDispatchToProps = dispatch => {
 return {
    addMovies: (movies) => dispatch({type: actionTypes.ADDMOVIES, movies:movies}),
    setSearchTitle: (searchTitle) => dispatch({type: actionTypes.SETSEARCHTITLE, searchTitle:searchTitle})
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);



