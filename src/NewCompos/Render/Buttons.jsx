// Render/Buttons.jsx
import React from "react";
import { handleButtonClick as runButtonFeature } from "../AppFeatures/handleButtonClick";

function CardButtons({ times, unpackList, button_trim, guarantee, onRoll }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (onRoll) {
      const result = runButtonFeature(times, unpackList, guarantee); // chạy tính toán
      onRoll(result); // trả kết quả cho App
    }
  };

  return (
    <button 
      className="card-button" 
      style={{
        backgroundImage: `url(${button_trim})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay', // nếu muốn blend với màu nền
      }}
      onClick={handleClick}>
      Engage
    </button>

  );
}

export default CardButtons;

