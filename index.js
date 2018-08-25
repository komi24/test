const express = require('express');
const app = express();
const hbs = require('hbs');

const Cat = require('./models/Cat');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/irondb');


app.use(express.static('public'));

app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/', (req, res, next) => {
	// Create one cat
	let myCat = new Cat({name: req.query.name});
	myCat.save()
	.then(()=>{
		// return Cat.find({name: req.query.search})
		return Cat.find({name: 'Minou'})
	})
	.then(cats => {
		res.render('index.hbs', {
			name: req.query.name, 
			animal: "Renard", 
			cats
		})
	})
});

app.get('/articles', (req, res, next) => {
	let articles = [
	 {name:'Oranges', price: 10},
	 {name:'Bananas', price: 10},
	 {name:'Pineapples', price: 10},
	 {name:'Watermelons', price: 10}
	 ];
	res.render('articles.hbs', {liste: articles});
});

app.get('/email', (req, res, next) => {
	res.render('email.hbs', {firstname: req.query.firstname, lastname: req.query.lastname} )
})

app.get('/about', (req, res, next) => {
	res.sendFile(__dirname + '/views/about.html');
})

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});