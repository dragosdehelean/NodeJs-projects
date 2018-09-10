const express = require('express');
const app = express();

app.set('view engine', 'ejs');

/*********   
MIDDLEWARE
**********/

// permite afisarea asset-urilor din directorul "/public"
app.use('/static', express.static('public'));


/*********   
 RUTE
**********/

// ruta pentru homepage
app.get('/', (req, res) => {
   res.render('pages/index')
});

// ruta pentru '/New-page'
app.get('/New-page', (req, res) => {
  res.render('pages/new-page');
});

app.listen(5000, () => console.log(`Listening on port: 5000`))
