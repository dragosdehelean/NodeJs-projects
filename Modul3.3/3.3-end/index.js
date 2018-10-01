/***********  
INITIALIZARI
************/

const express = require('express');
const bodyParser = require('body-parser'); // citeste datele trimise prin POST
const cookieParser = require('cookie-parser'); // citeste datele din cookies
const expressSession = require('express-session'); // managementul sesiunilor
const { check, validationResult } = require('express-validator/check'); // validare

// initializeaza o aplicatie Express
const app = express();

// portul default (pentru compatibilitate cu Heroku) 
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const cards = require('./data/data.json').data.cards;

const queries = require('./data/db_queries.js');


// seteaza template engine-ul aplicatiei
app.set('view engine', 'ejs');

/*******************   
STANDARD MIDDLEWARES
********************/

/**
 * Middleware-ul pentru parsarea requesturilor transmise prin formulare POST
 * Efect: pe obiectul req.body vor aparea perechile de chei/valori transmise prin formular
 */
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


/**
 * Middleware-ul pentru citirea si parsarea cookie-urilor
 * Efect: pe obiectul req.cookies vor aparea perechile de chei/valori din cookie-urile setate de aplicatia noastra
 */
app.use(cookieParser());

/**
 * Middleware-ul pentru gestionarea sesiunilor
 * Efect: pe req va aparea obiectul .session pe care vom putea pune diverse proprietati
 */
app.use(expressSession({
  secret: 'max',
  saveUninitialized: false,
  resave: false
}));

// seteaza directorul "/public" pentru a afisa asset-uri statice
app.use('/static', express.static('public'));

/*******************   
CUSTOM MIDDLEWARES
********************/

const email_valid = check('email', 'Formatul email-ului nu este corect').isEmail();
const name_valid = check('nume', 'Numele este prea scurt').isLength({ min: 3 });

// Custom flash middleware
app.use( (req, res, next) => {
  // if there's a flash message in the session request, make it available in the response, then delete it
  if (req.session.flashMessage){
    res.locals.flashMessage = req.session.flashMessage;
    delete req.session.flashMessage;
  }  
  next();
});

/*********   
 RUTE
**********/

app.get('/', (req, res) => {
  res.locals.nume = req.cookies.nume;
  res.render('pages/index');   
});

app.get('/hello', (req, res) => {
  res.render('pages/hello', {
    data: {},
    errors: {}
  });
});

app.post('/hello', email_valid, name_valid,  
  (req, res) => {    
    // pune erorile din req in obiectul errors 
    const errors = validationResult(req);
    
    // 1) Daca nu exista erori => redirect cu mesaj flash
    if (errors.isEmpty()) { 
      req.session.flashMessage = 'Excelent, te-ai inscris cu email-ul ' + req.body.email;
      res.cookie('nume', req.body.nume)
      res.redirect('/');
    }  
     // 2) Daca exista erori => afiseaza din nou formularul cu mesaje de eroare si datele completate
     else { 
      res.render('pages/hello', {
        data: req.body,
        errors: errors.mapped()
      });
    }
  });

app.post('/goodbye', (req, res) => {
  res.clearCookie('nume');
  res.redirect('/hello');
})


/*********   
 BD - Recipes
**********/

app.get('/recipes', queries.all_recipes, (req, res) => {  
  res.render('pages/recipes', {recipes: req.all_recipes});
});

app.post('/ajax_form', (req, res) => {
  // pune erorile din req in obiectul errors 
  const errors = validationResult(req);
      
  // 1) Daca nu exista erori => redirect cu mesaj flash
  if (errors.isEmpty()) { 
    queries.create_recipe(req.body.title, req.body.ingredients, req.body.directions);
    res.json({ 
      succes: true,
      form_data: req.body,
      errors: errors.mapped()
    });
  }  
  // 2) Daca exista erori => trimite datele completate si erorile catre formular
  else {     
    res.json({
      succes: false,
      form_data: req.body,
      errors: errors.mapped()
    });
  }
})



app.listen(port, () => console.log(`Listening on port: ${port}`))