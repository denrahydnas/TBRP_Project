
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

// WITH FIND EVENT

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
    
    // create book object and add to array
    function addBookToShelf(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn) {
        const newBook = new Book(bookTitle, bookAuthor, bookDescr, bookImg, bookIsbn);
        tempShelf.unshift(newBook);
    };

// WITH ADD BOOK EVENT

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


// SHOW BOOK INFO FROM BOOKS IN PILE

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
