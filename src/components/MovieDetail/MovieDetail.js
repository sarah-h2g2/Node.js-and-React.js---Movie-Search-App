import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Aux from '../Aux/Aux'
import axios from 'axios';
import styles from './MovieDetail.module.css'
import avatar from "../../assets/avatar.png";

class MovieDetail extends Component {
    state = {
      movie: null,
      loading: false,
      errorMsg: '',
      error: false
  }

  addDefaultAvatar = (e) => {
    e.target.src = avatar
  }

  componentDidMount() {
      if (this.props.match.params.id) {
        this.setState({loading: true});
        axios.get(`http://localhost:3000/getMovie/${this.props.match.params.id}`)
        .then(response => {
            //console.log('response', response.data);
            this.setState({movie: response.data, error: false, loading: false, errorMsg: ''});
        }).catch(error => {
            this.setState({error: true, loading: false, errorMsg: error.response.data.message });
            console.log('error', error.response.data);   
        })
    }
  }
	render () {          
    return (
      <div className={styles["movieContainer"]}>
     { this.state.error && <p>Oops! {this.state.errorMsg}</p> }
      <div className={styles["backToResults"]}><Link to="/">&lt;&lt; <span className={styles["searchTerm"]}>{this.props.searchTitle}</span></Link></div>
                {this.state.loading &&
            <div className={styles["loadingWrapper"]}><div className={styles["spinner"]}></div></div>
          }
        { this.state.movie ? (
         <Aux> 
        <img src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt="img" onError={this.addDefaultAvatar}/>   
        <h1 className={styles["title"]}>{this.state.movie.title}</h1>
        <p><span className={styles["label"]}>Release Date:</span>{this.state.movie.release_date}</p>
        <p><span className={styles["label"]}>Cast:</span>{
      this.state.movie.credits && this.state.movie.credits.cast && this.state.movie.credits.cast.length ? this.state.movie.credits.cast.slice(0,5).map((item, index, arr) => (<span key={index}>{index === arr.length -1 ? item.name : item.name + ', '}</span>)) : '-'
    }</p>
        <p><span className={styles["label"]}>Status:</span>{this.state.movie.status}</p>
        <p><span className={styles["label"]}>Runtime (min):</span>{this.state.movie.runtime}</p>
        <p><span className={styles["label"]}>Genre(s):</span>{
      this.state.movie.genres && this.state.movie.genres.length ? this.state.movie.genres.map((item, index, arr) => (<span key={index}>{index === arr.length -1 ? item.name : item.name + ', '}</span>)) : '-'
    }</p>
        <p><span className={styles["label"]}>Synopsis:</span>{this.state.movie.overview}</p>
        </Aux> ) : null}      
      </div>     
    )}
  

}

const mapStateToProps = state => {
 return {
    searchTitle: state.searchTitle
 }
}

export default connect(mapStateToProps, null)(MovieDetail);
