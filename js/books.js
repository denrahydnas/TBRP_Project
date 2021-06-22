'use strict';

// book array - eventually write this to db to save
const bookShelf = [];

// book class used to store book info in array 
class Book {
    constructor(title, author, description, img, isbn, status = "unread"){
        this.title = title;
        this.author = author;
        this.description = description;
        this.img = img;
        this.isbn = isbn;
        this.status = status;
    };

    get date_added(){
        return new Date();
    };

    get spineCSS(){
        const spines = [
            "b_one",
            "b_two",
            "b_three",
            "b_four",
            "b_five",
        ];
        return (spines[Math.floor(Math.random() * spines.length)]);
    };
};

// create book object and add to array
function addBookToShelf(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn) {
    const newBook = new Book(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn);
    bookShelf.unshift(newBook);
};

// append book divs to bookStack - use with forEach
// call to set stack = bookShelf.forEach(setBookStack);
function setBookStack(book){
        const bookDiv = document.createElement('div');
        const bookStack = document.getElementById("bookStack");
        bookDiv.innerHTML = `
            <div class="book ${book.spineCSS}">
            <h2>${book.title} - ${book.author}</h2>
            </div>`;
        bookStack.appendChild(bookDiv);
};

// call to set stack = bookShelf.forEach(setBookStack);