import express from 'express';

const app = express();

const users = [
    {id:1, nombre: 'Alex', apellido: 'Pinada', edad: 28, genero: 'M'},
    {id:2, nombre: 'Alejandro', apellido: 'Resk', edad: 25, genero: 'M'},
    {id:3, nombre: 'Nora', apellido: 'Saucedo', edad: 22, genero: 'F'}
]

//construir primer endpoint o servicio y revisar peticion http de tipo get 
app.get('/saludo', (req, res) => {
    res.send('hola este es mi primer endpoint desde express');
});

app.get('/bienvenido', (req,res) => {
    res.send(`<h1 style="color:blue">Bienvenido a nuestro primer servidor de express</h1>`);
});

//servicio usando un path param 
app.get('/un-parametro/:nombre', (req, res) => {
    res.send(`Bienvenido ${req.params.nombre}`);
})

app.get('/dos-parametros/:nombre/:apellido', (req, res) => {
    res.send(`Bienvenido ${req.params.nombre} ${req.params.apellido}`);
})

//construccion de servicio para obtener usuario por id
//el identificador de usario lo conseguimos a traves de un path.param
//siempre lo que enviemos por path.params es una cadena de texto
app.get('/usuario/:id', (req,res) => {  
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);
    if(!user) return res.send(({error:'usuario no encontrado'}));
    res.send(user);
});

app.get('/usuarios-query', (req, res) => {
    //req.query{
        const queryParams = req.query;
        res.send(queryParams);
    //}
});

//servicio que permite filtarr los usuarios por genero
app.get('/usuarios-busqueda', (req,res) =>{
    const genero = req.query.genero;  //obtenemos el genero del quey params
    //siempre hay que realizar validaciones, en el caso de que no llegue el genero o sea diferente de M o F ->
    //retornamos los usuarios sin filtrar 
    if(!genero||(genero!=='M'&&genero!=='F')) return res.send({users}); 
    const filteredUser = users.filter(user=>user.genero===genero); //filtracion de usuarios por genero
    res.send({usuarios:filteredUser});   
})

app.listen(8080, () => console.log('listening on port 8080'));


