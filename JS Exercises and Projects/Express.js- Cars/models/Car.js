const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String, required: true },
    pricePerDay: { type: Number, required: true },
    isRented: { type: Boolean, required: true, default: false }

});
const Car = mongoose.model('Car', carSchema);
module.exports = Car;
