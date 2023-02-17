const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const axios = require('axios');
//TODO: Uncomment to make use of database, once set up
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const client_secret = process.env.CLIENT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(session({
  //grab the secret from the .env file
  secret : sessionSecret,
  resave : true,
  saveUninitialized : false
}))
//Setup routes to the Server
//Look at /controllers folder
app.use("/", routes);

//TODO: Uncomment to make use of database, once set up
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`)
    });
});

app.use(express.json());


app.get('/login', (req, res) => {
  var queryString = req.url.split('?')[1];
  var queryArray = queryString.split('&');
  var code = null;
  for (var i = 0; i < queryArray.length; i++) {
    var pair = queryArray[i].split('=');
    if (pair[0] == 'code') {
      code = pair[1];
      break;
    }
  }
  console.log(code);
  if (code) {
    res.redirect('/getToken?code=' + code);
  } else {
    res.redirect('/');
  }
});

app.get('/getToken', async (req, res) => {
  try {
    const code = req.query.code;
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: "6bed90201b9cbadbca77",
      // grab the secret from the .env file later
      client_secret: client_secret,
      code
    }, {
      headers: {
        Accept: 'application/json'
      }
    });
    // store the token in the session
    req.session.token = response.data.access_token;
    res.redirect('/grabinfo?token=' + response.data.access_token);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching access token');
  }
});

app.get('/grabinfo', async (req, res) => {
  try {
    const token = req.query.token;
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: 'token ' + token
      }
    });
    // all user info can be grabed from session now. .login for username, .avatar_url for avatar, etc.
    req.session.user = response.data;
    console.log(req.session.user.login);
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while fetching user info');
  }
});



// app.listen(PORT, () => {
//   console.log(`Server is listening at http://localhost:${PORT}`);
// });
