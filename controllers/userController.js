const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Display all users
router.get('/', (req, res) => {
  const users = userModel.getAllUsers(); // File se users read karna
  res.render('index', { users }); // View mein users pass karna
});

// Add new user
router.post('/add', (req, res) => {
  const users = userModel.getAllUsers(); // Existing users ko read karna
  const newUser = {
    id: Date.now().toString(), // Unique ID generate karna
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser); // Naye user ko array mein add karna
  userModel.saveUser(users); // Updated users array ko file mein save karna
  res.redirect('/'); // Home page par redirect karna
});

// Edit user
router.get('/edit/:id', (req, res) => {
  const users = userModel.getAllUsers();
  const user = users.find(u => u.id === req.params.id); // User ko ID ke basis pe find karna
  if (user) {
    res.render('edit', { user }); // Edit page par user ko render karna
  } else {
    res.redirect('/'); // Agar user nahi mila toh home page par redirect karna
  }
});

// Update user
router.post('/edit/:id', (req, res) => {
  const users = userModel.getAllUsers();
  const userIndex = users.findIndex(u => u.id === req.params.id); // User ka index find karna
  if (userIndex !== -1) {
    users[userIndex].name = req.body.name; // User ka naam update karna
    users[userIndex].email = req.body.email; // User ka email update karna
    userModel.saveUser(users); // Updated users ko file mein save karna
  }
  res.redirect('/'); // Home page par redirect karna
});

// Delete user
router.get('/delete/:id', (req, res) => {
  let users = userModel.getAllUsers(); // Users ko read karna
  users = users.filter(u => u.id !== req.params.id); // Jo user delete karna hai, usse filter karna
  userModel.saveUser(users); // Updated users array ko file mein save karna
  res.redirect('/'); // Home page par redirect karna
});

module.exports = router;
