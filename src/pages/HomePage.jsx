import React, { useState } from 'react';
import PrimaryButton from '../components/common/PrimaryButton';
import { mockProducts } from '../data/mockProducts';

const HomePage = () => {
  const [showExtra, setShowExtra] = useState(false);

  return (
    <div>
      {/* 1. Hero Section (Gap Bug Fixed) */}
      <section className="hero">
        <div className="hero-content">
          <h1>Admire Beautiful<br/>Indoor Plants</h1>
          <p>If we want to build a calming environment to offer automated interior advice, we need to understand people's connection to nature.</p>
          
          <PrimaryButton 
            text={showExtra ? "Show Less" : "Show More"} 
            onClick={() => setShowExtra(!showExtra)} 
          />
          
          {showExtra && (
            <div className="view-more-content">
              <h4>Why Choose Indoor Plants?</h4>
              <p>Plants not only elevate your aesthetic but also purify the air and reduce daily stress levels. Our spring collection is curated to thrive indoors.</p>
            </div>
          )}
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600" alt="Cactus collection" />
        </div>
      </section>

      {/* 2. NEW: Collection Grid & Carousel */}
      <section className="collection-section">
        <div className="collection-grid">
          {/* Main Tall Column */}
          <div className="col-card col-main">
            <div className="col-content">
              <h2 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: 'normal' }}>Indoor<br/>Collection</h2>
              <p style={{ color: '#555', marginBottom: '20px' }}>Spring 2026</p>
              <span className="badge">Popular</span>
            </div>
            <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" alt="Indoor Collection" />
          </div>

          {/* Top Right Small Box */}
          <div className="col-card col-box-light">
            <span style={{ fontSize: '12px', color: '#777' }}>24 items</span>
            <h3 style={{ fontSize: '26px', marginTop: '10px', fontWeight: 'normal' }}>Bestsellers</h3>
          </div>

          {/* Top Right Dark Box */}
          <div className="col-card col-box-dark">
            <span className="badge dark">New</span>
            <h3 style={{ fontSize: '24px', fontWeight: 'normal' }}>Succulents</h3>
          </div>

          {/* Bottom Right Wide Box */}
          <div className="col-card col-wide">
            <div>
               <span className="badge">New</span>
               <h3 style={{ fontSize: '26px', color: '#333', fontWeight: 'normal' }}>Large<br/>Monstera</h3>
            </div>
            <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300" alt="Large Plants" />
          </div>
        </div>

        {/* Carousel / Brands */}
        <div className="brand-carousel">
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1599003037886-f8b50bc290c8?w=150" alt="Item 1" />
            <p>Snake Plant</p>
          </div>
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=150" alt="Item 2" />
            <p>Fiddle Leaf</p>
          </div>
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=150" alt="Item 3" />
            <p>Pothos</p>
          </div>
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=150" alt="Item 4" />
            <p>Palm Tree</p>
          </div>
        </div>
      </section>

      {/* 3. You May Like Section */}
      <section>
        <h2 className="section-title">You may like</h2>
        <div className="product-grid">
          {mockProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="card-bottom">
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${item.price}</span>
                <PrimaryButton text="Shop Now" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;