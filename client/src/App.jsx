import React, { useState } from 'react';
import ProductForm from './components/productForm';
import ProductList from './components/productList';
import api from './service/index';

function App() {  
  
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      window.location.reload(); // Atualiza a lista de produtos
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  const handleProductAdded = () => {
    window.location.reload(); // Atualiza a lista de produtos após adição
  };

  const handleProductUpdated = () => {
    setEditingProduct(null);
    window.location.reload(); // Atualiza a lista de produtos após edição
  };

  return (
    <div>
      <h1>Gerenciamento de Produtos</h1>
      {editingProduct ? (
        <ProductForm product={editingProduct} onProductUpdated={handleProductUpdated} />
      ) : (
        <ProductForm onProductAdded={handleProductAdded} />
      )}
      <ProductList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );

}

export default App;
