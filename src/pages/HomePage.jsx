import React, { useState } from 'react';
import PrimaryButton from '../components/common/PrimaryButton';
import { mockProducts } from '../data/mockProducts';
import '../styles/HomePage.css'; 
import '../styles/ProductCard.css'; 

const HomePage = () => {
  const [showExtra, setShowExtra] = useState(false);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Admire Beautiful<br/>Indoor Plants</h1>
          <p>If we want to build a calming environment to offer automated interior advice, we need to understand people's connection to nature.</p>
          
          <PrimaryButton 
            text={showExtra ? "Show Less" : "Show More"} 
            onClick={() => setShowExtra(!showExtra)} />
          
          {showExtra && (
            <div className="view-more-content">
              <h4>Why Choose Indoor Plants?</h4>
              <p>Plants not only elevate your aesthetic but also purify the air and reduce daily stress levels. Our spring collection is curated to thrive indoors.</p>
            </div>
          )}
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600" alt="" />
        </div>
      </section>

      <section className="collection-section">
        <div className="collection-grid">
          <div className="col-card col-main">
            <div className="col-content">
              <h2 className="collection-title-large">Indoor<br/>Collection</h2>
              <p className="collection-subtitle">Spring 2026</p>
              <span className="badge">Popular</span>
            </div>
            <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400" alt="" />
          </div>

          <div className="col-card col-box-light">
            <span className="item-count">24 items</span>
            <h3 className="collection-title-light">Bestsellers</h3>
          </div>

          <div className="col-card col-box-dark">
            <span className="badge dark">New</span>
            <h3 className="collection-title-dark">Succulents</h3>
            <img 
              src="https://images.unsplash.com/photo-1446071103084-c257b5f70672?q=80&w=684&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
              alt="Succulents" 
              className="succulents-img"
            />
          </div>

          <div className="col-card col-wide">
            <div>
               <span className="badge">New</span>
               <h3 className="collection-title-wide">Large<br/>Monstera</h3>
            </div>
            <img className="large-monstera-img"
              src="https://images.unsplash.com/photo-1604866830513-d54766457f45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
              alt="Large Monstera" 
            />
          </div>
        </div>

        <div className="brand-carousel">
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="" />
            <p>Snake Plant</p>
          </div>
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=150" alt="" />
            <p>Fiddle Leaf</p>
          </div>
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=150" alt="" />
            <p>Pothos</p>
          </div>
          <div className="brand-item">
            <img src="https://images.unsplash.com/photo-1648806098714-d20de45d4226?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="" />
            <p>Palm Tree</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">You may like</h2>
        <div className="product-grid">
          {mockProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="card-bottom">
                <span className="product-price">${item.price}</span>
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