import React from 'react';
import './home.scss';

const FeatureRight = () => {
  return (
    <div className="feature-right d-flex flex-column gap-1">
      <a href="#">
        <div className="img-container">
          <img className="w-100" loading="lazy" src="/content/images/spotify.webp" />
        </div>
      </a>
      <a href="#">
        <div className="img-container">
          <img className="w-100" loading="lazy" src="/content/images/netflix.webp" />
        </div>
      </a>
      <a href="#">
        <div className="img-container">
          <img className="w-100" loading="lazy" src="/content/images/youtube.webp" />
        </div>
      </a>
    </div>
  );
};
export default FeatureRight;
