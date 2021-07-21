
//get title input value
const titleInput = document.getElementById("titleInput");
//get author input value
const authorInput = document.getElementById("authorInput");
// error message div
const errorMsg = document.getElementById("errorMsg");
// book stack for added books
const bookStack = document.getElementById("bookStack");

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
// get change button (to mark book as read)
const chngButton = document.getElementById("chngBook");

// BOOK INFO DIV ELEMENTS
const bookInfo = document.getElementById("bookInfo");
const divTitle = document.getElementById("title");
const divAuth = document.getElementById("author");
const divDesc = document.getElementById("description");
const divCover = document.getElementById("cover");
const divDays = document.getElementById("days");

//book filters
const filtUnread = document.getElementById("unread");
const filtRead = document.getElementById("read");
const filtAll = document.getElementById("all");

//holding area for books before they are added to shelf
const tempShelf = [];
//holding area for received JSON
const bookShelf = []; 
//api url - local dev
const apiUrl = "http://localhost:8081/bookshelf";
// alt api url for glitch
// const apiUrl = "https://books-to-be-read.glitch.me/bookshelf"


//***************************************************** 

// FIND & ADD BOOKS FROM INPUT FIELDS

findButton.addEventListener('click', (e) => {
    e.preventDefault();

        const checkTitle = (titleInput.value).toLowerCase();
        const checkAuth = (authorInput.value).toLowerCase();

        const prepTitle = checkTitle.replace(/\s/g, "+")
        const prepAuthor = checkAuth.replace(/\s/g, "+")
        const url = gbUrl(prepTitle, prepAuthor);
    
// CHECK FOR BOOKS ALREADY IN LIST
        const bookIndex = findMatch(bookShelf, checkTitle, checkAuth);

    if (url == undefined) {
        // gbUrl function will trigger error message div
        console.log("nope");
    } else if (bookIndex !== undefined){
        bookHTML(bookIndex);
    } else {
        getBookInfo(url)
            .then(setHTML)
            .catch (e => {
                errorMsg.setAttribute('style', 'display:block');
                console.error(e);
            })
    };

    titleInput.value = "";
    authorInput.value = ""; 

});

    
//***************************************************** 

// CLOSE BOOK WINDOW

cancelButton.addEventListener('click', (e) => {
    bookInfo.setAttribute('style', 'display:none');
    // remove current book from bookShelf array
    tempShelf.shift();
});

//***************************************************** 

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

//***************************************************** */

// LOAD BOOKS FROM SHELF ON PAGE LOAD

window.addEventListener('load', (e) => {
    e.preventDefault();

    getShelfInfo(apiUrl)
       .then(getBooks) 
       .then(apiHTML)  
        .catch (e => {
            console.error(e);
        })
});


//***************************************************** 

// BOOK SPINE CLICK EVENT

// click on book div
// get index from div id
bookStack.addEventListener('click', function(e) {
    id = parseInt(e.target.id);
    bookHTML(id); 
}, false);

//***************************************************** 

// DELETE BOOK EVENT

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

//***************************************************** 

// UPDATE BOOK  - mark as read, reset date

chngButton.addEventListener('click', (e) => {
    //get index/id of book object
    id = remButton.value;
        // change status to 'read'
    bookShelf[id].status = "read";
        // reset date to date changed
    bookShelf[id].date = new Date();
    // fetch update to JSON file
    updateBook(id, apiUrl);
        
    //close window
    bookInfo.setAttribute('style', 'display:none');
});

//***************************************************** 

// Filter Book lists
// click to filter for unread, read or all books
filtUnread.addEventListener('click', (e) => {
    filtAll.classList.remove("active");
    filtRead.classList.remove("active");
    filtUnread.classList.add("active");
    const filter ="unread";
    statusFilter(filter);
});

filtRead.addEventListener('click', (e) => {
    filtAll.classList.remove("active");
    filtRead.classList.add("active");
    filtUnread.classList.remove("active");
    const filter ="read";
    statusFilter(filter);
});

filtAll.addEventListener('click', (e) => {
    filtAll.classList.add("active");
    filtRead.classList.remove("active");
    filtUnread.classList.remove("active");
    const filter ="all";
    statusFilter(filter);
});

