// src/components/StarRating.jsx

import React from "react";

function StarRating({ rating }) {
  const maxStars = 5;
  const starsArray = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < rating) {
      starsArray.push("★");
    } else {
      starsArray.push("☆");
    }
  }

  return <span style={{ color: "#f39c12", fontSize: "1.2rem" }}>{starsArray.join(" ")}</span>;
}

export default StarRating;
