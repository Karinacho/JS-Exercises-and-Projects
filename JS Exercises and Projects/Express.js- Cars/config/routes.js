const controllers = require('../controllers');
const restrictedPages = require('./auth');


module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register',restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/register',restrictedPages.isAnonymous, controllers.user.registerPost);
    app.post('/logout',restrictedPages.isAuthed, controllers.user.logout);
    app.get('/login',restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login',restrictedPages.isAnonymous, controllers.user.loginPost);
    
    app.get('/car/all',restrictedPages.isAuthed,controllers.car.getAll);
    app.get('/car/add',restrictedPages.hasRole('Admin'),controllers.car.getAdd)
    app.post('/car/add',restrictedPages.hasRole('Admin'),controllers.car.getPost)

    app.get('/car/rent/:id',restrictedPages.isAuthed,controllers.car.getRented)
    app.post('/car/rent/:id',restrictedPages.isAuthed,controllers.car.postRented)
     
    app.get('/user/rents',restrictedPages.isAuthed,controllers.car.getMyRent)
    app.get('/car/edit/:id',restrictedPages.hasRole('Admin'),controllers.car.getEditCar)
    app.post('/car/edit/:id',restrictedPages.hasRole('Admin'),controllers.car.postEditCar)
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};