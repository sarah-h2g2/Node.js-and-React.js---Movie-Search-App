import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './SearchCard.module.css'
import avatar from "../../assets/avatar.png";

import Aux from '../Aux/Aux'

class SearchCard extends Component {
    addDefaultAvatar = (e) => {
       e.target.src = avatar
    }
	render () {
    return (
      <div className={styles["searchCard"]}>
        <div className={styles["thumbnail"]}><img src={`https://image.tmdb.org/t/p/w500/${this.props.posterPath}`} alt="img" onError={this.addDefaultAvatar}/></div>   
        <span className={styles["title"]}><Link to={`/MovieDetail/${this.props.movieID}`}>{this.props.title}</Link></span>
        <span className={styles["date"]}>{this.props.releaseDate}</span>
        <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0.5 0.5 16 16"><path fill="none" d="M.5.5h16v16H.5z"/>
  <path
    d="M.5 7.5h3v8h-3zM7.207 15.207c.193.19.425.29.677.293H12c.256 0 .512-.098.707-.293l2.5-2.5c.19-.19.288-.457.293-.707V8.5c0-.553-.445-1-1-1h-5L11 5s.5-.792.5-1.5v-1c0-.553-.447-1-1-1l-1 2-4 4v6l1.707 1.707z"/>
</svg></span>
 <span className={styles["avg"]}>{this.props.voteAverage}</span>
      </div>     
    )
  }

}

export default SearchCard;
