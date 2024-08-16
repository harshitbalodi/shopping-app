import React, { useState, useEffect } from 'react';
import amazonRapidApi from '../../services/amazon-rapid-api';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCartItems = async () => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const detailedItems = await Promise.all(
        storedCartItems.map(async (item) => {
          try {
            const details = await amazonRapidApi.getProductDetails(item.asin);
            return { ...details.data, quantity: item.quantity };
          } catch (err) {
            console.error(`Error fetching details for product ${item.asin}:`, err);
            setError(`Error fetching details for product ${item.asin}. Please try again later.`);
            return null;
          }
        })
      );
      setCartItems(detailedItems.filter(item => item !== null));
      setLoading(false);
    };

    loadCartItems();
  }, []);

  const updateQuantity = (asin, newQuantity) => {
    const updatedItems = cartItems.map(item => 
      item.asin === asin ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems.map(item => ({ asin: item.asin, quantity: item.quantity }))));
  };

  const removeItem = (asin) => {
    const updatedItems = cartItems.filter(item => item.asin !== asin);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems.map(item => ({ asin: item.asin, quantity: item.quantity }))));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product_price.replace(/[^0-9.-]+/g,""));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => {
      const price = parseFloat(item.product_price.replace(/[^0-9.-]+/g,""));
      const originalPrice = parseFloat(item.product_original_price?.replace(/[^0-9.-]+/g,"") || price);
      return savings + ((originalPrice - price) * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) return <div className="cart-loading">Loading cart...</div>;
  if (error) return <div className="cart-error">{error}</div>;

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.asin} className="cart-item">
              <img src={item.product_photo} alt={item.product_title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.product_title}</h3>
                <p className="cart-item-price">Price: {item.product_price}</p>
                {item.product_original_price && (
                  <p className="cart-item-original-price">Original: {item.product_original_price}</p>
                )}
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.asin, Math.max(1, item.quantity - 1))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.asin, item.quantity + 1)}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => removeItem(item.asin)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: ₹{calculateTotal()}</h2>
            <p className="cart-savings">You saved: ₹{calculateSavings()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;