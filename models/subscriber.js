var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var subscriberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
    required: "Please enter a first name!"
  },
  lastName: {
    type: String,
    maxlength: 50,
    required: "Please enter a last name!"
  },
  email: {
    type: String,
    lowercase: true,
    maxlength: 50,
    unique: true,
    required: "Please enter your email!"
  },
  location: {
    type: String,
    maxlength: 50,
    required: "Please enter location!"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

subscriberSchema.plugin(uniqueValidator, {
  message: "{VALUE} is already registered."
});

var Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Subscriber.create({
//     firstName: "Edgar",
//     lastName: "Cuarezma",
//     email: "eCuAreZmA@gmail.com",
//     location: "St Francis, WI"
// }).then(newData => {
//     console.log(newData)
// }).catch(err => {
//     console.log(err)
// })

module.exports = Subscriber;
