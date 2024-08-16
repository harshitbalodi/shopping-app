import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import amazonRapidApi from '../services/amazon-rapid-api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

      const fetchData = async()=>{
        const data = await amazonRapidApi.getProductsByCategory();
        console.log(data);
        // setTemp(data);
      }
      fetchData();
    
    return () => {
      setProducts([]);
    };
  }, []);

  const openPopup = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => openPopup(product)}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p className="actual-price">${product.actualPrice.toFixed(2)}</p>
            <p className="discounted-price">${product.discountedPrice.toFixed(2)}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p className="actual-price">${selectedProduct.actualPrice.toFixed(2)}</p>
            <p className="discounted-price">${selectedProduct.discountedPrice.toFixed(2)}</p>
            <p>{selectedProduct.description}</p>
            <button className="add-to-cart">Add to Cart</button>
            <button className="close-popup" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;