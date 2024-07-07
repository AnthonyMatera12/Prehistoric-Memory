// Anthony Matera anm326 

// author and pub dropdowns only work after the add button is pushed
// when list is clicked, the title box says "please fill out this field"
// year has limit values (0 to 2024)

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.json());

// Book class to represent a book object
class Book {
  constructor(title, author, genre, publisher, year, types) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.publisher = publisher;
    this.year = year;
    this.types = types;
  }
}

// Array to store books
let bookList = [];
let authors = new Set();
let publishers = new Set();

// Route to add a new book
app.post("/addBook", (req, res) => {
  const { title, author, genre, publisher, year, types } = req.body;
  const newBook = new Book(title, author, genre, publisher, year, types);
  bookList.push(newBook);
  
  if (!authors.has(author)) {
    authors.add(author);
  }
  if (!publishers.has(publisher)) {
    publishers.add(publisher);
  }
  
  res.json({ authors: Array.from(authors), publishers: Array.from(publishers) });
});

// Route to get all books
app.get("/getBooks", (req, res) => {
  res.json(bookList);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});