import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import styles from '../styles/Checkout.module.css';

interface BillingDetails {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  saveInfo: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cash'>('bank');
  const [couponCode, setCouponCode] = useState('');
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
    saveInfo: false,
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment and send order details to your backend
    showToast('Order placed successfully!', 'success');
    clearCart();
    navigate('/');
  };

  const handleApplyCoupon = () => {
    // Here you would validate the coupon code and apply the discount
    showToast('Coupon applied successfully!', 'success');
  };

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Account</Link> / <Link to="/cart">View Cart</Link> / <span>Checkout</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <div className={styles.billingDetails}>
          <h2>Billing Details</h2>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="firstName"
              value={billingDetails.firstName}
              onChange={handleInputChange}
              placeholder="First Name*"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="companyName"
              value={billingDetails.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="streetAddress"
              value={billingDetails.streetAddress}
              onChange={handleInputChange}
              placeholder="Street Address*"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="apartment"
              value={billingDetails.apartment}
              onChange={handleInputChange}
              placeholder="Apartment, floor, etc. (optional)"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="townCity"
              value={billingDetails.townCity}
              onChange={handleInputChange}
              placeholder="Town/City*"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phoneNumber"
              value={billingDetails.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number*"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="emailAddress"
              value={billingDetails.emailAddress}
              onChange={handleInputChange}
              placeholder="Email Address*"
              required
            />
          </div>
          <div className={styles.saveInfo}>
            <input
              type="checkbox"
              name="saveInfo"
              id="saveInfo"
              checked={billingDetails.saveInfo}
              onChange={handleInputChange}
            />
            <label htmlFor="saveInfo">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.products}>
            {items.map(item => (
              <div key={`${item.id}-${item.color}-${item.size}`} className={styles.product}>
                <img src={item.image} alt={item.name} />
                <div className={styles.productInfo}>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  {item.color && <p>Color: <span style={{ backgroundColor: item.color }} className={styles.colorDot}></span></p>}
                  {item.size && <p>Size: {item.size}</p>}
                </div>
                <span className={styles.price}>${item.price}</span>
              </div>
            ))}
          </div>

          <div className={styles.coupon}>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon Code"
            />
            <button type="button" onClick={handleApplyCoupon}>
              Apply Coupon
            </button>
          </div>

          <div className={styles.totals}>
            <div className={styles.row}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.row}>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className={`${styles.row} ${styles.total}`}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.paymentMethods}>
            <div className={styles.method}>
              <input
                type="radio"
                id="bank"
                name="payment"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
              />
              <label htmlFor="bank">
                Bank
                <div className={styles.paymentIcons}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                </div>
              </label>
            </div>
            <div className={styles.method}>
              <input
                type="radio"
                id="cash"
                name="payment"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              <label htmlFor="cash">Cash on delivery</label>
            </div>
          </div>

          <button type="submit" className={styles.placeOrder}>
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;