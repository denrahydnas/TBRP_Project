
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

// add a book to JSON API file
// POST request using fetch()
function addBook(url, book) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    })
        .then(res => res.text())
        .then(text => console.log(text))
}

// delete book from file
// DELETE request using fetch()
function remBook(id) {
    fetch(`http://localhost:8081/bookshelf/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => res.text())
        .then(text => console.log(text))
}