import express from 'express';
import {productManager} from './productManager.js';
import fs from 'fs';


const manager = new productManager('./files/products.json');

const app =  express();

app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
    try {
      const products = await manager.getProducts();
      res.send({ products });
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  app.get('/products/:pid', async (req, res) => { 
    try {
      const productId = Number(req.params.pid);
      const product = await manager.getProductsById(productId);
      if (!product) {
        res.status(404).send('Producto no encontrado');
      } else {
        res.send({ product });
      }
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  app.get('/productsLimit', async (req,res) => {
    try {
      const queryLimit = Number(req.query.limit);
      if(queryLimit < 0){
        res.status(400).send('El limite no puede ser negativo');
      }else{
        const getProductsLimits = await manager.getProductsWithLimit(queryLimit);
      res.send({getProductsLimits});
      }
    } catch (error) {
      console.log(error);
    }

  });



app.listen(8080, () =>console.log("listening on 8080"));


