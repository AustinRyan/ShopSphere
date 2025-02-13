import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <Link to="/" className={styles.continueShoppingBtn}>Continue Shopping</Link>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          <div className={styles.cartHeader}>
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {items.map(item => (
            <div key={`${item.id}-${item.color}-${item.size}`} className={styles.cartItem}>
              <div className={styles.productInfo}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  {item.color && <p>Color: <span style={{ backgroundColor: item.color }} className={styles.colorDot}></span></p>}
                  {item.size && <p>Size: {item.size}</p>}
                </div>
              </div>

              <div className={styles.price}>${item.price.toFixed(2)}</div>

              <div className={styles.quantity}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
              </div>

              <div className={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</div>

              <button 
                className={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2>Cart Total</h2>
          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      <div className={styles.cartActions}>
        <Link to="/" className={styles.continueShoppingBtn}>Return to Shop</Link>
        <div className={styles.couponCode}>
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;