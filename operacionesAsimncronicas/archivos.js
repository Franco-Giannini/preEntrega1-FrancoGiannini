const fs = require('fs');
//crear archivo
fs.writeFileSync('./ejemplo.txt', 'hola, estoy trabajando');

//validar que existe
if(fs.existsSync('./ejemplo.txt')) {
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8');
    console.log(contenido);

    //colocar mas contenido
    fs.appendFileSync('./ejemplo.txt', '\nMas contenido');

    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8');
    console.log(contenido);

    //eliminar archivos
    fs.unlinkSync('./ejemplo.txt');
}


