import React from 'react';
import '../../styles/Buttons.css';

const PrimaryButton = ({ text, onClick }) => {
  return (
    <button className="btn-primary" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;