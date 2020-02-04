import React from 'react';
import '../App.css';

const Card = ({ pic, name, onClick }) => (
  <div className="card card-size" onClick={onClick}>
    <div className="card-image">
      <img src={pic} className="card-img" />
    </div>
    <div className="card-content">
      <div className="title">
        {name}
      </div>
    </div>
  </div>
);

export default Card;