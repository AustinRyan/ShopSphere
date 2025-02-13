import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, LogOut, User, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { getItemCount } = useCart();
  const { user, signOut } = useAuth();
  const itemCount = getItemCount();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.announcement}>
        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
        <select className={styles.language} aria-label="Select language">
          <option>English</option>
        </select>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.navSection}>
          <Link to="/" className={styles.logo}>
            ShopSphere
          </Link>
          
          <div className={styles.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            {!user && <Link to="/signup">Sign Up</Link>}
          </div>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="What are you looking for?"
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.navIcons}>
          <Link to="/wishlist" className={styles.iconLink} title="Wishlist">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className={styles.iconLink} title="Cart">
            <ShoppingCart size={20} />
            {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
          </Link>
          {user ? (
            <div className={styles.profileDropdown} ref={dropdownRef}>
              <button 
                className={styles.profileButton}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title="Profile Menu"
              >
                <User size={20} />
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                  <Link to="/account" className={styles.dropdownItem}>
                    <User size={18} />
                    <span>Manage My Account</span>
                  </Link>
                  <Link to="/cart" className={styles.dropdownItem}>
                    <ShoppingCart size={18} />
                    <span>My Cart</span>
                  </Link>
                  <Link to="/wishlist" className={styles.dropdownItem}>
                    <Heart size={18} />
                    <span>My Wishlist</span>
                  </Link>
                  <button onClick={handleSignOut} className={styles.dropdownItem}>
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.iconLink} title="Login">
              <User size={20} />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;