const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Importing Routes (Controller ko import karenge)
const userRoutes = require('./controllers/userController');
app.use('/', userRoutes);

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
