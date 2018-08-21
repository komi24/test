const express = require('express');
const app = express();

app.use(express.static('public'));

// our first Route
app.get('/', (request, response, next) => {
  // response.send('<html><h1>Welcome Mike. :)</h1><script>alert("Hello");</script></html>');
  response.sendFile(__dirname + '/views/index.html');
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});