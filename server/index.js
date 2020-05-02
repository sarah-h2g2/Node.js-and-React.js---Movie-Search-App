const express = require('express');
const axios = require("axios");
const port = 5000; //to avoid conflict with react on 3000
const cors = require('cors');

const app = express();

const baseURL = "https://api.themoviedb.org/3/";
const apiKey = "cbfac2c73411c59267049b7b4eb320fc";

app.use(cors());

app.get("/", (req, res) => res.send("Movie Search"));
app.get("/getPopularMovies", (req, res) => {
	axios.get(`${baseURL}movie/popular?api_key=${apiKey}&language=en-US&page=1`)
		.then(response => {
			 const results =  response.data.results
             res.send(results);
        }).catch( error => {
        	res.status(error.response.status).send(error)
        })
});
app.get("/searchMovies/:movie", (req, res) => {
	axios.get(`${baseURL}search/movie?&api_key=${apiKey}&query=${req.params.movie}&language=en-US&page=1`)
		.then(response => {
			 const results =  response.data.results
             res.send(results);
        }).catch( error => {
        	res.status(error.response.status).send(error)
        })
});
app.get("/getMovie/:id", (req, res) => {
	axios.get(`${baseURL}movie/${req.params.id}?api_key=${apiKey}&language=en-US&page=1&append_to_response=credits,similar`)
		.then(response => {
			 const result = response.data; 
             res.send(result);
        }).catch( error => {
        	res.status(error.response.status).send(error)
        })
})

app.listen(port, () => console.log(`App listening on port ${port}`));