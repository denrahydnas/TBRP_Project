const bookRoutes = (app, fs) => {

// variables
const dataPath = './data/books.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

      callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      throw err;
    }

    callback();
    });
};

// READ
  app.get('/bookshelf', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  
// CREATE
  app.post('/bookshelf', (req, res) => {

    readFile(data => {
      // add book id (will overwrite w/o book id)
      const newBookId = data.length;
      // add the new book
      data[newBookId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send('new book added');
      });
    },
      true);
  });


// UPDATE - Mark as Read, change date
  app.put('/bookshelf/:id', (req, res) => {

    readFile(data => {
      // update the book
      const bookId = req.params["id"];
      data[bookId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`bookshelf id:${bookId} updated`);
      });
    },
      true);
  });


// DELETE
 app.delete('/bookshelf/:id', (req, res) => {

    readFile(data => {
      // remove selected book
      const bookId = req.params["id"];
      delete data[bookId];
      
      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`book removed from shelf`);
      });
    },
      true);
  });
};


module.exports = bookRoutes;