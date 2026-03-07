let usuario = JSON.parse(localStorage.getItem("usuario"));

if(!usuario){

    window.location.href = "login.html";

}

document.getElementById("nombreUsuario").innerText = usuario.nombre;

function logout(){

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}