const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator/check');

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));


app.get('/', (req, res) => {
   res.render('pages/index')
});

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
    check('email').isEmail(),
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

app.listen(5000, () => console.log(`Listening on port: 5000`))
