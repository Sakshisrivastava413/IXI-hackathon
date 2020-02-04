import React from 'react';
import '../App.css';

const Card = () => (
  <div className="card card-size">
    <div className="card-image">
      <img src="react.png" className="card-img" />
    </div>
    <div className="card-content">
      <div className="title">
        React
      </div>
    </div>
  </div>
);

export default Card;