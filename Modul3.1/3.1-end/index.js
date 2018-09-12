const express = require('express');
const app = express();

const {
  check,
  validationResult
} = require('express-validator/check');

const bodyParser = require('body-parser');

const mysql = require('mysql');

// Conexiunea la baza de date MySQL
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'northwind'
});



app.set('view engine', 'ejs');

/*********   
MIDDLEWARE
**********/

// creaza un obiect .body pe req, in care se vor regasi perechile de chei/valori transmise prin formular
app.use(bodyParser.urlencoded({extended: false}));




// permite afisarea asset-urilor din directorul "/public"
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
    
    res.render('pages/hello', {nume: req.body.nume, email: req.body.email})

  })

app.listen(5000, () => console.log(`Listening on port: 5000`))