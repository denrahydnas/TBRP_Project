const bookdiv = document.getElementById("book_forms");
const bookfind = document.getElementById("book_find");
const titleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("bookAuthor");
const findButton = document.getElementById("find");

//prepare url
const Url = function getURL(){
    if (titleInput !== null && authorInput !== null){
        return `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleInput.value}+inauthor:${authorInput.value}`;
    } else if (titleInput !== null && authorInput == null){
        return `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleInput.value}&orderBy=newest`;
    } else if (titleInput == null && authorInput !== null){
        return `https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorInput.value}&orderBy=newest`;
    } else {

    };

//Fetch Functions

fetch(`https://www.googleapis.com/books/v1/volumes?q=search-terms&key=your-API-key`)
  .then(response => response.json())
  .then(result => {
this.setState({ books: result.items})
})};

function fetchData(url){
    return fetch(url)
        .then(res => res.json())
};

fetch("https://openlibrary.org/search.json?")
    .then(data => bookResults(data))


//helper functions
function getBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    if (title && author){
        fetchData(`https://openlibrary.org/search.json?title=${title}&author=${author}`)
        .then(data => bookResults(data))
    } else if (title){
        fetchData(`https://openlibrary.org/search.json?title=${title}`)
        .then(data => bookResults(data))
    }else if (author){
        fetchData(`https://openlibrary.org/search.json?author=${author}`)
        .then(data => bookResults(data))
    }
};

function bookResults(data) {
    const html = `
    <form id="add_book">
    <div>
    <h2> ${data.docs.title} by ${data.docs.author_name}</h2>
    </div>
    </form> 
    `;
    bookfind.style.display = none;
    bookdiv.innerHTML = html;
};

//EVENT LISTENERS//
findButton.addEventListener("click", getBook);
