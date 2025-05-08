import './Card.css';

export default function WelfareCard({ score }) {
  return (
    <div className="card blue">
      <p>REFAH DÜZEYİ</p>
      <h2>{score}/100 ⭐</h2>
    </div>
  );
}