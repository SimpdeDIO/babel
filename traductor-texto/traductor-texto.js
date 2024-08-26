const nav = document.querySelector("nav")
const abrir_btn = document.getElementById("abrir-menu")


function abrir(){
  
     nav.classList.add("visible");

    
}

function cerrar(){

    nav.classList.remove("visible");

    
}


function traducir(){
    
const apiUrl = 'https://translation.googleapis.com/language/translate/v2';

const form = document.getElementById("texto-cont");

const q = document.getElementById("textoUsuario");

const result = document.getElementById("result");

console.log("Cargo: " + q.value);

// esto es lo que carga el usuario //



const data = {

  q: q.value,

  source: 'en',

  target: 'es'

};



// estto carga los headers//



const requestOptions = {

  method: 'POST',

  headers: {

    'Content-Type': 'application/json',

	'X-goog-api-key': ''

  },

  //esto carga el body //

  body: JSON.stringify(data),

};

console.log("Data: " + data);

//envia el comando//

fetch(apiUrl, requestOptions)

  .then(response => {

    if (!response.ok) { 

	// si devuelve un http distito de 200 es por que dio error, tienen que definir el mensaje//

      throw new Error('Oiga ponga bien las cosas');

    }

    // si devolvio un http 200 salio todo ok y retorna la respuesta //

	return response.json();   

  })

 

  //esto te tranforma el json en cadena de text y que sera lo que le van a mostrar al usuario//

  .then(data => {

    

    // console.log("Response: " + response.ok);
    // result.textContent = JSON.stringify(data, null, 2);  

  })

  .catch(error => {

    console.error



('Error:', error);

  });
}
