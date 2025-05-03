import './Card.css';

export default function EconomicCard({ score }) {
  return (
    <div className="card purple">
      <p>EKONOMİK DURUM</p>
      <h2>{score}/5 ⭐</h2>
    </div>
  );
}