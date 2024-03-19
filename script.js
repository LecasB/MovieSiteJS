  document.addEventListener("DOMContentLoaded", () => {
  init()
  })

  
count = 0;

function getFavouritesFromSessionStorage(){
  const strFavourites = sessionStorage.getItem("favourites")
  const favourites = strFavourites ? JSON.parse(strFavourites): [];

  return favourites
}

  const setFavourite = (movieId) => {
    const cssSelector = `#movie${movieId} .star`;
    const imgElem = document.querySelector(cssSelector); 
   
    const favourites = getFavouritesFromSessionStorage()
    

    if(imgElem.src.includes('empty-star.png')){
        imgElem.src = 'icons/filled-star.png';

      if (!favourites.includes(movieId))

        favourites.push(movieId)
        sessionStorage.setItem("favourites",JSON.stringify(favourites))
    } else {
      const indexToRemove = favourites.indexOf(movieId)
      favourites.splice(indexToRemove,1)
      const strFavourites = JSON.stringify(favourites)
        imgElem.src = 'icons/empty-star.png';
        sessionStorage.setItem("favourites",strFavourites)
    }   
  }

 
  

  const displayHeadLine = ({title,summary,posterUrl}) => {
    return `${title}
    ${summary}
    ${posterUrl}
    `;
  }

  const init = () => {
    console.log("Dom Loaded")
    getMovies()
    getGenres()
  }

    
    
    const getMovieHTML = (movie) => {
      if (!movie){
        alert("SEM FILMES")
      }
      const filme = `<div id="movie${movie.id}" class="movie">
      <article>
      <h2>${movie.title}</h2>
      <button onclick="setFavourite(${movie.id})" class="btn">
        <img class="icon star" src="./icons/empty-star.png" alt="estrela vazia">
      </button>
      <div class="content">
      <figure>
        <img src="${movie.posterUrl}" class="imgfilme" alt="${movie.title}">
        <div class="text">
            <figcaption>${movie.summary}</figcaption>
            <div class="year">${movie.year}</div>
            <div><strong>Directors:</strong>${movie.director}</div>
            <div><strong>Actors:</strong>${movie.actors}</div>
        </div>
        <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#77B255" d="M36 32c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V4c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v28z"/><path fill="#FFF" d="M29.28 6.362c-1.156-.751-2.704-.422-3.458.736L14.936 23.877l-5.029-4.65c-1.014-.938-2.596-.875-3.533.138-.937 1.014-.875 2.596.139 3.533l7.209 6.666c.48.445 1.09.665 1.696.665.673 0 1.534-.282 2.099-1.139.332-.506 12.5-19.27 12.5-19.27.751-1.159.421-2.707-.737-3.458z"/></svg></button>
        </figure>
      </div>
      </article>
    </div>`
count++
    
    document.querySelector("#newMovies").innerHTML += filme
    

    }

    const populateGenres = (genres) => {
      genres.forEach(genre => {
      document.querySelector("#genres").innerHTML += `<option>${genre}</option>`
      }
    )}; 

    const filtrar = () => {
      filtro = document.getElementById("genres").value
      console.log(filtro)
      getMovies(filtro);

    }

    function displayMovies(movies) {
      //const [movie1,movie2] = movies;
      //console.log(movie1,movie2)
      
      document.querySelector('#newMovies').innerHTML = ""
      count=0
      movies.forEach(movie => {
        
        getMovieHTML(movie)
        
        
        displayFavourites()
      });

      function displayFavourites(){
        const favourites = getFavouritesFromSessionStorage();
        console.log(favourites)
        for (const movieId of favourites) {
          const imgElem = document.querySelector(`#movie${movieId} .icon`);
          if (imgElem) {
            imgElem.src = 'icons/filled-star.png';
          }
        }
      }
      
      
if (count == 0){
document.getElementById("ver").style.display = "block"
document.getElementById("ver").textContent = "Nao Encontrou nenhum Filme"
}else{
document.getElementById("ver").textContent = `Existem ${count} Filme`
}

      for(elem of document.querySelectorAll(".movie")){
  
        const movieid = elem.id.slice(5)
    
        const img = elem.querySelector(".icon");
    
    
        if (sessionStorage.getItem
          
          (movieid)){
          img.src = 'icons/filled-star.png';
        }
      }
/*
      const {title, summary, posterUrl} = movie1; // const movie1 = movie.title const | summary = movie.summary | postedUrl = movie.postedUrl
      const {title:title2,summary:summary2,posterUrl:posterUrl2} = movie2;
      displayHeadLine(title,summary,posterUrl)
      displayHeadLine(title2,summary2,posterUrl2)
*/
      
    }

    


    function getMovies(category){
  if (document.getElementById('genres').value == "1"){
      fetch(`https://moviesfunctionapp.azurewebsites.net/api/GetMovies`)
    .then(response => response.json())
    .then(json => {
      displayMovies(json)
    }).catch(err => console.log(err))
    }else{
      fetch(`https://moviesfunctionapp.azurewebsites.net/api/GetMovies?category=${category}`)
    .then(response => response.json())
    .then(json => {
      displayMovies(json)
    }).catch(err => console.log(err))
    }
  }

    function getGenres(){
      fetch("https://moviesfunctionapp.azurewebsites.net/api/GetGenres")
    .then(response => response.json())
    .then(json => {
      populateGenres(json)
    }).catch(err => console.log(err))
    }






