//simular los datos de una BD
let peliculas = [
    {
        "id": 1,
        "titulo":"Spiderman",
        "lanzamiento": 2008,
        "genero": "Ciencia Ficcion",
        "duracion": 120,
        "imagen": "https://image.api.playstation.com/vulcan/ap/rnd/202009/3021/B2aUYFC0qUAkNnjbTHRyhrg3.png"
    },
    {
        "id": 2,
        "titulo":"Rapidos y Furiosos",
        "lanzamiento": 2002,
        "genero": "Accion",
        "duracion": 130,
        "imagen": "https://media.themoviedb.org/t/p/w220_and_h330_face/w4yKARNnT4AOnCzHh6trsrvC9Kw.jpg"
    },
    {
        "id": 3,
        "titulo":"La LLorona",
        "lanzamiento": 2015,
        "genero": "Terror",
        "duracion": 110,
        "imagen": "https://media.vanityfair.com/photos/5cb8f40c043df32e2f490980/4:3/w_1776,h_1332,c_limit/The-Curse-of-La-Llorona.jpg"
    }
];

//funcion para obtener las peliculas
function obtenerPeliculas( pelis ) {
    return new Promise( (resolve, reject)=>{
        //simular un retraso al obtener la informacion
        setTimeout( ()=>{
            //validar si hay datos en la BD
            if( pelis.length > 0 ){
                resolve( pelis );
            }else{
                reject("Error, no hay datos en la BD");
            }
        }, 2000);
    } )
}

//mostrar las peliculas en el navegador
//metodo 1
// obtenerPeliculas( peliculas )
//     .then( (d)=> console.log(d) )
//     .catch( (e)=>console.log(e) );

//metodo 2
async function mostrarDatos( movies ) {
    try {
       let datos = await obtenerPeliculas( movies );
        console.log(datos); 
    } catch (error) {
        console.log(error);
    }
}
//mostrar los datos en consola
mostrarDatos(peliculas);