import { Router } from 'express';
import { uploader } from '../utils.js';

const router = Router();
const pets = [];

//middleware a nivel de router
router.use((req,res,next) => { 
    console.log('time router:', Date.now());
    next();     
});

router.get('/', (req,res) => {  //obtencion listado de mascotas
    res.send({ status: 'success', payload: pets});
});

router.post('/', (req,res) => {
    const pet = req.body;  //obteniendo el objeto que vamos a insertar
    if(!pet.name) {
        return res.status(400).send({ status: 'error', error: 'incomplete values'})
    }
    pets.push(pet);
    res.send({ status: 'success', payload: pet});
});

router.post('/v2', uploader.single('thumbnail'), (req,res) => {
    //validamos obligatoriamente que el usuario tenga que enviar un archivo con la foto de la mascota 
    const filename = req.file.filename;
    if(!filename) return res.status(500).send({status: 'error', error: 'no se puede subir el archivo'})
    const pet = req.body;  //obteniendo el objeto que vamos a insertar
    if(!pet.name) {
        return res.status(400).send({ status: 'error', error: 'incomplete values'})
    }
    pets.thumbnail = `http://localhost:8080/img/pets/${filename}`;
    pets.push(pet);
    res.send({ status: 'success', payload: pet});
});


export default router;