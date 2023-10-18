import express from "express"; //resolver el crud de usuarios (crud=create,read,update,delete)

const app = express();

//para poder recibir peticiones en formato JSON - middleware 
app.use(express.json());

const users =  [];

app.get('/users', (req,res) => { //obtener usuarios
    res.send(users); ///con express se devuelve un codigo 200
});

app.post('/users', (req,res) => { //creacion de un recurso
    const user = req.body;
    if(!user.first_name || !user.last_name){ //error del cliente porque no envia los datos obligatorios
        return res.status(400).send({status: 'error', error: 'incomplete values'})
    }

    if(users.length === 0) {
        user.id = 1;
    }else {
        user.id = users[users.length -1].id + 1
    }

    users.push(user);   //se entiende que sera un 200
    res.send({status: 'success', message: 'user created'});
})

//actualizacion del usuario
app.put('/users/:id', (req,res) => {
//vamos a enviar el id del usuario que queremos actualizar y enviamos el body del usuario con los campos actualizados
    const user = req.body;
    const userId = Number(req.params.id);

    if(!user.first_name || !user.last_name){ //error del cliente porque no envia los datos obligatorios
        return res.status(400).send({status: 'error', error: 'incomplete values'})
    }

    const index = users.findIndex(user => user.id === userId); //esto es si lo encuentra
    if(index !== -1) {
        users[index] = user;
        res.send({status: 'success', message: 'user updated'});
    }else{
        res.status(404).send({status: 'error', message: 'user not found'});
    }
});

//eliminacion de un recurso
app.delete('/users/:id', (req,res) => {
    const userId = Numbre(req.params.id); //obtencion del id del path params
    const index = users.findIndex(user => user.id === userId); //buscamos el usuario por el id que quiero eliminar
 
    if(index !== -1) {
        users.splice(index, 1)
        res.send({status: 'success', message: 'user deleted'});
    }else{
        res.status(404).send({status: 'error', message: 'user not found'});//no existe usario que queremos eliminar
    }
});

app.listen(8080)