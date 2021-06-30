
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


