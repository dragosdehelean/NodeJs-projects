const submit = document.getElementById("submit");

submit.addEventListener("click", (event)=>{
    //anuleaza efectul default al butonului
    event.preventDefault();
    
    // trimitele datele din formular prin POST, in format JSON
    fetch('/ajax_form', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: document.getElementById('title').value,
            ingredients: document.getElementById('ingredients').value,
            directions: document.getElementById('directions').value
        })
    })
    .then(response => response.json())
    .then(data => {
     
      // Daca exista erori, le pune intr-un template literal 
      // la final le afiseaza intr-un div gol din formular
      if (Object.keys(data.errors).length > 0) {
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
      } else {

        console.log('succes')
      }     
      
    });

})

function showErrors(data){
  
 


}