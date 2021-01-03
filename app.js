const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // where to find templates

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // allow serves static from public folder (not node.js routing res.sendFile files)

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user; // adding user to every req middleware executed below
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
