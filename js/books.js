/* book class used ot store info and create new book div */

class Book {
    constructor(title, author, status){
        this.title = title;
        this.author = author;
        this.status = status;
    }

    get date_added(){
        return new Date();
    }

}

const HMart = new Book("Crying at HMart", "Michelle Zauner", "reading")

console.log(HMart.author);
console.log(HMart.status);
console.log(HMart.date_added);