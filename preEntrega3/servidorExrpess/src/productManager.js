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

    getProdctsById = async (id) => {
        try {
            const products = await this.getProdcts()
            const productId = products.find((p) => p.id === parseInt(id))
            if(productId){
                return productId
            }else{
                return "not found, el id no fue encontrado"
            }
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