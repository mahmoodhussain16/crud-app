const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data', 'users.json'); // Users data ka file path

// Data ko read karna
const getAllUsers = () => {
  if (fs.existsSync(dataFilePath)) {
    const fileData = fs.readFileSync(dataFilePath);
    return JSON.parse(fileData); // JSON data ko JavaScript object mein convert karna
  }
  return []; // Agar file nahi hai toh empty array return karenge
};

// Users data ko save karna
const saveUser = (users) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2)); // Data ko JSON format mein save karna
};

module.exports = { getAllUsers, saveUser };
