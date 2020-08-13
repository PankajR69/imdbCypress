///<reference types ="cypress"/>

describe('Fetching Imdb top 50 Movies', function(){

    it('Fetching movie details',function(){
        cy.visit('https://www.imdb.com/chart/top/')
        const moviesArr =[]
        const ratingList=[]
        cy.get('.titleColumn a').each(($el, index,$list) =>{

        const moviename = $el.text()
        const year = $el.next().contents().text()
        const id = $el.attr('href').match(/title\/(.*)\//)[1]
    
       
        if(moviename.includes("Cinema Paradiso")){
            return false
        }

        const movie = {
            moviename,   
            year,
            id
        }

        moviesArr.push(movie)
  
    })
    cy.get('td.ratingColumn.imdbRating :lt(50)').each(($el, index,$list) =>{  //using pseudo selector to get only 50 ratings

        const rating =$el.text().trim()
        const ratings ={
            rating
        }
        ratingList.push(ratings)
    })
        //Creating files to sore value
        
        cy.writeFile('movieList.json',moviesArr)
        cy.writeFile('ratings.json',ratingList)
    
    })

        it('Comparing Data with Stored Data',function(){

        cy.readFile('movieList.json').then(i =>{
            i.forEach((item)=>{            
            cy.visit('https://www.imdb.com/title/'+item.id)
            cy.get('#titleYear').should(($yr) => {
            expect($yr.text()).to.eq(item.year)  
            })
            cy.get('.title_wrapper h1').should(($title) => {
                expect($title.text()).to.contain(item.moviename)  
                })
            })
        });
        });

    })
