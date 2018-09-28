const submit = document.getElementById("submit");

submit.addEventListener("click", (event)=>{

    event.preventDefault();

    formData = document.getElementById('ajax_form');
    
    fetch('/ajax_form', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nume: document.getElementById('nume').value,
            email: document.getElementById('email').value
        })
    })
    .then( res => res.text())
    .then(data => console.log(data));

})