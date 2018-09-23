const express = require('express');
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// importa modulul body-parser pentru a gestiona requesturile POST
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const { check, validationResult } = require('express-validator/check');

const cards = require('./data/data.json').data.cards;

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

app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

app.use((req, res, next)=>{
  req.session.mesaj = "acesta este un mesaj custom";
  next();
})


/*********   
 RUTE
**********/

app.get('/', (req, res) => {
  res.render('pages/index', {nume: req.cookies.nume, mesaj: req.session.mesaj})
});

app.get('/New-page', (req, res) => {
    
  con.query('SELECT * FROM employees', (err, results, fields) => {
    //console.log(results);   
    if (!err) {      
      res.render('pages/new-page', {results: results});
    }     
    else
      console.log('Error while performing Query.' + err);
  });  

});

app.post('/goodbye', (req, res) => {
  res.clearCookie('nume');
  res.redirect('/hello');
})

app.get('/hello', (req, res) => {
  res.render('pages/hello', {
    data: {},
    errors: {}
  });
});

app.post('/hello',
  check('email', 'Invalid email address').isEmail(),
  check('nume', 'Numele este prea scurt').isLength({min: 1}), 
  (req, res) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('pages/hello', {errors: errors.mapped()});
    } else {
      res.redirect('/');
    }  
});

app.listen(port, () => console.log(`Listening on port: ${port}`))