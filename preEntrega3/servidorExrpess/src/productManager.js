import fs from 'fs';

export  class productManager {


    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try{
            if (fs.existsSync(this.path)){
                const data =  await fs.promises.readFile(this.path, 'utf-8');
                const product =   JSON.parse(data)
                return product;   
            }else{
                return [];
            }


        } catch (error){
            console.log(error);
        }
    }

    getProductsById = async (id) => {
        try {
            console.log("id:" + id)
            const products = await this.getProducts()
            const productById = products.find((product) => product.id === id);
            if (!productById){
                throw new Error('No existe el producto');
            }
            return productById
        } catch (error) {
            console.log(error);
        }
    }

    getProductsWithLimit = async (limit) => {
        try {
            console.log("Limites: " + limit)
            const products = await this.getProducts();
            const productsLimit = products.slice(0,limit);
            if(limit < 0) {
                throw new Error('el limite no puede ser negativo');
            }
            return productsLimit;
        } catch (error) {
             console.log(error);
        }
    }

    createProducts = async (productos) => {
        try{
            //reutilizacion de codigo y arreglo de objetos
            const products = await this.getProducts();

            if (products.length === 0) {
                productos.id = 1;        
            }else{
                let ultimoUser = products[products.length - 1];
                productos.id = ultimoUser.id + 1;
            }

            products.push(productos);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return productos;

        }catch (error){
            console.log(error);
        }
    }
}    
//  module.exports = {
//     productManager
// }