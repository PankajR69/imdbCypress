const express = require('express'); 
const fetchData = require('./fetchData');
const app =express();

app.get('/',(req,res) =>{
res.json({
    message: 'Hello There '
})
})
app.get('/search',(req,res) =>{
    res.json({
        message: 'Hello There '
    })
    })
app.get('/title/:imdbID',(req,res) =>{
    fetchData
    .getMovie(req.params.imdbID)
    .then(movie =>{
        res.json(movie)
    })
    })

const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`listening to port ${port}`)
})