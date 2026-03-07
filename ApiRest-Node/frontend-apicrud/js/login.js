const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", loginUser);

async function loginUser(e){

    e.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    let datos = {
        usuario: usuario,
        contrasena: contrasena
    };

    let respuesta = await fetch("http://localhost:3000/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)
    });

    let resultado = await respuesta.json();

    if(respuesta.status === 200){

        localStorage.setItem("usuario", JSON.stringify(resultado));

        alert("Login correcto");

        window.location.href = "index.html";

    }else{

        alert("Usuario o contraseña incorrectos");

    }

}