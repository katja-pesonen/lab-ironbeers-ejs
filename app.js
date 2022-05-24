const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {  
  res.render('index'); 
});

app.get('/beers',  async (req, res) => {
  const beersFromApi = await punkAPI.getBeers();
  const first25 = beersFromApi.slice(0,25);
  // console.log(beersFromApi.slice(0,25));
  res.render('beers', { first25 });
});


app.get('/random-beer',  (req, res) => {
  const randomBeer = punkAPI.getRandom();
  console.log("Random Beer", randomBeer);
  randomBeer.then(() => {
    res.render('random-beer', { randomBeer });
    randomBeer.catch(err => { console.log(err) })
  })
});


// app.get('/beers', (req, res) => {  res.render('beers.ejs') });
// app.get('/random-beer', (req, res) => {  res.render('index') });



app.listen(3000, () => console.log('🏃‍ on port 3000'));
