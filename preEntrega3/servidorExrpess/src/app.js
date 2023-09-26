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
      const products = await manager.getProductsById(req.params.pid);
      if (!products) {
        res.status(404).send('Producto no encontrado');
      } else {
        res.send({ product });
      }
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      res.status(500).send('Error interno del servidor');
    }
  });


app.listen(8080, () =>console.log("listening on 8080"));


