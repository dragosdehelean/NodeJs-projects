const input = document.getElementById('foto');
const info = document.getElementById('info');


input.addEventListener('change', (event) => {
  // construieste codul HTML pentru mesajele pentru user
  let cod = `Ai selectat ${input.files.length} fisiere
          <ul>`;
  Array.from(input.files).forEach(item => {
    cod += `<li> 
              <strong>Nume fisier</strong>: ${item.name},
              <strong>Dimensiune</strong>: ${item.size},
              <strong>Tip de media</strong>: ${item.type},    
            </li>`;

  });
  cod += `</ul>`;
  //printeaza codul HTML in DOM
  info.innerHTML = cod;
  info.setAttribute("class", "alert alert-info");
 
})