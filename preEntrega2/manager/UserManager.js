const fs = require('fs')

class UserManager {
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

            users.push(usuario);

            await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));

            return usuario;

        }catch (error){
            console.log(error);
        }
    }
}

module.exports = {
    UserManager
}