import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductDetail from './components/productDetail';
import ProductForm from './components/productForm';
import ProductList from './components/productList';



function Main() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/products/ProductForm" element={<ProductForm />} />
                <Route path="/products/ProductList" element={<ProductList />} />
                <Route path="/products/ProductDetail" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
}

export default Main;