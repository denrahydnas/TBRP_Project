
//get title input value
const titleInput = document.getElementById("titleInput");
//get author input value
const authorInput = document.getElementById("authorInput");
// error message div
const errorMsg = document.getElementById("errorMsg");
// book stack for added books
const bookStack = document.getElementById("bookStack");

// Action Buttons 
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

//***************************************************** */

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

    
//***************************************************** */

// CLOSE BOOK WINDOW

//***************************************************** */

cancelButton.addEventListener('click', (e) => {
    bookInfo.setAttribute('style', 'display:none');
    // remove current book from bookShelf array
    tempShelf.shift();
});

//***************************************************** */

// ADD TO BOOKSTACK

//***************************************************** */

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

//***************************************************** */

// LOAD BOOKS FROM SHELF ON PAGE LOAD

//***************************************************** 

window.addEventListener('load', (e) => {
    e.preventDefault();

    getShelfInfo(apiUrl)
       .then(getBooks) 
       .then(apiHTML)  
        .catch (e => {
            console.error(e);
        })
});


function getBooks(shelfData) {
    for (let i = 0; i < shelfData.length; i++) {
        bookShelf.push(shelfData[i]);
    }
    return bookShelf;
};

// ALSO USED IN DELETE EVENT

function apiHTML(bookShelf) {
    for (let i = 0; i < bookShelf.length; i++) {
        if (bookShelf[i] !== null) {
            const bookDiv = document.createElement('div');
            bookDiv.innerHTML = `
            <div class="book ${bookShelf[i].spineCSS}" id="${i}">
            <h2 id="${i}" >${bookShelf[i].title} - ${bookShelf[i].author}</h2>
            </div>`;
            bookStack.prepend(bookDiv);
        }
    }
};

//***************************************************** 

// BOOK SPINE CLICK EVENT

//***************************************************** 

// click on book div
// get index from div id
bookStack.addEventListener('click', function(e) {
    id = parseInt(e.target.id);
    bookHTML(id); 
    
}, false);


//***************************************************** 

// DELETE BOOK EVENT

//***************************************************** 

// allow user to remove book from pile
remButton.addEventListener('click', (e) => {
    //get index/id of book object
    id = remButton.value;
    //fetch delete to remove from JSON file
    deleteBook(id, apiUrl)
    // refresh bookStack
        .then(bookShelf[id] = null)
        .then(bookStack.innerHTML = "")
        .then(apiHTML(bookShelf))
        
    //close window
    bookInfo.setAttribute('style', 'display:none');
});
