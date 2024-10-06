import React, { useState, useEffect } from 'react';
import api from '../service/index';

const ProductForm = ({ product, onProductAdded, onProductUpdated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategory(product.category);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategory('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const productData = {
        name,
        description,
        price,
        quantity,
        category
      };

      if (product) {
        const response = await api.put(`/products/${product.id}`, productData);
        onProductUpdated(response.data);
      } else {
        const response = await api.post('/products', productData);
        onProductAdded(response.data);
      }

      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategory(''); 
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
      setErrorMessage('Erro ao salvar o produto. Tente novamente.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px'
    }}>
      <h2>{product ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          style={{
            margin: '5px',
            padding: '10px',
            width: '200px'
          }}
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={{
            margin: '5px',
            padding: '10px',
            width: '200px'
          }}
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          style={{
            margin: '5px',
            padding: '10px',
            width: '200px'
          }}
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          style={{
            margin: '5px',
            padding: '10px',
            width: '200px'
          }}
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        
        <select 
          style={{ margin: '5px', padding: '10px', width: '200px' }} 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
        >
          <option value="">Selecione a Categoria</option>
          <option value="fruta">Fruta</option>
          <option value="laticínios">Laticínios</option>
          <option value="vegetais">Vegetais</option>
          <option value="cereais">Cereais</option>
          <option value="industrializados">Industrializados</option>
          <option value="proteina animal">Proteína Animal</option>
        </select>

        <button type="submit" style={{ marginTop: '10px' }}>
          {product ? 'Salvar Alterações' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;