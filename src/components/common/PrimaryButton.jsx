import React from 'react';

const PrimaryButton = ({ text, onClick }) => {
  return (
    <button className="btn-primary" onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;