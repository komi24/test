const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// our first Route
app.get('/', (req, res, next) => {
	console.log(req);
	let name = req.query.name;
	console.log(req.query.name);
	// res.send(`<html><h1>Welcome ${name}. :)</h1><script>alert("Hello");</script></html>`);
	res.render('index.hbs', {name: req.query.name, animal: "Renard"})
  // res.sendFile(__dirname + '/views/index.html');
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