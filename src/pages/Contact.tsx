import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    showToast('Message sent successfully!', 'success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link> / <span>Contact</span>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <Phone size={24} />
            </div>
            <h3>Call To Us</h3>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <Mail size={24} />
            </div>
            <h3>Write To Us</h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Email: customer@shopsphere.com</p>
            <p>Email: support@shopsphere.com</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <Clock size={24} />
            </div>
            <h3>Working Hours</h3>
            <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
            <p>Saturday & Sunday: 9:00 AM - 5:00 PM</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <MapPin size={24} />
            </div>
            <h3>Visit Us</h3>
            <p>Come say hello at our office HQ.</p>
            <p>123 Business Avenue, Silicon Valley, San Francisco, CA 94043</p>
          </div>
        </div>

        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone *"
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;