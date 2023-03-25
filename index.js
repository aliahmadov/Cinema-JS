

const categories = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Superhero",
    "Thriller",
    "War",
    "Western"
];

const ctg_sub = document.getElementById('ctg_sub');
const api_key = "8bf8ec4e";
const apiUrl = `https://www.omdbapi.com/?apikey=${api_key}&i=tt3896198&plot=none`;
function fillMovieCategories() {

    let content = "";
    content += `<ul class='basefont'>`
    for (let i = 0; i < categories.length; i++) {

        content += `<li id=${i} onclick=GetMovies(id)>${categories[i]}</li>`;

    }

    content += `</ul>`;
    ctg_sub.innerHTML = content;
}


async function getMoviesByGenre(genre) {
    const url = `https://www.omdbapi.com/?apikey=${api_key}&s=${genre}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.Search;
        if (movies === undefined) {
            return 0;
        }
        return movies;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const container = document.getElementById('movies');
const title = document.getElementById('title');
const msg = document.getElementById('error');

function fillMovieArea(genre) {
    let content = ``;
    getMoviesByGenre(genre)
        .then(movies => {
            if (movies != 0) {

                for (let i = 0; i < movies.length; i++) {
                    let element = movies[i];

                    if (element.Poster == 'N/A')
                        content += `<img class="movie" src=images\\notfound.png>`;
                    else
                        content += `<img class="movie" src=${element.Poster}>`;
                }

                container.innerHTML = content;
            }
            else {
                container.innerHTML=`<p id="error" class="basefont msg">Sorry, no result based on your search . . .</p>
                </section>`;
            }
        })
        .catch(error => console.error(error));
}

function GetMovies(id) {
    let genre = document.getElementById(id).innerHTML;
    title.innerHTML = genre;
    fillMovieArea(genre);



}

let search = document.getElementById('search')
addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        if (search.value.length > 0 && search.value != "") {
            let text = search.value;
            title.innerHTML = text;
            fillMovieArea(text);
        }

    }
});


function main() {


    fillMovieCategories();

}



main();