import fs from 'fs';
import crypto from 'crypto';

export default class UserManager {
    constructor(path) {
        this.path = path;
    }
//obtencion de usuarios del archivo Usuarios.json
    getUsers = async () => {
        try{
            if (fs.existsSync(this.path)){
                const data =  await fs.promises.readFile(this.path, 'utf-8');
                const users =   JSON.parse(data);
                return users;   
            }else{
                return [];
            }


        } catch (error){
            console.log(error);
        }
    }
    
    createUsers = async (usuario) => {
        try{
            //reutilizacion de codigo y arreglo de objetos
            const users = await this.getUsers();

            if (users.length === 0) {
                usuario.id = 1;        
            }else{
                let ultimoUser = users[users.length - 1];
                usuario.id = ultimoUser.id + 1;
            }

            //trabajamos con algoritmos y encriptacion 
            //para no guardar la contraseña igual, vamos a usar salt random bites
            usuario.salt = crypto.randomBytes(128).toString('base64');
            usuario.clave = crypto.createHmac('sha256', usuario.salt).update(usuario.clave).digest('hex');  //sha256 es un algoritmo de seguridad


            users.push(usuario);

            await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));

            return usuario;

        }catch (error){
            console.log(error);
        }
    }

    validateUser = async(username, password) => {
        try {
            const users = await this.getUsers();
            const userIndex = users.findIndex(user => user.usuario === username);
            if (userIndex ===  -1 ) {
                console.log('usuario no encontrado');
                return;
            }

            const user = users[userIndex];
            const newHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex');

            if(newHash === user.clave) {
                console.log('usuario logueado');
            }else{
                console.log('contraseña incorrecta'); 
            }

        } catch (error) {
            console.log(error);
        }
    }
}
