import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, BadgeCheck, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from '../styles/About.module.css';

const About = () => {
  const stats = [
    {
      number: '10.5k',
      label: 'Sellers active our site',
      icon: <BadgeCheck size={24} />
    },
    {
      number: '33k',
      label: 'Monthly Products Sale',
      icon: <Truck size={24} />
    },
    {
      number: '45.5k',
      label: 'Customer active our site',
      icon: <Clock size={24} />
    },
    {
      number: '25k',
      label: 'Annual gross sale in our site',
      icon: <BadgeCheck size={24} />
    }
  ];

  const teamMembers = [
    {
      name: 'Tom Cruise',
      position: 'Founder & Chairman',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
      social: {
        twitter: '',
        instagram: '',
        linkedin: ''
      }
    },
    {
      name: 'Emma Watson',
      position: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      social: {
        twitter: '',
        instagram: '',
        linkedin: ''
      }
    },
    {
      name: 'Will Smith',
      position: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
      social: {
        twitter: '',
        instagram: '',
        linkedin: ''
      }
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> / <span>About</span>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Our Story</h1>
          <p>
            Launched in 2025, ShopSphere is USA's premier online shopping 
            marketplace with an active presence in Bangladesh. Supported 
            by wide range of tailored marketing, data and service solutions, 
            ShopSphere has 10,500 sellers and 300 brands and serves 3 
            million customers across the region.
          </p>
          <p>
            ShopSphere has more than 1 million products to offer, growing at a 
            very fast pace. ShopSphere offers a diverse assortment in categories 
            ranging from consumer.
          </p>
        </div>
        <div className={styles.heroImage}>
          <img 
            src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=2000" 
            alt="Shopping Experience" 
          />
        </div>
      </div>

      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.team}>
        <h2>Our Team</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <div className={styles.memberImage}>
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
              <div className={styles.socialLinks}>
                <span className={styles.socialIcon}><Twitter size={20} /></span>
                <span className={styles.socialIcon}><Instagram size={20} /></span>
                <span className={styles.socialIcon}><Linkedin size={20} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.services}>
        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <Truck size={32} />
          </div>
          <h3>FREE AND FAST DELIVERY</h3>
          <p>Free delivery for all orders over $140</p>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <Clock size={32} />
          </div>
          <h3>24/7 CUSTOMER SERVICE</h3>
          <p>Friendly 24/7 customer support</p>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>
            <BadgeCheck size={32} />
          </div>
          <h3>MONEY BACK GUARANTEE</h3>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default About;