const bookRoutes = (app, fs) => {

    const dataPath = './data/books.json';

    app.get('/bookshelf', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
};

module.exports = bookRoutes;