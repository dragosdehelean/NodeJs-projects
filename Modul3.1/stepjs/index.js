const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');

// const validator = require('express-validator');

const { check, validationResult } = require('express-validator/check');

const PORT = process.env.PORT || 5000;
const cool = require('cool-ascii-faces');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
// app.use(validator());

app.get('/', (req, res) => {
   res.render('pages/index')
});

app.get('/cool', (req, res) => res.send(cool()));


app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      res.render('pages/db', result);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

app.get('/hello', (req, res)=>{
  res.render('pages/hello');
});

app.post('/hello', [
    // username must be an email
    // check('email').isEmail(),
    // password must be at least 5 chars long
    check('name').isLength({ min: 5 })
  ], 
  (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.render('pages/hello', {name: req.body.name});
  })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
