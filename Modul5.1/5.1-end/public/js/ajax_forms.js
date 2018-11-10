const submit = document.getElementById("submit");
const recipeList = document.getElementById("recipeList");
const update = document.getElementById("edit-form-submit");
const foto = document.getElementById("foto");

/**
 * Actiunea de Save la formularul de "Create"
 */ 
submit.addEventListener("click", (event)=>{
   
    event.preventDefault(); //anuleaza efectul default al butonului    

    const formData = new FormData();
    
    formData.append('title', document.getElementById('title').value);
    formData.append('ingredients', document.getElementById('ingredients').value);
    formData.append('directions', document.getElementById('directions').value);
    formData.append('foto', foto.files[0]);

    fetch('/recipes/create', {
      method: 'POST',
      body: formData
    })
    // parseaza raspunsul JSON primit
    .then(response => response.json())
    // foloseste datele parsate
    .then(data => {     
      // Daca exista erori, le pune intr-un template literal 
      // la final le afiseaza intr-un div gol din formular
      if (!data.succes) {
        let erori = 
          `<div class="alert alert-danger my-0 py-2" role="alert">
              <p>Au aparut urmatoarele erori:</p>
              <ul>`;
        Object.values(data.errors).forEach( error => {
          erori += 
                `<li>          
                    ${error.msg}
                 </li>`
        });
        erori +=  
              `</ul>
            </div>`;
            
        document.getElementById('errors').innerHTML = erori;
      } 
      // Daca nu exista erori, redirecteaza     
      else {
        window.location.href = '/recipes';
        console.log('succes');
      }     
      
    })
    // scrie in consola eventualele erori aparute
    .catch(err => {
      console.log(err);
    });
});

/**
 * Actiunea de click pe butonul "Delete" din lista de elemente
 * 
 * Este ascultat elementul parinte, care incadreaza toata lista de elemente HTML
 */
recipeList.addEventListener("click", (event)=>{
  if (event.target.value === "delete" ){

    if(confirm('Esti sigur ca vrei sa stergi reteta?!?')){

      const id = event.target.dataset.id;
      const url = '/recipes/delete/' + id;
  
      fetch(url, { method: 'DELETE' })
        .then(res => {
          console.log(res.status);
          window.location.href = '/recipes';
        })
    }    

  } 
});

/**
 * Actiunea de click pe butonul "Edit", din lista 
 * Este ascultat elementul parinte, care contine toata lista
 */ 
recipeList.addEventListener("click", (event)=>{
  if (event.target.value === "edit" ){

    console.log('mi-a dat click');

    document.getElementById('edit-form-id').value = event.target.dataset.id;
    document.getElementById('edit-form-title').value = event.target.dataset.title;
    document.getElementById('edit-form-ingredients').value = event.target.dataset.ingredients;
    document.getElementById('edit-form-directions').value = event.target.dataset.directions;

    const fotoBox = document.getElementById("fotoBox");


    fotoBox.innerHTML = `
      <hr>
      <img src="static/uploads/${event.target.dataset.foto}" class="img-fluid" >
      <div class="form-group">
        <label for="foto" class="col-form-label">Schimba imaginea</label>
        <input type="file" class="form-control" id="foto" name="foto" >
      </div>
      `;
  } 
});


/**
 * Actiunea de Save la formularul de "Edit"
 */

update.addEventListener("click", (event)=>{

  fetch('/recipes/update', {
    method: 'PUT', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: document.getElementById('edit-form-id').value,  
      title: document.getElementById('edit-form-title').value,
      ingredients: document.getElementById('edit-form-ingredients').value,
      directions: document.getElementById('edit-form-directions').value        
    })
  })
    .then( res => {
      console.log(res.status);
      if(res.status === 200){
        window.location.href = '/recipes';
      }     
    })
})