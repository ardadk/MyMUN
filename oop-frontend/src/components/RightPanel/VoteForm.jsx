import './VoteForm.css';
import { useEffect, useState } from 'react';

const countryCodes = ["A", "B", "C", "D", "E"];

export default function VoteForm({ voter, onVote }) {
  const [votes, setVotes] = useState({});

  useEffect(() => {
    const initialVotes = {};
    countryCodes.forEach(code => {
      if (code !== voter) initialVotes[code] = "";
    });
    setVotes(initialVotes);
  }, [voter]);

  const handleChange = (targetCountry, value) => {
    const point = Math.max(0, Math.min(10, Number(value)));
    setVotes(prev => ({ ...prev, [targetCountry]: point }));
  };

  const handleSubmit = () => {
    const validVotes = {};
    for (const [target, value] of Object.entries(votes)) {
      validVotes[target] = Number(value) || 0;
    }
    onVote(validVotes);
  };

  return (
    <div className="vote-form">
      <h3 className="vote-form-title">Ülke {voter} oy veriyor</h3>
      <div className="vote-inputs">
        {countryCodes
          .filter(code => code !== voter)
          .map(code => (
            <div key={code} className="vote-input-row">
              <label htmlFor={`vote-${code}`}>Ülke {code} için puan: </label>
              <input
                id={`vote-${code}`}
                className="vote-input"
                type="number"
                min="0"
                max="10"
                value={votes[code] || ""}
                onChange={(e) => handleChange(code, e.target.value)}
              />
            </div>
          ))}
      </div>
      <button className="vote-submit-button" onClick={handleSubmit}>Oyları Kaydet</button>
    </div>
  );
}
