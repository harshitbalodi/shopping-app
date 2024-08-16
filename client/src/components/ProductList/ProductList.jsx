import { useState, useEffect } from 'react';
import './ProductList.css';
import amazonRapidApi from '../../services/amazon-rapid-api';
import HeartIcon from '../../assets/custom-svg-react-icon/HeartIcon';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await amazonRapidApi.getProductsByCategory();
        console.log(data.products);
        setProducts(data.products || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    return () => {
      setProducts([]);
    };
  }, []);

  const toggleCartItem = (product) => {
    const updatedCartItems = cartItems.some(item => item.asin === product.asin)
      ? cartItems.filter(item => item.asin !== product.asin)
      : [...cartItems, { asin: product.asin, quantity: 1 }];

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }

  const isInCart = (productAsin) => {
    return cartItems.some(item => item.asin === productAsin);
  }

  const openPopup = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.asin} className="product-card">
            <img src={product.product_photo} alt={product.product_title} onClick={() => openPopup(product)} />
            <h2>{product.product_title}</h2>
            <p className="price">{product.product_price}</p>
            {product.product_original_price && (
              <p className="original-price">{product.product_original_price}</p>
            )}
            <div className="rating">
              <span>★ {product.product_star_rating}</span>
              <span>({product.product_num_ratings} ratings)</span>
            </div>
            <button className="toggle-cart" onClick={() => toggleCartItem(product)}>
              <HeartIcon color={isInCart(product.asin) ? "red" : "gray"} />
            </button>
          </div>
        ))}


      </div>
      {selectedProduct && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.product_title}</h2>
            <img src={selectedProduct.product_photo} alt={selectedProduct.product_title} />
            <p className="price">{selectedProduct.product_price}</p>
            {selectedProduct.product_original_price && (
              <p className="original-price">{selectedProduct.product_original_price}</p>
            )}
            <div className="rating">
              <span>★ {selectedProduct.product_star_rating}</span>
              <span>({selectedProduct.product_num_ratings} ratings)</span>
            </div>
            {selectedProduct.is_prime && <p className="prime">Prime</p>}
            {selectedProduct.is_best_seller && <p className="best-seller">Best Seller</p>}
            {selectedProduct.is_amazon_choice && <p className="amazon-choice">Amazon's Choice</p>}
            <p>{selectedProduct.delivery}</p>
            <button className="add-to-cart">Add to Cart</button>
            <button className="close-popup" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;