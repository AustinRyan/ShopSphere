import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, PackageX } from 'lucide-react';
import { products, categories } from '../data/products';
import WishlistButton from '../components/WishlistButton';
import styles from '../styles/Products.module.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const subcategoryFilter = searchParams.get('subcategory');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products.filter(product => {
    if (categoryFilter && subcategoryFilter) {
      return product.category === categoryFilter && product.subcategory === subcategoryFilter;
    }
    if (categoryFilter) {
      return product.category === categoryFilter;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.currentPrice - b.currentPrice;
      case 'price-high':
        return b.currentPrice - a.currentPrice;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const EmptyState = () => (
    <div className={styles.emptyState}>
      <PackageX size={64} />
      <h2>No Products Available</h2>
      <p>We don't have any products available in this category at the moment.</p>
      <Link to="/products" className={styles.browseButton}>
        Browse All Products
      </Link>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> / 
        {categoryFilter && <><span>{categoryFilter}</span> / </>}
        <span>{subcategoryFilter || 'All Products'}</span>
      </div>

      <div className={styles.header}>
        <h1>{subcategoryFilter || categoryFilter || 'All Products'}</h1>
        <div className={styles.filters}>
          <Filter size={20} />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <h2>Categories</h2>
          <ul className={styles.categoryList}>
            <li>
              <Link 
                to="/products" 
                className={!categoryFilter ? styles.active : ''}
              >
                All Products
              </Link>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <Link 
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className={categoryFilter === category.name ? styles.active : ''}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.productsGrid}>
          {sortedProducts.length === 0 ? (
            <EmptyState />
          ) : (
            sortedProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                  {product.originalPrice && (
                    <span className={styles.discount}>
                      -{Math.round((1 - product.currentPrice / product.originalPrice) * 100)}%
                    </span>
                  )}
                  <WishlistButton productId={product.id} className={styles.wishlistButton} />
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <div className={styles.pricing}>
                    <span className={styles.currentPrice}>${product.currentPrice}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>${product.originalPrice}</span>
                    )}
                  </div>
                  <div className={styles.rating}>
                    <span className={styles.stars}>{renderStars(product.rating)}</span>
                    <span className={styles.reviews}>({product.reviews})</span>
                  </div>
                  {product.subcategory && (
                    <div className={styles.category}>
                      <span>{product.subcategory}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;