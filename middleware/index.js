let request = require("request"),
  moment = require("moment");
require("moment-recur");

moment().format();

const spotify_id = process.env.SPOTIFY_ID,
  spotify_secret = process.env.SPOTIFY_SECRET,
  vimeo_id = process.env.VIMEO_ID,
  vimeo_secret = process.env.VIMEO_SECRET;

let authOptions_spotify = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(spotify_id + ":" + spotify_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};
let authOptions_vimeo = {
  url: "https://api.vimeo.com/oauth/authorize/client",
  headers: {
    Authorization:
      "Basic " + Buffer.from(vimeo_id + ":" + vimeo_secret).toString("base64"),
    Accept: "application/vnd.vimeo.*+json;version=3.4"
  },
  form: {
    grant_type: "client_credentials",
    scope: "public"
  },
  json: true
};

let vimeoToken = (req, res, next) => {
  request.post(authOptions_vimeo, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Vimeo Web API
      res.locals.token = body.access_token;
      next();
    }
  });
};

let spotifyToken = (req, res, next) => {
  request.post(authOptions_spotify, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Vimeo Web API
      res.locals.token = body.access_token;
      next();
    }
  });
};

let calendarEvent = (req, res, next) => {
  let curDate = moment();
  let showTime = moment
    .recur()
    .every("Wednesday")
    .daysOfWeek()
    .every([1, 3])
    .weeksOfMonthByDay();
  if (showTime.matches(curDate)) {
    res.locals.radio = true;
    next();
  } else {
    res.locals.radio = false;
    next();
  }
};
module.exports = { vimeoToken, spotifyToken, calendarEvent };
