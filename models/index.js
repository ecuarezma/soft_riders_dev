var mongoose = require("mongoose");
mongoose.set("debug", true);

const uri = `mongodb+srv://ecuarezma:${process.env.DB_PWD}@jovial-cluster-bd0wc.mongodb.net/Soft_Riders?retryWrites=true&w=majority`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  dbName: "Soft_Riders"
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("connected to db!");
  })
  .catch(err => {
    console.log("ERROR: ", err.message);
  });

mongoose.Promise = Promise;

module.exports.Subscriber = require("./subscriber");
