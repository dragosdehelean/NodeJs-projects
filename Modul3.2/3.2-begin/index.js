const express = require('express');
const app = express();

// importa modulul body-parser pentru a gestiona requesturile POST
const bodyParser = require('body-parser');

// seteaza template engine-ul aplicatiei
app.set('view engine', 'ejs');

/*********   
MIDDLEWARE
**********/

/**
 * Insereaza middleware-ul pentru parsarea requesturilor transmise prin formulare POST
 * Creaza un obiect .body pe req, in care se vor regasi perechile de chei/valori transmise prin formular
 */
app.use(bodyParser.urlencoded({extended: false}));

// seteaza directorul "/public" pentru a afisa asset-uri statice
app.use('/static', express.static('public'));

app.use((req, res, next) => {
  res.mesaj = `Userul a venit de la adresa ${req.headers.referer}`;
  next();
});

/*********   
 RUTE
**********/

app.get('/', (req, res) => {  
  res.render('pages/index', {preferinte: "necunoscute" })
});

app.get('/New-page', (req, res) => {   
  res.render('pages/new-page');
});

app.get('/hello', (req, res) => {
  res.render('pages/hello');
});

app.post('/hello',
  (req, res) => { 
    
    res.render('pages/hello', {nume: req.body.nume, email: req.body.email});
})

app.listen(5000, () => console.log(`Listening on port: 5000`));