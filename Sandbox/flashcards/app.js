const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {

    // res.send('<h1>I love Step IT Academy!</h1>');
    res.render('index');

});

app.get('/cards', (req, res) => {

    res.render('cards', {prompt: "Who is buried in Grant's tomb?", 
                         hint: "Think about whose tomb it is."});

});

app.listen(3000, () =>{
	console.log('Server is running on localhost:3000');
});
