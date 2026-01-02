// NewCompos/displays/Lobby.jsx

import { useState, useEffect } from "react";
import CardButtons from "../Render/Buttons";

function CardPackLobby({
  cardpacks,
  totalDict,
  total_packopened,
  onRoll,
}) {
  // 🃏 Lobby-local UI state
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [HoveringEffect, setHoveringEffect] = useState("Change");

  // 👉 Click card logic (Lobby chịu trách nhiệm)
  const handleCardClick = (index) => {
    setActiveCard(prev => (prev === index ? null : index));
    setHoveringEffect(prev => (prev === index ? null : index));
  };

  // 👉 Click outside to close active card
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.card')) {
        setActiveCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* 📊 Hover info */}
      {hoveredCard !== null && (
        <div className="total-dict">
          <div className="total-dict-list">
            {Object.entries(totalDict).length === 0 && <div>Empty</div>}
            {Object.entries(totalDict)
              .sort(([, a], [, b]) => b - a)
              .map(([key, value]) => (
                <div key={key} className="total-dict-item">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
          </div>
          <div style={{ color: '#55aaffff', fontSize: '1em' }}>
            <strong>Pack Opened: {total_packopened}</strong>
          </div>
        </div>
      )}

      <div className="cards-container">
        {cardpacks.map((card, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => {
              setHoveredCard(index);
              setHoveringEffect(activeCard === index ? index : "Beetle");
            }}
            onMouseLeave={() => {
              setHoveredCard(null);
              setHoveringEffect("Beetle");
            }}
          >
            <div className="card-img-wrapper">
              <img
                src={`${(
                  card.Cover === ""
                    ? "/Packs/BETA/Default.jpg"
                    : (HoveringEffect === index ? card.Animation : card.Cover)
                ).replace(/ /g, "%20")}`}
                alt={card.Title}
              />
            </div>

            <div className="card-body">
              <div className="card-title">{card.Title}</div>

              <div className="card-footer">
                <div
                  className="card-note"
                  style={{
                    '--note-color':
                      (activeCard === index || hoveredCard === index)
                        ? 'transparent'
                        : '#ccc',
                  }}
                >
                  <i>{card.Note}</i>
                </div>

                {(activeCard === index || hoveredCard === index) && (
                  <div className="button-row">
                    <CardButtons
                      times={card.Cards}
                      unpackList={card.Unpack}
                      button_trim={card.Button.replace(/ /g, "%20")}
                      guarantee={card.Guarantee}
                      onRoll={(result) => onRoll(card, result)} 
                      // 👆 Lobby không xử lý game logic, chỉ forward
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardPackLobby;
