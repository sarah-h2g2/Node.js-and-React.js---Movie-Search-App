import * as actionTypes from '../actions';
const initialState = {
   movies: null,
   searchTitle: 'Sharing a few popular movies'
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case actionTypes.ADDMOVIES:
		   return {...state, movies: action.movies}
		   break;
		case actionTypes.SETSEARCHTITLE:
		    return {...state, searchTitle: action.searchTitle}
		    break; 
		default:
		  return state;    
	}
}	

export default reducer;