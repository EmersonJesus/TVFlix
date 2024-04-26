'use strict'

import {api_key,  fetchDataFromServer} from "./api.js"
import {createMovieCard} from "./movie-card.js"

export function  search(){
    const searchWrapper = document.querySelector("[search-wrapper]")
    const searchField =  document.querySelector("[search-field]")

    const searchResultsModal = document.createElement("div")
    searchResultsModal.classList.add("search-modal")
    document.querySelector("main").appendChild(searchResultsModal)

    let searchTimeout;

    searchField.addEventListener("input", function() {
        if(!searchField.value.trim()) {
            searchResultsModal.remove("active")
            searchWrapper.classList.remove("searching")
            clearTimeout(searchTimeout)
            return
        }

        searchWrapper.classList.add("searching")
        clearTimeout(searchTimeout)

        searchTimeout = setTimeout(function () {
            fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField.value}&page=1&include_adult=false&language=pt-BR`, function ({results : movieList}) {
                searchWrapper.classList.remove("searching")
                searchResultsModal.classList.add("active")
                searchResultsModal.innerHTML = ''

                searchResultsModal.innerHTML = `
                    <p class="label">Results for</p>

                    <h1 class="heading">${searchField.value}</h1>
        
                    <div class="movie-list">
                        <div class="grid-list"></div>
                    </div>                
                `

                for (const movie of movieList) {
                    const movieCard   = createMovieCard(movie)

                    searchResultsModal.querySelector('.grid-list').appendChild(movieCard)
                }
            })
        }, 500)
    })
}