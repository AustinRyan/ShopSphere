import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../lib/supabase';

export const useWishlist = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user?.id);

      if (error) throw error;
      setWishlistItems(data?.map(item => item.product_id) || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    if (!user) {
      showToast('Please sign in to add items to your wishlist', 'info');
      return false;
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .insert([{ user_id: user.id, product_id: productId }]);

      if (error) throw error;

      setWishlistItems(prev => [...prev, productId]);
      showToast('Added to wishlist', 'success');
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      showToast('Error adding to wishlist', 'error');
      return false;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setWishlistItems(prev => prev.filter(id => id !== productId));
      showToast('Removed from wishlist', 'success');
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      showToast('Error removing from wishlist', 'error');
      return false;
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.includes(productId);
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
};