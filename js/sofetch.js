//get elements
const bookFind = document.getElementById("bookFind");
//get title input value
const titleInput = document.getElementById("titleInput");
//get author input value
const authorInput = document.getElementById("authorInput");
//get book find button
const findButton = document.getElementById("findButton");
//get book display div
const displayBook = document.getElementById("main");

// value check and prep title and author input (swap spaces for + sign)
// create url suffix: if Book input and Author input are used prep both
// if bookinput is used and author is not, prep just book plus newest
// if bookinput is not used and author is, prep just author plus newest
// if neither inputs are filled, pop up alert below search fields
// add correct suffix to URL (use template literals ``)

function gbUrl(title, author) {
    if (title !== "" && author !== "") {
        return (`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`);
    } else if (title !== "" && author == "") {
        return(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+newest`);
    } else if (title == "" && author !== "") {
        return(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}+newest`);
    } else {
        const warning = document.createElement('warning');
        bookFind.appendChild(warning);
        warning.innerHTML = "<p>Please enter a title and an author for the best search results.</p>";
    }
};

// on submit, fetch data with correct url
// catch errors
// return book info json
const errorHTML = `
<div class="wrapper container" id="errorMsg">
    <div class="row justify-content-sm-center">
        <h4>We ran into an issue finding your book. Please check your spelling and try again.</h4>
    </div>
    <div class="row">
        <img id="error" src='../imgs/dog.png' class="cover"></img>
    </div>
</div>` ;

async function getJSON(url) {
try {
    const response = await fetch(url);
    return await response.json();
} catch (error) {
    throw error;
}
};

async function getBookInfo(url) {
    const bookData = await getJSON(url);
    const book = bookData.items[0];

    setHTML(book);
};

// parse for title, author, img, ISBN and description (1st sentence only?? (split at ".", index[0]))
// show book info on page
// if prev search, replace content w new search info
// allow user to add book to pile at bottom of page
    // create book object and.or add to array, post to somewhere
//order book
    // link to https://www.carmichaelsbookstore.com/book/ISBN or https://www.amazon.com/s?k=ISBN
    // carmichaels does not log ebook IBSNs, better results from amazon :-P
// or cancel and go back to search


function setHTML(book) {
    const bookTitle = book.volumeInfo.title;
    const bookAuthor = book.volumeInfo.authors[0];
    const bookDescr = book.volumeInfo.description;
    // reduce this to one sentence later
    const bookImg = book.volumeInfo.imageLinks.thumbnail
    const bookIsbn = book.volumeInfo.industryIdentifiers[0].identifier;
    
    const bookHTML = `
        <div class="wrapper container" id="bookInfo">
            <div class="row">
                <h3 id="title">${bookTitle}</h3>
            </div>
            <div class="row">  
                <h4 id="author">${bookAuthor}</h4>
            </div>
            <div class="row content"> 
             <div class="img col-sm-3">
                <img id="cover" src='${bookImg}' class="cover"></img>
             </div>
            <div class="col-sm-9">
                <p id="description">${bookDescr} </p>
            </div>
            </div>
            <div class="row justify-content-md-center">
                <button id="closeDiv">Close</button>
                <a href="https://www.amazon.com/s?k=${bookIsbn}" target="_blank"><button id="buy_book">Order Book</button></a>
                <button id="add_book">Add Book to Pile</button>
            </div>
        </div>` ;

   
    const bookContent = document.createElement('div');
    bookContent.innerHTML = bookHTML;

    if ( $('#main').children().length == 0 ) {
        displayBook.appendChild(bookContent);
    } else {
        const oldContent = document.getElementById("bookInfo");
        oldContent.parentNode.replaceChild(bookContent, oldContent);
    };

    const closeDiv = document.getElementById("closeDiv");
    closeDiv.onclick = function() {
        displayBook.removeChild(bookContent);
    };
}


// EVENT LISTENER

findButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = (titleInput.value).replace(/\s/g, "+")
    const author = authorInput.value.replace(/\s/g, "+")
    const url = gbUrl(title, author);
    getBookInfo(url);
    titleInput.value = "";
    authorInput.value = "";
});


