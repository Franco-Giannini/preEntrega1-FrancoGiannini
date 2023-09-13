/*const { UserManager } = require("./manager/USerManager.js");

 
const manager = new UserManager('./files/Usuario.json');


const env = async () => {
    const usuarios = await manager.getUsers();
    console.log(usuarios);

    const user =  {
        nombre: 'pepe',
        apellido: 'pepito',
        edad: 30,
        cursos: 'back-end'
    } ;

    manager.createUsers(user);
    
    const usuariosResultadoF = await manager.getUsers();
    console.log(usuariosResultadoF);
}

env();*/

const { productManager } = require("./manager/productManager.js");

 
const manager = new productManager('./files/Product.json');

const env = async () => {
    //console.log(productos);

    const producto =  {
        title:'notebook',
        description:'potente',
        price:800000,
        thumbnail:'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_35828_Notebook_Gamer_Dell_Alienware_15.6__Core_i7_11800H_16GB_512GB_SSD_NVMe_RTX_3060_W10_144Hz_d64758b6-grn.jpg',
        code:1,
        stock:10   
    };

    manager.createProducts(producto);
    
    const productosResultadoF = await manager.getProductos();
    console.log(productosResultadoF);
}

env();