/***********  
INITIALIZARI
************/

const express = require('express');
const app = express(); // initializeaza o aplicatie Express
const cookieParser = require('cookie-parser'); // citeste datele din cookies
const expressSession = require('express-session'); // managementul sesiunilor
const { check, validationResult } = require('express-validator/check'); // validare
// const morgan = require('morgan');

// const morganBody = require('morgan-body');


const fs = require('fs');

const multer = require('multer');

const recipes = require('./routes/recipes');

// portul default (pentru compatibilitate cu Heroku) 
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// seteaza template engine-ul aplicatiei
app.set('view engine', 'ejs');

/*******************   
STANDARD MIDDLEWARES
********************/

/**
 * Middleware core pentru parsarea requesturilor transmise prin formulare POST
 * Efect: pe obiectul req.body vor aparea perechile de chei/valori transmise prin formular
 */
app.use(express.urlencoded({extended: true}));

app.use(express.json());

// app.use(morgan('combined'));
// morganBody(app);

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


/**
 * Multer configuration
 */

// Varianta 1
// const upload = multer({ dest: 'public/uploads/' });


// Varianta 2
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads');
  },

  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage});


// Varianta 3

// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage, limits: {fileSize: 25000} })

/*******************   
CUSTOM MIDDLEWARES
********************/

const email_valid = check('email', 'Formatul email-ului nu este corect').isEmail();
const name_valid = check('nume', 'Numele este prea scurt').isLength({ min: 3 });

/**
 * Middleware custom care gestioneaza mesajele flash: 
 * le pune intai pe res.locals si apoi le sterge din req.session
 */ 
app.use( (req, res, next) => {
  // if there's a flash message in the session, make it available in the response, then delete it
  if (req.session.flashMessage){
    res.locals.flashMessage = req.session.flashMessage;
    delete req.session.flashMessage;
  }  
  next();
});


/*********   
 RUTE
**********/

// Incarca rutele pentru "/recipes..."
app.use('/recipes', recipes);


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

app.post('/hello', upload.single('foto'), email_valid, name_valid, (req, res) => {  
  console.log(req.file);
  console.dir(req.body);

  
  // fs.writeFile('./public/test.jpg', req.file.buffer, (err)=>{
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // })

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
});


/*************/

app.listen(port, () => console.log(`Listening on port: ${port}`))