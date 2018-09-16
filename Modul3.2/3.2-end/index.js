const express = require('express');
const app = express();

const {
  check,
  validationResult
} = require('express-validator/check');

// importa modulul body-parser pentru a gestiona requesturile POST
const bodyParser = require('body-parser');

const mysql = require('mysql');

const cookieParser = require('cookie-parser');

// Conexiunea la baza de date MySQL
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'northwind'
});


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

app.use(cookieParser());

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
  
  res.render('pages/index', {name: req.cookies.name})
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

app.get('/hello', (req, res) => {
  res.render('pages/hello');
});

app.post('/hello', [
    // username must be an email
    // check('email').isEmail(),
    // password must be at least 2 chars long
    // check('name').isLength({      min: 2     })
  ],
  (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }
    // res.render('pages/hello', {name: req.body.name, email: req.body.email});   
    
    res.cookie(nume, req.body.nume);
    res.redirect('/');

  })

app.listen(5000, () => console.log(`Listening on port: 5000`))