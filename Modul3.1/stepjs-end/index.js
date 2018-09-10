const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator/check');

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

/*********   
MIDDLEWARE
**********/

// creaza un obiect .body pe req, in care se vor regasi perechile de chei/valori transmise prin formular
app.use(bodyParser.urlencoded({ extended: false}));

// permite afisarea asset-urilor din directorul "/public"
app.use('/static', express.static('public'));

// app.use((req, res, next) => {
//   console.log('Mesaj 1');
//   next();
// }, (req, res, next) => {
//     console.log('Mesaj 1.5');
//     next();
// });

// app.use((req, res, next) => {
//   console.log('Mesaj 2');
//   next();
// });

app.use((req, res, next) => {
  
  next();
});


/*********   
 RUTE
**********/

app.get('/', (req, res) => {
   res.render('pages/index')
});

app.get('/New-page', (req, res) => {
  res.render('pages/new-page');
});

// app.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM test_table');
//       res.render('pages/db', result);
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   });

app.get('/hello', (req, res)=>{
  res.render('pages/hello');
});

app.post('/hello', [
    // username must be an email
    // check('email').isEmail(),
    // password must be at least 2 chars long
    check('name').isLength({ min: 2 })
  ], 
  (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.render('pages/hello', {name: req.body.name});
  })

app.listen(5000, () => console.log(`Listening on port: 5000`))