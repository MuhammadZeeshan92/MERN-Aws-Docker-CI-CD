import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authenticated, loading } = useAuth();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p.id === parseInt(id));
  const relatedProducts = products
    .filter((p) => p.categoryId === product?.categoryId && p.id !== product?.id)
    .slice(0, 4);

    useEffect(() => {
      if (!loading && !authenticated) {
        navigate('/login');
      }
    }, [authenticated, loading, navigate]);
  
    if (loading) return null;  
  
    if (!authenticated) {
      return null;
    }

  if (!product) {
    return (
      <div className="product-detail">
        <Navbar variant="dashboard" />
        <div className="container">
          <p>Product not found</p>
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="product-detail">
      <Navbar variant="dashboard" />
      <div className="container">
        <div className="product-detail-content">
          {/* Image Gallery */}
          <div className="product-images">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-information">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-rating">
              {'★'.repeat(Math.floor(product.rating))}
              <span className="rating-value">{product.rating}</span>
              <span className="rating-count">(120 reviews)</span>
            </div>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <p className="product-description">{product.description}</p>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button className="btn-primary btn-large" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn-secondary btn-large">
                Add to Wishlist
              </button>
            </div>

            {/* Product Details */}
            <div className="product-details">
              <h3>Product Details</h3>
              <ul>
                <li>Category: {product.category}</li>
                <li>In Stock: {product.inStock ? 'Yes' : 'No'}</li>
                <li>Rating: {product.rating} / 5</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

