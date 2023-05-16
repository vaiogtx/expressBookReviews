const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  let username = req.query.username;
  let password = req.query.password;

  if (!username || ! password) {
    res.send(`username and(or) password is not provided.`);
  }
  // console.log(users);
  let exists_user = users.filter((user) => {
    return user.username === username
  });
  // console.log(exists_user);
  // console.log(exists_user.length);
  if (exists_user.length === 0) {
    users.push({ username: username, password: password });
    res.send(`User ${username} registered!`);
  } else {
    res.send(`User ${username} is already exist. Please use another user name.`)
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // res.send(JSON.stringify(books));
  // TASK 10: use promises and callback
  books.getAll()
      .then(result => res.status(200).send(result))
      .catch(err => res.status(500).send(err));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // let isbn = req.params.isbn;
  // let target = books[isbn];
  // if (target) {
  //   res.send(JSON.stringify(target));
  // } else {
  //   res.send(`Cannot find the book with ISBN: ${isbn}`);
  // }
  // TASK 11: use promises and callback
  books.getByISBN(req.params.isbn)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(500).send(err));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // let author = req.params.author;
  // let target = [];
  // let keys = Object.keys(books);
  // keys.forEach((key) => {
  //   if (books[key].author === author) target.push(books[key]);
  // });
  // res.send(target);

  // TASK 12: use promise and callback
  books.getByAuthor(req.params.author)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(500).send(err));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // let title = req.params.title;
  // let target = [];
  // Object.keys(books).forEach((key) =>{
  //   if (books[key].title.includes(title)) target.push(books[key]);
  // });
  // res.send(target);
  books.getByTitle(req.params.title)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(500).send(err));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  let isbn = req.params.isbn;
  let reviews = books[isbn].reviews;
  if (reviews) {
    res.send(reviews);
  } else {
    res.send(`There is no review for the book with ISBN: ${isbn}`);
  }
});

module.exports.general = public_users;
