import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import logo from '../assets/logo.png';
import './LandingPage.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  const featuredProducts = products.slice(0, 6);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Welcome to Quick Pick</h1>
            <p className="hero-subtitle">Fast Delivery & Service</p>
            <p className="hero-description">
              Your one-stop shop for quality products delivered right to your doorstep. 
              Experience the fastest delivery service with exceptional customer care.
            </p>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="btn-primary btn-large">
              Shop Products
            </Link>
          </div>
          <div className="hero-image">
            <img src={logo} alt="Quick Pick Logo" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" ref={productsRef} className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {!isAuthenticated && (
            <div className="login-prompt">
              <p>Login to explore all products and categories</p>
              <Link to="/login" className="btn-primary">Login Now</Link>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="about">
        <div className="container">
          <h2>About Quick Pick</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Quick Pick is your trusted partner for fast and reliable delivery services. 
                We understand that time is valuable, which is why we've built a platform 
                that prioritizes speed without compromising on quality.
              </p>
              <p>
                Our mission is to provide exceptional service and deliver products to your 
                doorstep with unmatched efficiency. Whether you're shopping for electronics, 
                clothing, home essentials, or gifts, Quick Pick ensures a seamless shopping 
                experience from browsing to delivery.
              </p>
              <ul className="about-features">
                <li>⚡ Fast & Reliable Delivery</li>
                <li>🛡️ Secure Shopping Experience</li>
                <li>📦 Wide Product Selection</li>
                <li>💯 Customer Satisfaction Guaranteed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-content">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>📧 Quickpick278@gmail.com</p>
              <p>📞 03184552201</p>
              <p>📍 @UMT, Lahore</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

