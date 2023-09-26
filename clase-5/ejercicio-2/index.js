import UserManager from "./manager/UserManager.js";

const manager = new UserManager('./files/usuario.json'); 

const env = async () => {
    /*const usuarios = await manager.getUsers();
    console.log(usuarios);

    const user =  {
        nombre: 'pepe',
        apellido: 'pepito',
        usuario: 'lp94',
        clave: '1234'
    } ;

    await manager.createUsers(user);*/
    
    //const usuariosResultadoF = await manager.getUsers();
    //console.log(usuariosResultadoF);
    await manager.validateUser('lp94', '1234')
}

env();