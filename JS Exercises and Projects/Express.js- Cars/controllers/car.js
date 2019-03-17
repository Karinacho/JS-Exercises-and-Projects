

const Car = require('../models/Car')
const User = require('../models/User')
const Rent = require('../models/Rent')
module.exports = {
    getAll: (req, res) => {
        Car.find().then((cars) => {
            res.render('car/all', { cars })
        })

    },
    getAdd: (req, res) => {

        res.render('car/add')
    },
    getPost: (req, res) => {
        let { model, image, pricePerDay } = req.body;
        Car.create({
            model,
            image,
            pricePerDay,
        });
        res.redirect('/')

    },
    getRented: (req, res) => {

        Car.findById(req.params.id)
            .then((car) => {
                res.render('car/rent', car)
            })
    },
    postRented: async (req, res) => {
        try {
            let rent = await Rent.create({
                days: req.body.days,
                car: req.params.id,
                owner: req.user._id
            });
            let carById = await Car.findById(req.params.id);
            carById.isRented = true;
            carById.save();

            res.redirect('/')
        } catch (err) {
            console.log(err)
        }
    },
    getMyRent: async(req,res)=>{
        let myCars = await Rent.find()
     res.render('user/rented')
    }
}


