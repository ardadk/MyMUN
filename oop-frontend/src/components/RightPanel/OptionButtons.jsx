// File: src/components/OptionButtons.jsx
import './OptionButtons.css';

export default function OptionButtons({ options, onSelect }) {
  return (
    <div className="option-buttons">
      {options.map((option, index) => (
        <button key={index} onClick={() => onSelect(option)} className="option-button">
          {option.text}
        </button>
      ))}
    </div>
  );
}
