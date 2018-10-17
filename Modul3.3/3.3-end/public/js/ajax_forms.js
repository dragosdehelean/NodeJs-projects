const submit = document.getElementById("submit");
const recipeList = document.getElementById("recipeList");
const update = document.getElementById("edit-form-submit");

// Actiunea pentru butonul de "create"
submit.addEventListener("click", (event)=>{
   
    event.preventDefault(); //anuleaza efectul default al butonului
    
    // trimitele datele din formular prin POST, in format JSON
    fetch('/recipes/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: document.getElementById('title').value,
            ingredients: document.getElementById('ingredients').value,
            directions: document.getElementById('directions').value
        })
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
      // Daca nu exista erori, redirecteaza cu mesaj de succes     
      else {
        window.location.href = '/recipes';
        console.log('succes');
      }     
      
    })
    // scrie in consola eventualele erori aparute
    .catch(err => {
      console.log(err);
    });
})

// Actiunea pentru butonul de "Delete" 
// este ascultat elementul parinte, care contine toata lista
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
 * Actiunea pentru butonul de "Edit" 
 * este ascultat elementul parinte, care contine toata lista
 */ 
recipeList.addEventListener("click", (event)=>{
  if (event.target.value === "edit" ){

    console.log('mi-a dat click');

    document.getElementById('edit-form-id').value = event.target.dataset.id;
    document.getElementById('edit-form-title').value = event.target.dataset.title;
    document.getElementById('edit-form-ingredients').value = event.target.dataset.ingredients;
    document.getElementById('edit-form-directions').value = event.target.dataset.directions;
  } 
});


//actiunea de Save la formularul de "Edit"

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