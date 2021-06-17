//get elements
const bookFind = document.getElementById("bookFind");
//get title input value
const titleInput = document.getElementById("titleInput");
//get author input value
const authorInput = document.getElementById("authorInput");
//get book find button
const findButton = document.getElementById("findButton");
//get div close button
const closeButton = document.getElementById("closeDiv");
//get add book button
const addButton = document.getElementById("addBook");
// error message div
const errorMsg = document.getElementById("errorMsg");


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

    setHTML(book);
};

// parse for title, author, img, ISBN, and book description
    // incl link to order book
    // link to https://www.carmichaelsbookstore.com/book/ISBN or https://www.amazon.com/s?k=ISBN
    // carmichaels does not log ebook IBSNs, better results from amazon :-P

function setHTML(book) {
    const bookTitle = book.volumeInfo.title;
    const bookAuthor = book.volumeInfo.authors[0];
    const bookDescr = book.volumeInfo.description;
    const bookImg = book.volumeInfo.imageLinks.thumbnail;
    const bookIsbn = book.volumeInfo.industryIdentifiers[0].identifier;

    document.getElementById("title").textContent = bookTitle;
    document.getElementById("author").textContent = bookAuthor;
    document.getElementById("description").textContent = bookDescr;
    document.getElementById("cover").setAttribute('src', bookImg);
    document.getElementById("buyBook").setAttribute('href', `https://www.amazon.com/s?k=${bookIsbn}`);

    document.getElementById("bookInfo").setAttribute("style", "display:block");
};


// EVENT LISTENERS

findButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = (titleInput.value).replace(/\s/g, "+")
    const author = authorInput.value.replace(/\s/g, "+")
    const url = gbUrl(title, author);
    getBookInfo(url);
    titleInput.value = "";
    authorInput.value = "";
});

closeButton.addEventListener('click', (e) => {
    bookInfo.setAttribute('style', 'display:none');
});

addButton.addEventListener('click', (e) => {
    // create book object with current book info
    // add book object to array
    // reload bookStack incl new div
});

