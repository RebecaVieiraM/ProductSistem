import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/index';

const ProductList = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data); 
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleFilter = () => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          style={{ marginRight: '10px' }}
        >
          <option value="">Selecionar Categoria</option>
          <option value="fruta">Fruta</option>
          <option value="laticínios">Laticínios</option>
          <option value="vegetais">Vegetais</option>
          <option value="cereais">Cereais</option>
          <option value="industrializados">Industrializados</option>
          <option value="proteina animal">Proteína Animal</option>
        </select>
        <button onClick={handleFilter}>Filtrar</button>
      </div>

      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <span onClick={() => handleViewDetails(product.id)} style={{ cursor: 'pointer', color: 'blue' }}>
              {product.name} - {product.description} - {product.price} - {product.quantity}
            </span>
            <button onClick={() => onEdit(product)}>Editar</button>
            <button onClick={() => onDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
