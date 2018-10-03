// documentatie modul mysql: https://github.com/mysqljs/mysql

const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'b7410007478951',
  password : 'aa9fd134',
  database : 'heroku_6a7dc773b8a1d41'
});

module.exports = {
  //middleware care face disponibil pe res.locals rezultatele interogarii tabelului recipes
  all_recipes: (req, res, next) => {
    pool.query('SELECT * FROM recipes ORDER BY created_at DESC', (error, results) => {
      if (error) throw error;
      res.locals.recipes = results;
      next(); 
    }); 
  },

  //creeaza o noua inregistrare; intoarce o Promise care se rezolva cu rezultatele
  createRecipe: (title, ingredients, directions) => {
    return new Promise((resolve) => { 
      const sql = 'INSERT INTO recipes (title, ingredients, directions) VALUES (?, ?, ?)';
      pool.query( sql, [title, ingredients, directions], (error, results) => {
        if(error) throw error;
        return resolve(results);
      }); 
    })
  },

  //sterge o inregistrare in functie de id-ul primit 
  deleteRecipe: (id) => {
    const sql = 'DELETE FROM recipes WHERE recipe_id = ?';
    return pool.query( sql, [id]); 
  }

};

 