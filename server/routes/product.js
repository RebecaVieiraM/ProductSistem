const express = require('express');
const Product = require('../model/product');
const router = express.Router();


// Rota para listar produtos
router.get('/products/:id', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Rota para adicionar produto
router.post('/products', async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  const newProduct = await Product.create({ name, description, price, quantity, category });
  res.json(newProduct);
});

// Rota para editar produto
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;
  await Product.update({ name, description, price, quantity, category }, { where: { id } });
  res.json({ message: 'Produto atualizado com sucesso' });
});

// Rota para deletar produto
router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.json({ message: 'Produto deletado com sucesso' });
});

module.exports =  router;