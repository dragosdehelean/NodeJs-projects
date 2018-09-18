const express = require('express');
const app = express();

// importa modulul body-parser pentru a putea citi datele trimise prin POST
const bodyParser = require('body-parser');

// importa modulul cookie-parser pentru a putea citi datele din cookies
const cookieParser = require('cookie-parser');

// seteaza template engine-ul aplicatiei
app.set('view engine', 'ejs');

/*********   
MIDDLEWARE
**********/

/**
 * Insereaza middleware-ul pentru parsarea requesturilor transmise prin formulare POST
 * Efect: pe obiectul req.body vor aparea perechile de chei/valori transmise prin formular
 */
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Insereaza middleware-ul pentru citirea si parsarea cookie-urilor
 * Efect: pe obiectul req.cookies vor aparea perechile de chei/valori din cookie-urile setate de aplicatia noastra
 */
app.use(cookieParser());

// seteaza directorul "/public" pentru a afisa asset-uri statice
app.use('/static', express.static('public'));

//middleware de test
app.use((req, res, next) => {
  res.mesaj = `Userul a venit de la adresa ${req.headers.referer}`;
  next();
});

/*********   
 RUTE
**********/

app.get('/', (req, res) => {  
  res.render('pages/index', {nume: req.cookies.nume})
});

app.get('/New-page', (req, res) => {   
  res.render('pages/new-page');
});

app.get('/hello', (req, res) => {
  res.render('pages/hello');
});

app.post('/hello', (req, res) => {     
  res.cookie('nume', req.body.nume);
  res.redirect('/');
})

app.post('/goodbye', (req, res) => {
  res.clearCookie('nume');
  res.redirect('/hello');
})

app.listen(5000, () => console.log(`Listening on port: 5000`));