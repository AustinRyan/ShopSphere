import React from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  QrCode,
  Apple,
  Play as PlayStore,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>ShopSphere</h3>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className={styles.emailInput}>
            <input type="email" placeholder="Enter your email" />
            <button>
              <Send size={16} />
            </button>
          </div>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="Youtube">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <h3>Support</h3>
          <p>123 ShopSphere Ave, Tampa,</p>
          <p>FL 33602, USA.</p>
          <p>ShopSphere@gmail.com</p>
          <p>+1 123-456-7890</p>
        </div>

        <div className={styles.column}>
          <h3>Account</h3>
          <div className={styles.links}>
            <Link to="/account">My Account</Link>
            {!user && <Link to="/login">Login / Register</Link>}
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/products">Shop</Link>
          </div>
        </div>

        <div className={styles.column}>
          <h3>Quick Links</h3>
          <div className={styles.nonClickableLinks}>
            <span>Privacy Policy</span>
            <span>Terms Of Use</span>
            <span>FAQ</span>
            <span>Contact</span>
          </div>
        </div>

        <div className={styles.column}>
          <h3>Download App</h3>
          <p>Save $3 with App New User Only</p>
          <div className={styles.appDownload}>
            <div className={styles.qrCode}>
              <QrCode size={80} />
            </div>
            <div className={styles.appStores}>
              <span className={styles.storeButton}>
                <PlayStore size={20} />
                <div className={styles.storeText}>
                  <span>GET IT ON</span>
                  <span>Google Play</span>
                </div>
              </span>
              <span className={styles.storeButton}>
                <Apple size={20} />
                <div className={styles.storeText}>
                  <span>Download on the</span>
                  <span>App Store</span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;