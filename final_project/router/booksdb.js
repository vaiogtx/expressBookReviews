let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

const getAll = () => Promise.resolve(books);
const getByISBN = (isbn) => Promise.resolve(books[isbn]);
// const getByAuthor = (author) => Promise.resolve(Object.keys(books).forEach());

const getByAuthor = (author) => {
      return new Promise(function(resolve, reject) {
            let list = [];
            Object.keys(books).forEach((key) => {
                  if (books[key].author === author) list.push(books[key]);
            });
            resolve(list);
      });
};

const getByTitle = (title) => {
      return new Promise((resolve, reject) =>{
            let list = [];
            Object.keys(books).forEach((key) => {
              if (books[key].title.includes(title)) list.push(books[key]);
            });
            resolve(list);
      });
};

module.exports = {
      books, getAll, getByISBN, getByAuthor, getByTitle
};
