import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../lib/supabase';
import { products } from '../data/products';
import styles from '../styles/Wishlist.module.css';

interface WishlistItem {
  id: string;
  product_id: number;
}

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data, error } = await supabase
          .from('wishlists')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;
        setWishlistItems(data || []);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        showToast('Error loading wishlist', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, navigate, showToast]);

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', wishlistId);

      if (error) throw error;

      setWishlistItems(prev => prev.filter(item => item.id !== wishlistId));
      showToast('Item removed from wishlist', 'success');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      showToast('Error removing item from wishlist', 'error');
    }
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.currentPrice,
        quantity: 1,
        image: product.image
      });
      showToast('Item added to cart', 'success');
    }
  };

  const moveAllToBag = () => {
    wishlistItems.forEach(item => {
      handleAddToCart(item.product_id);
    });
    showToast('All items moved to cart', 'success');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const wishlistProducts = wishlistItems.map(item => 
    products.find(p => p.id === item.product_id)
  ).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <Heart size={64} />
          <h2>Your Wishlist is Empty</h2>
          <p>Add items you love to your wishlist. Review them anytime and easily move them to the bag.</p>
          <Link to="/products" className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Wishlist ({wishlistProducts.length})</h1>
        <button onClick={moveAllToBag} className={styles.moveAllButton}>
          Move All To Bag
        </button>
      </div>

      <div className={styles.grid}>
        {wishlistProducts.map((product, index) => product && (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.name} />
              <button 
                className={styles.removeButton}
                onClick={() => removeFromWishlist(wishlistItems[index].id)}
              >
                <Heart size={20} fill="#DB4444" />
              </button>
            </div>
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <div className={styles.pricing}>
                <span className={styles.currentPrice}>${product.currentPrice}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>${product.originalPrice}</span>
                )}
              </div>
              <button 
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(product.id)}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;