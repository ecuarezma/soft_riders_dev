const express = require("express"),
  router = express.Router({ mergeParams: true }),
  mailgun = require("mailgun-js"),
  moment = require("moment"),
  db = require("../models"),
  middleware = require("../middleware");
require("moment-recur");

moment().format();

//MAILGUN PRESETS (SANDBOX)
const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

router
  .route("/")
  .get(middleware.calendarEvent, (req, res) => {
    res.render("index", {
      error: req.flash("error"),
      success: req.flash("success")
    });
  })
  .post((req, res) => {
    let { firstName, lastName, email, location } = req.body;
    db.Subscriber.create(req.body)
      .then(newSubscriber => {
        req.flash("success", "Thank you for signing up!");
        res.redirect("/");
        //MAILGUN DATA
        const notifier = {
          from: "Soft Riders <noreply@soft-riders.com>",
          to: `ecuarezma@gmail.com`,
          subject: "You have a new subscriber!",
          text: `${firstName} ${lastName} from ${location} has joined Soft Riders' mailing list!
          Their email is ${email}.`
        };
        const welcomeEmail = {
          from: "Soft Riders <noreply@soft-riders.com>",
          to: `${email}`,
          subject: `Welcome to Soft Riders, ${firstName}!`,
          text: `Thank you for joining the mailing list!`
        };
        //SEND EMAIL
        mg.messages().send(notifier, function(error, body) {
          if (error) {
            console.log(error);
          }
          console.log(body);
        });
        mg.messages().send(welcomeEmail, function(error, body) {
          if (error) {
            console.log(error);
          }
          console.log(body);
        });
        console.log(newSubscriber);
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/");
      });
  });

router.get("/archives", (req, res) => {
  res.render("archives");
});

router.get("/playlists", middleware.spotifyToken, (req, res) => {
  res.render("soft_playlists");
});

router.get("/promos", middleware.vimeoToken, (req, res) => {
  res.render("promos");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
