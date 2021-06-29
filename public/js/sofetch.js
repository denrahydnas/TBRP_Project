
//get elements
const bookFind = document.getElementById("bookFind");
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

async function getBookInfo(url) {
    const bookData = await getJSON(url);
    const book = bookData.items[0];
    return book;
};


// Send data to database.json w post fetch req

async function postData(url, book) {

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(book) 
    });
    //console.log(JSON.stringify(book));
    return response.json(); // parses JSON response into native JavaScript objects
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

// EVENT LISTENERS

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


cancelButton.addEventListener('click', (e) => {
    bookInfo.setAttribute('style', 'display:none');
    // remove current book from bookShelf array
    tempShelf.shift();
});


addButton.addEventListener('click', (e) => {
    // create book object with current book info
    const book = tempShelf[0];
    setBookStack(book);
    bookInfo.setAttribute('style', 'display:none');
    // save bookStack array to db
    postData('/database.json', book)
        .then(data => {
        database.set(data);
        //console.log(database); // JSON data parsed by `data.json()` call
    });
    //clear temp shelf
    tempShelf.shift();
});

