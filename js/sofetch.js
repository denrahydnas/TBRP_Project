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
    errorMsg.setAttribute('style', 'display:block');
}
};

async function getBookInfo(url) {
    const bookData = await getJSON(url);
    const book = bookData.items[0];

    setHTML(book);
};



// parse for title, author, img, ISBN and description (1st sentence only?? (split at ".", index[0]))
    // incl link to order book
    // link to https://www.carmichaelsbookstore.com/book/ISBN or https://www.amazon.com/s?k=ISBN
    // carmichaels does not log ebook IBSNs, better results from amazon :-P

function setHTML(book) {
    const bookTitle = book.volumeInfo.title;
    const bookAuthor = book.volumeInfo.authors[0];
    const bookDescr = book.volumeInfo.description;
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
        </div>`;

    // show book info on page
    // if prev search, replace content w new search info

    const bookContent = document.createElement('div');
    bookContent.innerHTML = bookHTML;

    if ( $('#main').children().length == 1 ) {
        displayBook.appendChild(bookContent);
    } else {
        const oldContent = document.getElementById("bookInfo");
        oldContent.parentNode.replaceChild(bookContent, oldContent);
    };

    // or close div entirely *** ONLY WORKS FIRST TIME *** *** FIX ME *** 
    const closeDiv = document.getElementById("closeDiv");
    closeDiv.onclick = function() {
       displayBook.removeChild(bookContent);
    };

    // allow user to add book to pile at bottom of page
    // create book object and add to array, post to somewhere
         /* WHAT IF
            could the botton button row be hidden until book html is posted? 
            bookContent.InnerHTML updates the same
            order button.innerHTML would update separately
            order link would need to be updated with it everytime, 
            but it may solve the close div issue - that will just be a hide toggle now
        */
};


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


