//implementacion con call backs 
const fs = require('fs');
//crear con CB
fs.writeFile('./archivo-cb.txt', 'trabajando con archivos usando callBacks', 
error => {
    if (error) {
        throw new Error (`error en la creacion del archivo ${error}`)
    }
//se lee con CB
    fs.readFile('./archivo-cb.txt', 'utf-8', (error, contenido) => {
        if (error) {
            throw new Error(`error en la lectura del archivo ${error}`)
        }

        console.log(contenido);
//agregando coontenido
        fs.appendFile('./archivo-cb.txt', '\nAgregando contenido', error => {
            if (error) {
                throw new Error (`error en la actualizacion del archivo ${error}`)
            }

            fs.readFile('./archivo-cb.txt', 'utf-8', (error, contenido) => {
                if (error) {
                    throw new Error(`error en la lectura del archivo ${error}`)
                }

                console.log(contenido);
//eliminando
                fs.unlink('./archivo-cb.txt', error => {
                    if (error) {
                        throw new Error (`error en la eliminacion de archivo ${error}`)
                    }
                })
            })
        })
    })
});
