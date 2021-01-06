const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // where to find templates

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // allow serves static from public folder (not node.js routing res.sendFile files)

app.use((req, res, next) => {
  User.findById('5ff63ae5cdc65351cc1f06d3')
    .then((user) => {
      req.user = user; // adding user to every req middleware executed below
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const user = 'norbert';
const password = '';
const dbName = 'ClusterNkNodeCompleteTemplate';

mongoose
  .connect(
    `mongodb+srv://${user}:${password}@clusternknodecompletete.jemcj.mongodb.net/${dbName}?retryWrites=true&w=majority`
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Norbert',
          email: 'norbert@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));
