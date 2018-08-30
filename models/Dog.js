const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DogSchema = new Schema({
	name: {type: String, required: true},
	age: {type: Number, required: false}
})

const Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;