//only for testing

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { response } = require('express');


 const url = 'https://www.imdb.com/chart/top/'
 const movieUrl = 'https://www.imdb.com/title/'


 function topFiftyMovies(){
     return fetch(`${url}`)
     .then(response => response.text())
    
     .then(body =>{
         const movies =[];
        const $ = cheerio.load(body);
        $('.titleColumn a').each(function(i,element){
        
        const $element = $(element);
        const moviename = $el.text()
        const year = $el.next().contents().text()
        const id = $el.attr('href').match(/title\/(.*)\//)[1]
            const movie ={
                moviename,
                year,
                id
            };
            movies.push(movie);
        });
       
        return  movies;
     });
 }

    function getMovie(imdbId){
        return fetch(`${movieUrl}${imdbId}`)
        .then(response => response.text())
        .then(body =>{
            const $ = cheerio.load(body);
            const $title = $('.title_wrapper h1')

            const title = $title.first().contents().filter(function(){
                return this.type === 'text';
    
            }).text().trim()

            const rating = $('span[itemProp="ratingValue"]').text()
            const year = $('#titleYear').text()
            return{
                title,
                rating,
                year
            }
        })
    }

 module.exports ={
     topFiftyMovies,
     getMovie
 };
