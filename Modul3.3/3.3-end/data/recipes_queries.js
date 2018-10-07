// documentatie modul mysql: https://github.com/mysqljs/mysql

const mysql = require('mysql');

const db_config = {
  host     : 'eu-cdbr-west-02.cleardb.net',
  user     : 'b7410007478951',
  password : 'aa9fd134',
  database : 'heroku_6a7dc773b8a1d41',
};

// const db_config = {
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'heroku_6a7dc773b8a1d41',
// };

const pool = mysql.createPool(db_config);

// ce se intampla cu: pool.end() ???

module.exports = {
  //middleware care face disponibil pe res.locals rezultatele interogarii tabelului recipes
  all_recipes: () => {
    return new Promise((resolve, reject)=>{
      pool.query('SELECT * FROM recipes ORDER BY created_at DESC', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }, 

  //creeaza o noua inregistrare; intoarce o Promise care se rezolva cu rezultatele
  createRecipe: (title, ingredients, directions) => {
    return new Promise((resolve, reject) => { 
      const sql = 'INSERT INTO recipes (title, ingredients, directions) VALUES (?, ?, ?)';
      pool.query( sql, [title, ingredients, directions], (error, results) => {
        if(error) return reject(error);
        resolve(results);        
      }); 
    })
  },

  //sterge o inregistrare in functie de id-ul primit; intoarce o Promise 
  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM recipes WHERE recipe_id = ?';
      pool.query( sql, [id], (error, results)=>{
        if (error) return reject(error);
        resolve(results);        
      }); 
    })    
  }, 

}


 