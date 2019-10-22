var mongoose = require("mongoose");
mongoose.set("debug", true);

const password = process.env.DB_DEV_PWD;
const admin = process.env.ADMIN;

mongoose
  .connect(
    `mongodb+srv://ecuarezma:${process.env.DB_PWD}@jovial-cluster-bd0wc.mongodb.net/Soft_Riders?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useCreateIndex: true } // developer database
    // `mongodb+srv://${admin}:${password}@cluster0-0wjpt.mongodb.net/Soft_Riders?retryWrites=true&w=majority`,
    // { useNewUrlParser: true, useCreateIndex: true } // production database
  )
  .then(() => {
    console.log("connected to db!");
  })
  .catch(err => {
    console.log("ERROR: ", err.message);
  });

mongoose.Promise = Promise;

module.exports.Subscriber = require("./subscriber");
