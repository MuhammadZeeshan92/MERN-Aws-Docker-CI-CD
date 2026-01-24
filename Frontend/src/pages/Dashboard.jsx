import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { authenticated, loading } = useAuth();
  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  if (loading) return null;


  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.categoryId === parseInt(selectedCategory)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    filtered = filtered.filter((product) => product.rating >= minRating);

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, minRating, sortBy, searchQuery]);

  if (!authenticated) {
    return null;
  }

  return (
    <div className="dashboard">
      <Navbar
        variant="dashboard"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="dashboard-container">

        <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* Close button for mobile */}
        <button 
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul className="category-list">
              <li>
                <button
                  className={selectedCategory === 'all' ? 'active' : ''}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Products
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    className={selectedCategory === category.id.toString() ? 'active' : ''}
                    onClick={() => setSelectedCategory(category.id.toString())}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Price Range</h3>
            <div className="price-filter">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <div className="price-display">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Minimum Rating</h3>
            <div className="rating-filter">
              {[4, 3, 2, 1, 0].map((rating) => (
                <button
                  key={rating}
                  className={minRating === rating ? 'active' : ''}
                  onClick={() => setMinRating(rating)}
                >
                  {'★'.repeat(rating)} {rating > 0 ? `${rating}+` : 'All'}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>All Products</h1>
            <div className="sort-controls">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showCategory />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

