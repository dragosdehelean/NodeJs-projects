// documentatie modul mysql: https://github.com/mysqljs/mysql

const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  // de completat cu datele voastre de conectare
  host     : '',
  user     : '',
  password : '',
  database : ''
});

module.exports = {
  //middleware care face disponibil pe res rezultatele interogarii tabelului cu articole
  all_recipes: (req, res, next) => {
    pool.query('SELECT * FROM recipes ORDER BY created_at DESC', (error, results) => {
      if (error) throw error;
      res.locals.recipes = results;
      next(); 
    }); 
  },

  //creeaza o noua inregistrare; intoarce o Promise care se rezolva cu rezultatele
  
  
  //sterge o inregistrare in functie de id-ul primit 
  
};

 