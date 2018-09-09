const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
    res.send('<h1>Hello, Node Ninja!</h1>');
});

app.get('/', (req, res) => {
    
    res.render('index');
});

app.get('/cards', (req, res) => {
    res.locals.question = "who are you?";
    
    res.render('cards');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});