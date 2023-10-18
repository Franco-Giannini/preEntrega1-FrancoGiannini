import multer from 'multer';
import { fileURLToPath } from 'url'; //sirve para ubicarnos mejor en las carpetas asi sabe bein a donde dirigirse dentro de las carpetas
import { dirname } from 'path'; //traduce lo que nos da la primera dependecia

const __filename = fileURLToPath(import.meta.url); //con esto obtenemos toda la url especifica desde el directorio desde donde estamos trabajando
const __dirname = dirname(__filename); //esto es para hacerlo legible

//parametros de configuracion
//destino o donde quiero guardar mis archivos y nombres de los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/img/pets`)
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploader = multer({
    storage, onError: (err,next) => {
        console.log(err.message);
        next();
    }
})

export {
    __dirname,
    uploader
}

