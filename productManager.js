class productManager {

    constructor() {
        this.products = [];
    }

    getProductos = () => {
        return this.products;
    }

    getProdctsById = (id) => {
        const productById = this.products.find(product => product.id === id);

        if (!productById){
            throw new Error('No existe el producto');
        }
        return productById
    }

    agregarProductos = (title, description, price, thumbnail, code, stock) => {
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (this.products.length === 0) {
            producto.id = 1;
        }else{
            producto.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(producto);
    }
}

const manejadorProducts = new productManager();  

manejadorProducts.agregarProductos('computadora', 'rapida', 200000, 'https://www.fullh4rd.com.ar/img/productos/32/notebook-lenovo-156-ideapad-3-15itl6-i71165g7-8gb-256gb-w11h-0.jpg', 1, 5);
manejadorProducts.agregarProductos('computadora2', 'mas rapida', 400000, 'https://http2.mlstatic.com/D_NQ_NP_794081-MLA28199452613_092018-O.webp', 2, 7);

console.log(manejadorProducts.getProductos());