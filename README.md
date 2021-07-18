# TBRP_Project

Code Louisville Javascript Spring/Summer 2021 - now on Glitch at https://books-to-be-read.glitch.me

Recently, I noticed that my TBR pile has been growing. Either I'm working on other projects or have gotten new books to distract me, so quite a few have remained in the pile for some time. This gave me the idea to make a TBR app to track all of my To-Be-Read books and how long I've left them languishing in the stack - hopefully prompting me to start reading them sooner. 

For my Project, I created an app that can retrieve information about books and store them in a To Be Read stack on the page. Existing books are stored in a JSON file and populated automatically when the page loads. 

The user will be able to input a title and/or author in the form fields, which will check to see if the book is already in the pile. If not, it will get book information from the Google Books API. 

The user can add the book to the TBR pile, which will appear as a div in the stack, and/or visit a link to buy the book. 

The user can click on a book in the stack and view the book information, including how long it has been since the book was added to the TBR pile. The User can mark books as "read", which will then display the date that they were updated on.

The user can also remove books from the stack entirely. 



Project Required Features List:

* Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX

* Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app

* Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application

* Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value

* Calculate and display data based on an external factor (ex: get the current date, and display how many days remaining until some event)

* Create a web server with at least one route and connect to it from your application using ExpressJS




