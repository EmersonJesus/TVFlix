'use strict'

const api_key = '79cfaf455692bc20d65698000295b935'
const imageBaseURL = 'http://image.tmdb.org/t/p/'

const fetchDataFromServer = function(url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data =>  callback(data, optionalParam))
}

export  {
    imageBaseURL, api_key, fetchDataFromServer
}