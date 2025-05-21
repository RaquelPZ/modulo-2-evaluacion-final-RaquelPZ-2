'use strict';

// DATA
const btnSearch = document.querySelector(".btn_buscar");
const btnReset = document.querySelector(".btn_reset");
const inputAnime = document.querySelector(".input_anime");
const album = document.querySelector(".album");
const favorites = document.querySelector(".favorites");
let writeAnime;
let card;
let listAnimes;
let nameAnime;
//let cardsFavs = [];
let listAnimeFavs = [];

// FUNCTION
// Paint the cards with html format
function printCard(searchAnimes){
       let cards = " ";
       for(let i = 0; i < searchAnimes.length; i++){
           cards += `
               <ul class="card">
                   <div class="name">${searchAnimes[i].title}</div>
                   <div class="img">
                       <img src="${searchAnimes[i].images.webp.image_url}"
                       alt="Foto del anime: ${searchAnimes[i].title}">
                   </div>
               </ul>`;            
           }    
       album.innerHTML = cards;
}

// Paint the favorite cards with html format:
function printCardFav(searchAnimesFavs){ 
    let cardsFavs = "";
    for(let i = 0; i < searchAnimesFavs.length; i++){
            cardsFavs += `
                <ul class="card_favorites">
                    <div class="img_fav">
                        <img src="${searchAnimesFavs[i].images.webp.image_url}"
                        alt="Foto del anime: ${searchAnimesFavs[i].title}">
                    </div>
                    <div class="name_fav">${searchAnimesFavs[i].title}</div>
                </ul>`;            
           }    
       favorites.innerHTML = cardsFavs;
}

// EVENT
// Click on the btn and search for the written anime:
btnSearch.addEventListener ("click", (ev) =>{
    ev.preventDefault();
    writeAnime = inputAnime.value;
    let filterAnime = listAnimes.filter (n => n.title.includes(writeAnime));
    printCard(filterAnime);
});

// Click the button and re-enter the search:
btnReset.addEventListener ("click", (ev) =>{
    ev.preventDefault();
    printCard(listAnimes);
    inputAnime.value = " ";
});

// Click on the chrome and add to favorites:
album.addEventListener("click", (event) => {
    event.preventDefault();
    const card = event.target.closest(".card");
    if (card) {
        let isFav = card.classList.contains("card_fav");
        card.classList.toggle("card_fav");
        let animeTitleElem = card.querySelector(".name")
        let animeTitle = animeTitleElem.innerHTML
        if (isFav){
            listAnimeFavs = listAnimeFavs.filter(anime => anime.title !== animeTitle)
        } else{
            let animeData = listAnimes.find(anime => anime.title === animeTitle)
            listAnimeFavs.push(animeData);
        }
        printCardFav(listAnimeFavs);
        
    }



});

// API
fetch('https://api.jikan.moe/v4/anime?q=naruto')
    .then(res => res.json())
    .then(data => {
        listAnimes = data.data;
        printCard(listAnimes);
        printCardFav(listAnimeFavs);
    });
