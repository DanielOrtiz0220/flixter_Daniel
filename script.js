// global constants

const apiKey = "16172e6168e172774fb88daf046144a7";
var col1Poster = "";
var col2Poster = "";
var col3Poster = "";

var col1Title = "";
var col2Title = "";
var col3Title = "";

var col1Votes = "";
var col2Votes = "";
var col3Votes = "";

var pages = 2;

// search bar

let movieForm = document.querySelector("form");

// div where I will populate the movies

let moviesDiv = document.querySelector(".movies-grid");



async function getTrending(){

    const requestURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    
    try{
        // requesting data and waiting for it
        let response = await fetch(requestURL);

        // var for data that has finally arrived, must wait on the fetch
        let responseData = await response.json();

        generateHTML(responseData, 0);

    }
    catch(e){
        console.log("Error = " + e)
    }

}

function getSearch(loadingType){

    console.log("get search is reached");

    const searchTerm = document.querySelector("#search-input").value;
    console.log(searchTerm);

    const requestURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm};`

    if(loadingType == 2){
    const requestURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pages};`
    }
    movieForm.addEventListener("submit", async evt => {
        evt.preventDefault();
        console.log(evt)
        try{
            
            // requesting data and waiting for it
            let response = await fetch(requestURL);

            // var for data that has finally arrived, must wait on the fetch
            let responseData = await response.json();

            console.log(responseData);

            generateHTML(responseData, loadingType);

        }
        catch(e){
            console.log("Error = " + e)
        }

    })
}

function generateHTML(movieData, loadingType){
    
    console.log("generateHTML was reached");
    console.log(loadingType)
    i = 0;

    if(loadingType == 1){
        console.log("loading type submit reached")
        moviesDiv.innerHTML = ``;
        document.querySelector("#load-more-movies-btn").removeAttribute("hidden");
    }

    pages += 1;
    
    const moviesListGen = movieData.results.map(element => {
        console.log(element.backdrop_path)

        if(i%3 == 0 && i != 0){
        moviesDiv.innerHTML += `
            <div class = "flex-grid">
                <div class="movie-card">
                    <img class = "movie-poster" src="https://image.tmdb.org/t/p/w300${col1Poster}" alt="${col1Title}">
                    <p class = "movie-title">${col1Title}</p>
                    <p class = "movie-votes">${col1Votes} ⭐</p>
                </div>
                <div class="movie-card">
                    <img class = "movie-poster" src="https://image.tmdb.org/t/p/w300${col2Poster}" alt="${col2Title}">    
                    <p class = "movie-title">${col2Title}</p>
                    <p class = "movie-votes">${col2Votes} ⭐</p>
                </div>
                <div class="movie-card">
                    <img class = "movie-poster" src="https://image.tmdb.org/t/p/w300${col3Poster}" alt="${col3Title}">
                    <p class = "movie-title">${col3Title}</p>
                    <p class = "movie-votes">${col3Votes} ⭐</p>
                </div>
            </div>
        `
        }

        if(i % 3 == 0){
            col1Poster = element.poster_path;
            col1Title = element.title;
            col1Votes = element.vote_average;
        }
        else if(i % 3 == 1){
            col2Poster = element.poster_path;
            col2Title = element.title;
            col2Votes = element.vote_average;
        }
        else if(i % 3 == 2){
            col3Poster = element.poster_path;
            col3Title = element.title;
            col3Votes = element.vote_average;
        }

        i += 1; 
    })
    
}

window.onload = function(){
    getTrending();
}