const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: {type: Schema.Types.String},
    description: {type:Schema.Types.String},
    image: {type:Schema.Types.String},
    difficulty: {type:Schema.Types.Number}

})
cubeSchema.path('name').validate(function () {
    return this.name.length >= 3 && this.name.length <= 15
},
    'Name must be between 3 and 15 chars '
)
cubeSchema.path('description').validate(function () {
    return this.description.length >= 20 && this.name.length <= 200
}, 'Description must be between 20 and 200 chars'
)
cubeSchema.path('image').validate(function () {
    return this.image.startsWith('http') && this.image.endsWith('.png') ||
        this.image.endsWith('.jpg')
}, ' imageUrl must starts with http and ends with jpg or png')
cubeSchema.path('difficulty').validate(function () {
    return this.difficulty >= 1 && this.difficulty <= 6
}, 'difficulty must be between 1 and 6')

const Cube = mongoose.model('Cube', cubeSchema);
module.exports = Cube;