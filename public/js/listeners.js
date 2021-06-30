
//get title input value
const titleInput = document.getElementById("titleInput");
//get author input value
const authorInput = document.getElementById("authorInput");
//get book find button
const findButton = document.getElementById("findButton");
//get div close button
const cancelButton = document.getElementById("closeDiv");
//get add book button
const addButton = document.getElementById("addBook");
// error message div
const errorMsg = document.getElementById("errorMsg");
// book stack for added books
const bookStack = document.getElementById("bookStack");
//book load placeholder button (eventually on load)        
const bookLoader = document.getElementById("load");


//holding area for books before they are added to shelf
const tempShelf = [];
//holding area for received JSON
const bookShelf = []; 

// FIND & ADD BOOKS FROM INPUT FIELDS

findButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value.replace(/\s/g, "+")
    const author = authorInput.value.replace(/\s/g, "+")
    const url = gbUrl(title, author);

    getBookInfo(url)
        .then(setHTML)
        .catch (e => {
            errorMsg.setAttribute('style', 'display:block');
            console.error(e);
        })

    titleInput.value = "";
    authorInput.value = "";
});

// create book object and add to array
function addBookToShelf(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn) {
    const newBook = new Book(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn);
    tempShelf.unshift(newBook);
};

// parse for title, author, img, ISBN, and book description
    // incl link to order book
    // link to https://www.carmichaelsbookstore.com/book/ISBN or https://www.amazon.com/s?k=ISBN
    // carmichaels does not log ebook IBSNs, better results from amazon :-P

function setHTML(book) {
    document.getElementById("title").textContent = book.volumeInfo.title;
    document.getElementById("author").textContent = book.volumeInfo.authors[0];
    document.getElementById("description").textContent = book.volumeInfo.description;
    document.getElementById("cover").setAttribute('src', book.volumeInfo.imageLinks.thumbnail);
    document.getElementById("buyBook").setAttribute('href', `https://www.amazon.com/s?k=${book.volumeInfo.industryIdentifiers[0].identifier}`);
    document.getElementById("bookInfo").setAttribute("style", "display:block");
    
        // add book to bookShelf array for future use (title, author, description, img link, isbn 13)
    addBookToShelf(book.volumeInfo.title, book.volumeInfo.authors[0], book.volumeInfo.description, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.industryIdentifiers[0].identifier)
};
    

// CLOSE BOOK WINDOW

cancelButton.addEventListener('click', (e) => {
    bookInfo.setAttribute('style', 'display:none');
    // remove current book from bookShelf array
    tempShelf.shift();
});


// ADD TO BOOKSTACK

addButton.addEventListener('click', (e) => {
    // create book object with current book info
    const book = tempShelf[0];
    setBookStack(book);
    bookInfo.setAttribute('style', 'display:none');
    // save bookStack array to db
    //postData('/add-book', book);
    //console.log(JSON.stringify(bookShelf));
    //clear temp shelf
    tempShelf.shift();
});

// append book divs to bookStack - use with forEach
// call to set stack = bookShelf.forEach(setBookStack);
function setBookStack(book){
    const apiUrl = "http://localhost:8081/bookshelf";
    addBook(apiUrl, book);
    const bookDiv = document.createElement('div');
    const bookStack = document.getElementById("bookStack");
    bookDiv.innerHTML = `
        <div class="book ${book.spineCSS}" id="${book.isbn}">
        <h2>${book.title} - ${book.author}</h2>
        </div>`;
    bookStack.prepend(bookDiv);
    //bookShelf.unshift(book);  

};


// LOAD BOOKS FROM SHELF
//add books to shelf ON LOAD 
window.addEventListener('load', (e) => {
//bookLoader.addEventListener('click', (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8081/bookshelf";

    getShelfInfo(apiUrl)
       .then(getBooks) 
       .then(apiHTML)  
        .catch (e => {
            console.error(e);
        })
});

//used in Event Listener ONLOAD with getShelfInfo fetch

function getBooks(shelfData) {
    for (let i = 0; i < shelfData.length; i++) {
        bookShelf.push(shelfData[i]);
    }
    return bookShelf;
};

function apiHTML(bookShelf) {
    for (let i = 0; i < bookShelf.length; i++) {
        const bookDiv = document.createElement('div');
        bookDiv.innerHTML = `
        <div class="book ${bookShelf[i].spineCSS}" id="${bookShelf[i].isbn}">
        <h2>${bookShelf[i].title} - ${bookShelf[i].author}</h2>
        </div>`;
        bookStack.prepend(bookDiv);
    }
};
    
