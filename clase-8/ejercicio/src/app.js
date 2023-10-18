import express from 'express';
import userRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//middleware a nivel de aplicacion 
app.use((req,res,next) => {
    console.log('time: ', Date.now());
    next();
})

//middleware a nivel de ruta o servicio
function middlewareServicio(req,res,next) {
    req.dato1 = 'agregado a nivel middleware'
    next();
} 

//configuracion para servir archivos estaticos
console.log(__dirname);
//prefijo virtual, definir una ruta para acceder a nuestros archivos
//app.use(express.static(`${__dirname}/public`));
//middleware incorporado que es propio de express   
app.use('/statics-files', express.static(`${__dirname}/public`)); //de esta manera es mas seguro ya que no lo usamos directamente desde el localhost:8080

app.use('/api/users', userRouter);
app.use('/api/pets', petsRouter);

app.get('/test', middlewareServicio,(req,res) => {
    res.send({ playload: {
        dato: req.dato1
    }});
});

//middeware de manejo de errores siempre tiene que estar al final 
app.use((err,req,res,next) =>{
    console.log(err.message);
    res.status(500).send({ error: err.messsage });
});

app.listen(8080, () => console.log('server running'));