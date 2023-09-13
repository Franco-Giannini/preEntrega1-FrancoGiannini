const fs = require('fs');

const operacionesArchivosAsincrono = async () => {
    try {
//recordar usar el await con promesas. creador de archivos  
        await fs.promises.writeFile('./fs-promesas.txt', 'trabajando con promesas');

        let resultado = await fs.promises.readFile('./fs-promesas.txt', 'utf-8');

        console.log(resultado)

        await fs.promises.appendFile('./fs-promesas.txt', '\nAgregando mas contenido');

        resultado = await fs.promises.readFile('./fs-promesas.txt', 'utf-8');   

        console.log(resultado);

        await fs.promises.unlink('./fs-promesas.txt');

    } catch (error) {
        console.log(error);
    }
}

operacionesArchivosAsincrono();