const express = require('express');
const app = express();
const hbs = require('hbs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const Cat = require('./models/Cat');
const Dog = require('./models/Dog');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/irondb');


const Player = mongoose.model('Player', 
	{
		pn: Number,
		x: Number,
		y: Number
	})

app.use(express.static('public'));

app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.get('/players', (req, res, next) => {
	Player.find()
	.then(results => {
		res.send({players: results})
	})
})
app.get('/set_player', (req, res, next) => {
	Player.updateOne(
		{pn: req.query.pn},
		{x: req.query.x, y: req.query.y})
	.then(results => {
		res.send({players: results})
	})
})
app.get('/new_player1', (req, res, next) => {
	// Create one cat
	Dog.create({name: 'Milou', age: 12})
	.then(()=>{
		res.redirect('/')
	})
});
app.get('/new_player2', (req, res, next) => {
	// Create one cat
	let myPlayer = new Player({pn: 2, x: 3, y:4});
	myPlayer.save()
	.then((player)=>{
		res.send({player})
	})
});

app.get('/dog/:name', (req, res, next) => {
	console.log(req.params.name)
	Dog.find({name: req.params.name})
	.then(dogs=>{
		res.send(dogs)		
	})
})

app.post('/login', (req, res, next) => {
	if (req.body.email === 'ironhack') {
		res.send('ok')
	} else {
		res.send('go away !')
	}
})


app.get('/', (req, res, next) => {
	Dog.find()
	.then(dogs => {
		res.render('index', {dogs})
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