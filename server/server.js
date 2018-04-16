const express =require('express');
const mongoose =require('mongoose');
const hbs =require('express-handlebars');
const bodyParser =require('body-parser');
const cookieParser =require('cookie-parser');
const moment =require('moment');
const app =express();
const PORT =process.env.PORT || 8080;


////////////////////////////////////////////////////////////////////
/// 1- Connect To Database
////////////////////////////////////////////////////////////////////
mongoose.Promise =global.Promise;
// mongoose.connect('');


////////////////////////////////////////////////////////////////////
/// 2- Setup View Engine
////////////////////////////////////////////////////////////////////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname+'./../views/layouts',
    partialsDir: __dirname+'./../views/partials'
}));
app.set('view engine', 'hbs');


////////////////////////////////////////////////////////////////////
/// 3- Middlewares
////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/css', express.static(__dirname+'./../public/css'));
app.use('/js', express.static(__dirname+'./../public/js'));

const authMiddleware =(request, response, next) => {

    

}


////////////////////////////////////////////////////////////////////
/// 4- Models
////////////////////////////////////////////////////////////////////
const { User } =require('./models/User');
const { Article } =require('./models/Article');
const { Review } =require('./models/Review');


////////////////////////////////////////////////////////////////////
/// 5- Routes
////////////////////////////////////////////////////////////////////

/////////////////////////////////////
/// 5.1- Admin
/////////////////////////////////////

/// main dashboard
app.get('/dashboard', (request, response) => {

    response.render('admin/dashboard', {
        dashboard: true
    });

});

//////////////
/// Users
//////////////
/// users list page
app.get('/dashboard/users', (request, response) => {

    response.render('admin/users/index');

});
/// create users page
app.get('/dashboard/users/create', (request, response) => {

    response.render('admin/users/create');

});
/// create users
app.post('/dashboard/users/create', (request, response) => {

    let user =new User(request.body);

    user.save((err, user) => {
        if(err) return response.status(400).send(err);
        return response.status(200).json(user);
    });

});

/// edit users page
app.get('/dashboard/users/edit/:id', (request, response) => {

    response.render('admin/users/edit');

});
/// edit users
app.post('/dashboard/users/edit/:id', (request, response) => {

    let user_id =request.params.id;
    let query ={

    };

    User.findByIdAndUpdate(user_id, query, (err, user) => {
        if(err) return response.status(400).send(err);
        return response.redirect('/dashboard/users');
    });

});


/// remove users
app.post('/dashboard/users/remove/:id', (request, response) => {


});




//////////////
/// Articles
//////////////
/// articles list page
app.get('/dashboard/articles', (request, response) => {

    response.render('admin/articles/index');

});
/// create articles page
app.get('/dashboard/articles/create', (request, response) => {

    response.render('admin/articles/create');

});
/// create articles page
app.get('/dashboard/articles/edit/:id', (request, response) => {

    response.render('admin/articles/edit');

});





/////////////////////////////////////
/// 5.2- Public
/////////////////////////////////////

/// home page
app.get('/', (request, response) => {

    response.render('home');

});

/// login page
app.get('/login', (request, response) => {

    response.render('login');

});
/// login user
app.post('/login', (request, response) => {

});


/// register page
app.get('/register', (request, response) => {

    response.render('register');

});
/// register user
app.post('/register', (request, response) => {

});


////////////////////////////////////////////////////////////////////
/// 6- Listen
////////////////////////////////////////////////////////////////////
app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }
        console.log(`Your Server Is Running On Port ${PORT}`);
});