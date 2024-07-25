const nav = document.querySelector("nav")
const abrir_btn = document.getElementById("abrir-menu")


function abrir(){

    if (nav.classList.contains("visible")) {
              nav.classList.remove("visible");
              abrir_btn.classList.remove("abierto")
    }
    else{
        nav.classList.add("visible");
        abrir_btn.classList.add("abierto");

    }
    
    
}

// function cerrar(){
    
//     nav.classList.remove("visible")
// }

