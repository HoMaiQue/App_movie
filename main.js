const API_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8';

const IMG_path = 'https://image.tmdb.org/t/p/w1280';

const search_API = 'https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
getMovies(API_url, showMovie);

function getMovies(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data.results;
        })
        .then(showMovie)
}

function showMovie(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_path + poster_path}"
                alt="">
            <div class="movie-infor">
                <h3>${title}</h3>
                <span class=${getClassByVote(vote_average)}>${vote_average}</span>
            </div>

            <div class="overview">
                <h3>overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElement);
    });

}

function getClassByVote(vote) {
    if (vote > 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(search_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})