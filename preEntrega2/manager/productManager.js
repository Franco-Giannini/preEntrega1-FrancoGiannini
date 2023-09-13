const fs = require('fs')

class productManager {
    constructor(path) {
        this.path = path;
    }

    getProductos = async () => {
        try{
            if (fs.existsSync(this.path)){
                const data =  await fs.promises.readFile(this.path, 'utf-8');
                const product =   JSON.parse(data);
                return product;   
            }else{
                return [];
            }


        } catch (error){
            console.log(error);
        }
    }

    getProdctsById = (id) => {
        const productById = this.products.find(product => product.id === id);

        if (!productById){
            throw new Error('No existe el producto');
        }
        return productById
    }

    createProducts = async (productos) => {
        try{
            //reutilizacion de codigo y arreglo de objetos
            const products = await this.getProductos();

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
module.exports = {
    productManager
}