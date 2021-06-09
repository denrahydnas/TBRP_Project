/* Use this to make the API call to find Book Info - 
should send Title and Author IF not found in booklist

return best match:
Title, Author, Genre, Book Cover img */

var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var employees = JSON.parse(xhr.responseText);
      var statusHTML = '<ul class="bulleted">';
      for (var i=0; i<employees.length; i += 1) {
        if (employees[i].inoffice === true){
          statusHTML += '<li class="in">';
        } else {
          statusHTML += '<li class="out">';
        }
        statusHTML += employees[i].name;
        statusHTML += '</li>';
      }
      statusHTML += '</ul>';
      document.getElementById('employeeList').innerHTML = statusHTML;
    }
  };
  xhr.open('GET', 'data/employees.json');

  xhr.send();

var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readystate === 4) {
      if (xhr.status === 200){
        var bookdata = JSON.parse(xhr.responseText)
        var addBookHTML ='<div id="addBook">';
          addBookHTML += '<h1>';
          addBookHTML += bookdata.title;
          addBookHTML += '</h1>';
          addBookHTML += '</div>';
        }
      document.getElementById("main").innerHTML = addBookHTML;  
    }
  };
  xhr.open('GET', "https://openlibrary.org/search.json?");
  function sendAJAX() {
    xhr.send();
    document.getElementByID('load').style.display = "none";
  }



<button id ="load" onclick="sendAJAX()">AJAX</button>
/*
Send request object with title and author both optional
get JSON back
parse JSON for Title, Author, Cover, Descr
hide "booksearch" form
in same div, add innerHTML new form to display info and ask user to add to pile or return to search
if added, create book object and add div to pile w random css class name
either way, return form to default search mode
*/






/* From Google Books API Docs:

<script src="https://apis.google.com/js/api.js"></script>
<script>
  /**
   * Sample JavaScript code for books.volumes.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript


  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/books"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/books/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.books.volumes.list({
      "q": "How We Fight For Our Lives",
      "orderBy": "newest"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });
</script>
<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>
   */