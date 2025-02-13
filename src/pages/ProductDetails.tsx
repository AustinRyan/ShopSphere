import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { products } from '../data/products';
import styles from '../styles/ProductDetails.module.css';
import WishlistButton from '../components/WishlistButton';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [product, setProduct] = useState(products.find(p => p.id === Number(id)) || null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(0);
      setQuantity(1);
      setSelectedColor(0);
      if (foundProduct.sizes) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Product not found</h2>
          <Link to="/" className={styles.returnButton}>Return to Home</Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => increment ? prev + 1 : Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.currentPrice,
      quantity: quantity,
      image: product.image,
      color: product.colors?.[selectedColor],
      size: selectedSize
    });
    showToast(`${product.name} has been added to your cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  // Get related products from the same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <span>Account</span> / <span>{product.category}</span> / <span>{product.name}</span>
      </div>

      <div className={styles.productSection}>
        <div className={styles.imageGallery}>
          <div className={styles.thumbnails}>
            {product.images?.map((img, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.selected : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={product.images?.[selectedImage] || product.image} alt={product.name} />
          </div>
        </div>

        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          <div className={styles.rating}>
            <span className={styles.stars}>{renderStars(product.rating)}</span>
            <span className={styles.reviews}>({product.reviews} Reviews)</span>
            <span className={styles.stock}>In Stock</span>
          </div>
          <div className={styles.price}>${product.currentPrice.toFixed(2)}</div>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.options}>
            {product.colors && (
              <div className={styles.colors}>
                <span>Colors:</span>
                <div className={styles.colorOptions}>
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`${styles.colorOption} ${selectedColor === index ? styles.selectedColor : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className={styles.sizes}>
                <span>Size:</span>
                <div className={styles.sizeOptions}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeOption} ${selectedSize === size ? styles.selectedSize : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.quantity}>
              <span>Quantity:</span>
              <div className={styles.quantityControls}>
                <button onClick={() => handleQuantityChange(false)}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(true)}><Plus size={16} /></button>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.buyNow} onClick={handleBuyNow}>Buy Now</button>
              <button className={styles.addToCart} onClick={handleAddToCart}>
                Add to Cart
              </button>
              <WishlistButton productId={Number(id)} className={styles.wishlist} />
            </div>
          </div>

          <div className={styles.delivery}>
            <div className={styles.deliveryOption}>
              <Truck size={24} />
              <div>
                <h4>Free Delivery</h4>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className={styles.deliveryOption}>
              <RotateCcw size={24} />
              <div>
                <h4>Return Delivery</h4>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.relatedProducts}>
        <h2>Related Items</h2>
        <div className={styles.productsGrid}>
          {relatedProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} />
                <button className={styles.wishlistButton} onClick={(e) => e.preventDefault()}>
                  <Heart size={20} />
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
                <div className={styles.rating}>
                  <span className={styles.stars}>{renderStars(product.rating)}</span>
                  <span className={styles.reviews}>({product.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;