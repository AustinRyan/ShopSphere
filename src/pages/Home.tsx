import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Smartphone, Monitor, Watch, Camera, Headphones, Gamepad } from 'lucide-react';
import { products, categories } from '../data/products';
import styles from '../styles/Home.module.css';
import WishlistButton from '../components/WishlistButton';

const Home = () => {
  const slides = [
    {
      title: "Up to 10% off Voucher",
      image: "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&q=80&w=3540",
      buttonText: "Shop Now"
    },
  ];

  const flashSaleProducts = products.slice(0, 4);
  const bestSellingProducts = products.slice(4, 8);
  const exploreProducts = products.slice(8, 12);

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const [timer, setTimer] = React.useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        let { days, hours, minutes, seconds } = prevTimer;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const categoryIcons = [
    { icon: <Smartphone size={40} />, name: 'Phones', subcategory: 'Smartphones' },
    { icon: <Monitor size={40} />, name: 'Computers', subcategory: 'Laptops' },
    { icon: <Watch size={40} />, name: 'SmartWatch', subcategory: 'Accessories' },
    { icon: <Camera size={40} />, name: 'Camera', subcategory: 'Cameras' },
    { icon: <Headphones size={40} />, name: 'HeadPhones', subcategory: 'Accessories' },
    { icon: <Gamepad size={40} />, name: 'Gaming', subcategory: 'Gaming' }
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <Link to={`/products?category=${encodeURIComponent(category.name)}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.heroSlider}>
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.slideContent}>
                <h2>{slide.title}</h2>
                <button className={styles.shopNow}>Shop Now</button>
              </div>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>

        <section className={styles.flashSales}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWrapper}>
              <div className={styles.todayTag}>Today's</div>
              <h2>Flash Sales</h2>
            </div>
            <div className={styles.timer}>
              <div className={styles.timerItem}>
                <span>{String(timer.days).padStart(2, '0')}</span>
                <label>Days</label>
              </div>
              <div className={styles.timerItem}>
                <span>{String(timer.hours).padStart(2, '0')}</span>
                <label>Hours</label>
              </div>
              <div className={styles.timerItem}>
                <span>{String(timer.minutes).padStart(2, '0')}</span>
                <label>Minutes</label>
              </div>
              <div className={styles.timerItem}>
                <span>{String(timer.seconds).padStart(2, '0')}</span>
                <label>Seconds</label>
              </div>
            </div>
          </div>

          <div className={styles.productsGrid}>
            {flashSaleProducts.map(product => (
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
                </div>
              </Link>
            ))}
          </div>
          <Link to="/products" className={styles.viewAllButton}>View All Products</Link>
        </section>

        <section className={styles.categories}>
          <div className={styles.sectionHeader}>
            <h2>Browse By Category</h2>
            <div className={styles.navigationButtons}>
              <button className={styles.navButton}>&lt;</button>
              <button className={styles.navButton}>&gt;</button>
            </div>
          </div>

          <div className={styles.categoryGrid}>
            {categoryIcons.map((item, index) => (
              <Link 
                to={`/products?category=Electronics&subcategory=${encodeURIComponent(item.subcategory)}`}
                key={index} 
                className={styles.categoryCard}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.bestSelling}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWrapper}>
              <div className={styles.monthTag}>This Month</div>
              <h2>Best Selling Products</h2>
            </div>
            <Link to="/products" className={styles.viewAllButton}>View All</Link>
          </div>

          <div className={styles.productsGrid}>
            {bestSellingProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
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
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.enhanceMusic}>
          <div className={styles.enhanceMusicContent}>
            <h2>Enhance Your Music Experience</h2>
            <div className={styles.timer}>
              <div className={styles.timerItem}>
                <span>23</span>
                <label>Hours</label>
              </div>
              <div className={styles.timerItem}>
                <span>05</span>
                <label>Days</label>
              </div>
              <div className={styles.timerItem}>
                <span>59</span>
                <label>Minutes</label>
              </div>
              <div className={styles.timerItem}>
                <span>35</span>
                <label>Seconds</label>
              </div>
            </div>
            <button className={styles.buyNowButton}>Buy Now!</button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80&w=1000" 
            alt="JBL Speaker"
            className={styles.enhanceMusicImage}
          />
        </section>

        <section className={styles.exploreProducts}>
          <div className={styles.sectionHeader}>
            <h2>Explore Our Products</h2>
            <div className={styles.navigationButtons}>
              <button className={styles.navButton}>&lt;</button>
              <button className={styles.navButton}>&gt;</button>
            </div>
          </div>

          <div className={styles.productsGrid}>
            {exploreProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
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
                </div>
              </Link>
            ))}
          </div>
          <Link to="/products" className={styles.viewAllButton}>View All Products</Link>
        </section>
      </div>
    </div>
  );
}

export default Home;