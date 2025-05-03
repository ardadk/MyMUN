import './Card.css';

export default function WelfareCard({ score }) {
  return (
    <div className="card blue">
      <p>REFAH DÜZEYİ</p>
      <h2>{score}/5 ⭐</h2>
    </div>
  );
}