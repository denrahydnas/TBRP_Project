const bookRoutes = require('./bookshelf');

const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send("welcome to the bookshelf api server");
    });


    bookRoutes(app, fs);
};


module.exports = appRouter;