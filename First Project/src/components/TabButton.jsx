// components/TabButton.js
import React from "react";

function TabButton({ onSelect, children, isSelected }) {
  return (
    <button className={isSelected ? 'active' : undefined} onClick={onSelect}>
      {children}
    </button>
  );
}

export default TabButton;
