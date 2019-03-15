const Cube = require('../models/Cube')
module.exports = {
    homeGet: (req, res) => {
        Cube.find({}).sort('-difficulty')
        .then((cubes)=> {
            res.render('index', {cubes})
        })
    },
    about: (req, res) => {
       res.render('about')
    },
    search: (req,res) => {

    }
}