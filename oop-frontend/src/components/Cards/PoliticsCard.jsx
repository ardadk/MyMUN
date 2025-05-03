import './Card.css';

export default function PoliticsCard({ text }) {
  const displayText = text && text.trim() !== '' ? text : 'Rastgele politika atanıyor...';
  return (
    <div className="card green">
      <p>POLİTİKA</p>
      <h2>{displayText}</h2>
    </div>
  );
}