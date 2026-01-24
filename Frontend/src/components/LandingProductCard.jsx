import { Link, useNavigate } from 'react-router-dom';
import './ProductCard.css';

const LandingProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
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

export default LandingProductCard;
