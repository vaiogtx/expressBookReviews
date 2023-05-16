const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  let username = req.query.username;
  let password = req.query.password;

  if (!username || !password) {
    res.send("username and(or) password is missing.");
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in.");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password."});
  }


});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  let isbn = req.params.isbn;
  if (!isbn) {
    return res.status(400).json({ message: "Please assign the ISBN"});
  }
  let book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: `Book with ISBN: ${isbn} not found`});
  }

  // use the user as the key of the review
  book.reviews[req.user.data] = req.query.review;
  console.log(book.reviews);
  return res.status(200).json({ message: "Review added.", review: book.reviews })
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  if (!isbn) {
    return res.status(400).json({ message: "Please assign the ISBN"});
  }
  let book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: `Book with ISBN: ${isbn} not found`});
  }

  delete book.reviews[req.user.data];

  return res.status(200).json({ message: "Review deleted.", review: book.reviews });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
