
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
    //postData('/add-book', book);
    //console.log(JSON.stringify(bookShelf));
    //clear temp shelf
    tempShelf.shift();
});

bookLoader.addEventListener('click', (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8081/bookshelf";

    getShelfInfo(apiUrl)
       .then(getBooks) 
       .then(apiHTML)  
        .catch (e => {
            console.error(e);
        })
});