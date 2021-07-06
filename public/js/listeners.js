
//get title input value
const titleInput = document.getElementById("titleInput");
//get author input value
const authorInput = document.getElementById("authorInput");
// error message div
const errorMsg = document.getElementById("errorMsg");
// book stack for added books
const bookStack = document.getElementById("bookStack");

// Action Buttons ***************************************
//get book find button
const findButton = document.getElementById("findButton");
//get div close button
const cancelButton = document.getElementById("closeDiv");
//get add book button
const addButton = document.getElementById("addBook");
//get remove book button
const remButton = document.getElementById('remBook');
//get order book button
const buyButton = document.getElementById("buyBook");

// BOOK INFO DIV ELEMENTS
const bookInfo = document.getElementById("bookInfo");
const divTitle = document.getElementById("title");
const divAuth = document.getElementById("author");
const divDesc = document.getElementById("description");
const divCover = document.getElementById("cover");
const divDays = document.getElementById("days");


//holding area for books before they are added to shelf
const tempShelf = [];
//holding area for received JSON
const bookShelf = []; 
//api url
const apiUrl = "http://localhost:8081/bookshelf";


//***************************************************** */

// FIND & ADD BOOKS FROM INPUT FIELDS

findButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = titleInput.value.replace(/\s/g, "+")
    const author = authorInput.value.replace(/\s/g, "+")
    const url = gbUrl(title, author);

    // ADD CHECK FOR BOOKS ALREADY IN LIST

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
    divTitle.textContent = book.volumeInfo.title;
    divAuth.textContent = book.volumeInfo.authors[0];
    divDesc.textContent = book.volumeInfo.description;
    divCover.setAttribute('src', book.volumeInfo.imageLinks.thumbnail);
    buyButton.setAttribute('href', `https://www.amazon.com/s?k=${book.volumeInfo.industryIdentifiers[0].identifier}`);
    buyButton.setAttribute("style", "display:block");
    addButton.setAttribute("style", "display:block");
    remButton.setAttribute("style", "display:none");
    divDays.setAttribute("style", "display:none");
    bookInfo.setAttribute("style", "display:block");

    
        // add book to bookShelf array for future use (title, author, description, img link, isbn 13)
    addBookToShelf(book.volumeInfo.title, book.volumeInfo.authors[0], book.volumeInfo.description, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.industryIdentifiers[0].identifier)
};
    
//***************************************************** */

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
    // save book to array db
    addBook(apiUrl, book);
    //console.log(JSON.stringify(bookShelf));
    //clear temp shelf
    tempShelf.shift();
});

// append book divs to bookStack - use with forEach
// call to set stack = bookShelf.forEach(setBookStack);
function setBookStack(book){
    //add book graphic
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `
        <div class="book ${book.spineCSS}" id="${(bookShelf.length)}">
        <h2 id="${(bookShelf.length)}">${book.title} - ${book.author}</h2>
        </div>`;
    bookStack.prepend(bookDiv);
    bookShelf.push(book);  
};

//***************************************************** */

// LOAD BOOKS FROM SHELF
//add books to shelf ON LOAD 

window.addEventListener('load', (e) => {
    e.preventDefault();

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
        <div class="book ${bookShelf[i].spineCSS}" id="${i}">
        <h2 id="${i}" >${bookShelf[i].title} - ${bookShelf[i].author}</h2>
        </div>`;
        bookStack.prepend(bookDiv);
    }
};

//***************************************************** */

// Show Book Info

// click on book div
// get index from div id
bookStack.addEventListener('click', function(e) {
    id = parseInt(e.target.id);
    bookHTML(id); 
    
}, false);

// populate book Info div
// remove add and buy buttons, keep close button
function bookHTML(id) {
    divTitle.textContent = bookShelf[id].title;
    divAuth.textContent = bookShelf[id].author;
    divDesc.textContent = bookShelf[id].description;
    divCover.setAttribute('src', bookShelf[id].img);
    divDays.textContent = daysOnList(id) + " days in TBR Pile";
    divDays.setAttribute("style", "display:block");
    addButton.setAttribute("style", "display:none");
    remButton.setAttribute("style", "display:block");
    remButton.setAttribute("value", id);
    buyButton.setAttribute("style", "display:none");
    bookInfo.setAttribute("style", "display:block");  
};
// include # days on list
function daysOnList(id) {
    const addDate = Date.parse(bookShelf[id].date);
    const today = Date.now();
    const millis = today - addDate;
    const days = Math.ceil(millis / 86400000);
    return days;
};

// DELETE BOOK *********************************

// allow user to remove book from pile
remButton.addEventListener('click', (e) => {
    //get index/id of book object
    id = remButton.value
    //console.log(id);
    //fetch delete to remove from JSON file
    remBook(id);
    //remove book from bookShelf
    //bookShelf.splice(id, 1);  
    // refresh bookStack
});
