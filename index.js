const express = require('express');
const app = express();

app.use(express.static('public'));

// our first Route
app.get('/', (request, response, next) => {
	console.log(request);
	let name = request.query.name;
	console.log(request.query.name);
	response.send(`<html><h1>Welcome ${name}. :)</h1><script>alert("Hello");</script></html>`);
  // response.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (request, response, next) => {
	response.sendFile(__dirname + '/views/about.html');
})

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});