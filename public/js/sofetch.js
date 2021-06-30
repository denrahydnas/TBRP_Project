// book stack for added books
const bookStack = document.getElementById("bookStack");

//holding area for books before they are added to shelf
const tempShelf = [];

// book class used to store book info in array 
class Book {
    constructor(title, author, description, img, isbn, spineCSS = spineRandomizer(), status = "unread", date = new Date()){
        this.title = title;
        this.author = author;
        this.description = description;
        this.img = img;
        this.isbn = isbn;
        this.spineCSS = spineCSS;
        this.status = status;
        this.date = date;
    };
};


// spine decoration randomizer function
function spineRandomizer(){
    const spines = [
        "b_one",
        "b_two",
        "b_three",
        "b_four",
        "b_five",
    ];
    return (spines[Math.floor(Math.random() * spines.length)]);
};



// create book object and add to array
function addBookToShelf(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn) {
    const newBook = new Book(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn);
    tempShelf.unshift(newBook);
};

// append book divs to bookStack - use with forEach
// call to set stack = bookShelf.forEach(setBookStack);
function setBookStack(book){
        const bookDiv = document.createElement('div');
        const bookStack = document.getElementById("bookStack");
        bookDiv.innerHTML = `
            <div class="book ${book.spineCSS}" id="${book.isbn}">
            <h2>${book.title} - ${book.author}</h2>
            </div>`;
        bookStack.prepend(bookDiv);
        bookShelf.unshift(book);  
};


// value check and prep title and author input (swap spaces for + sign)
// add correct suffix to URL (use template literals ``)

function gbUrl(title, author) {
    // create url suffix: if Book input and Author input are used prep both
    if (title !== "" && author !== "") {
        errorMsg.setAttribute('style', 'display:none');
        return (`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`);
    // if bookinput is used and author is not, prep just book plus newest
    } else if (title !== "" && author == "") {
        errorMsg.setAttribute('style', 'display:none');
        return(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+newest`);
    // if bookinput is not used and author is, prep just author plus newest
    } else if (title == "" && author !== "") {
        errorMsg.setAttribute('style', 'display:none');
        return(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}+newest`);
    // if neither inputs are filled, pop up alert below search fields
    } else {
        errorMsg.setAttribute('style', 'display:block');
    };
}

// on submit, fetch data with correct url
// catch errors - show hidden div if error (display:block)
// return book info json

async function getJSON(url) {
try {
    const response = await fetch(url);
    return await response.json();
} catch(error) {
    throw error;
    }
};

//get book info from Google books
async function getBookInfo(url) {
    const bookData = await getJSON(url);
    const book = bookData.items[0];
    return book;
};

// get shelf info from internal json file
async function getShelfInfo(url) {
    const shelfData = await getJSON(url);
    return shelfData;
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



const bookLoader = document.getElementById("load");
const bookShelf = []; 

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

function getBooks(shelfData) {
    for (let i = 0; i < shelfData.length; i++) {
        bookShelf.push(shelfData[i]);
    }
    return bookShelf;
}
