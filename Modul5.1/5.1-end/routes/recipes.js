const express = require('express');
const { check, validationResult } = require('express-validator/check'); // validare
const queries = require('../data/recipes_queries.js');
const multer = require('multer');

// initializeaza o aplicatie Express
const router = express.Router();

// middleware core al express care parseaza request-urile primite in format JSON
router.use(express.json());

/**
 * Configurare Multer - Varianta 3 
 */ 
function fileFilter(req, file, cb){
  if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)){
    cb(new Error('Nu poti uploada decat fisiere de imagine'), false);
  } else {
    cb(null, true);
  }
}
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize: 50000} });

/**
 * Ruta pentru indexul retelor
 */
router.get('/', async (req, res) => { 
    const recipes = await queries.all_recipes();
    res.render('pages/recipes', {recipes});
});

/**
 * Ruta pentru adaugarea unei retete noi 
 */
router.post('/create', upload.single('foto'), [
    check('title', 'Trebuie sa introduci un titlu').isLength({ min: 2 }),
    check('ingredients', 'Trebuie sa introduci ingrediente').isLength({ min: 2 }),
    check('directions', 'Trebuie sa introduci indicatiile de preparare').isLength({ min: 2 })
    ], (req, res) => {

    console.log(req.file.buffer);
    console.log(req.headers['content-type']);
    console.log(req.body)

    // pune erorile din req in obiectul errors 
    const errors = validationResult(req);
    // 1) Daca nu exista erori => 
    //      - ruleaza query-ul de INSERT
    //      - seteaza un flash message
    //      - trimite un raspuns json de succes
    if (errors.isEmpty()) {  
        queries.createRecipe(req.body.title, req.body.ingredients, req.body.directions)
        .then( data => {
            req.session.flashMessage = 'Ai introdus o noua reteta';
            res.json({ // trimite un raspuns JSON formularului din front-end
            succes: true
            });
        })
        .catch(error => console.log(error));
    }  
    // 2) Daca exista erori => 
    //    - trimite un raspuns json de esec + datele completate + erorile 
    else {     
        res.json({
        succes: false,
        form_data: req.body,
        errors: errors.mapped()
        });
    }
    });

/**
 * Ruta pentru stergerea unei retete
 */
router.delete('/delete/:id', async (req, res) => { 
    try{
        await queries.deleteRecipe(req.params.id)
        req.session.flashMessage = 'Ai sters cu succes reteta ';
        res.sendStatus(200);
    } catch(err){
        console.log(err);
    }  
});

/**
 * Ruta pentru actiunea de update a unei retete
 */
router.put('/update', async (req, res) => {
    const b = req.body;
    try{
        await queries.updateRecipe(b.id, b.title, b.ingredients, b.directions); 
        req.session.flashMessage = 'Ai updatat cu succes reteta ';
        res.sendStatus(200);
    } 
    catch(err){
        console.log(err)
    }   
})

module.exports = router;