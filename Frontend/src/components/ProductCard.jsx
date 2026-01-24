import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, showCategory = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    // Optional: Show a toast notification or feedback
    // For now, we'll just add to cart silently
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          {showCategory && (
            <span className="product-category">{product.category}</span>
          )}
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">
            {'★'.repeat(Math.floor(product.rating))}
            <span className="rating-value">{product.rating}</span>
          </div>
          <div className="product-footer">
            <span className="product-price">Rs.{product.price.toFixed(2)}</span>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;