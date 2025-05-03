import './Card.css';

export default function ProblemCard({ text }) {
  return (
    <div className="card pink">
      <p>PROBLEM</p>
      <h2>{text}</h2>
    </div>
  );
}