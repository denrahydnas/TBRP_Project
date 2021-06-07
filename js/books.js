'use strict';

/* book class used to group info for new book div */

class Book {

    constructor(title, author, status = "unread"){
        this.title = title;
        this.author = author;
        this.status = status;
    }

    get date_added(){
        return new Date();
    }

    get spineCSS(){
        const spines = [
            ".b_one",
            ".b_two",
            ".b_three",
            ".b_four",
            ".b_five",
        ];
        return (spines[Math.floor(Math.random() * spines.length)]);
    }

}

const HMart = new Book("Crying at HMart", "Michelle Zauner")

console.log(HMart);
console.log(HMart.date_added);
console.log(HMart.spineCSS);