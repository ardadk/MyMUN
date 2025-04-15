// src/components/Scoreboard.jsx

import React from "react";
import Card from "./Card";
import StarRating from "./StarRating";

function Scoreboard({ economicStatus, welfareLevel, policy, problem }) {
  return (
    <div style={styles.scoreboardContainer}>
      <Card title="Ekonomik Durum">
        <StarRating rating={economicStatus} />
        <div>{economicStatus}/5</div>
      </Card>

      <Card title="Refah Düzeyi">
        <StarRating rating={welfareLevel} />
        <div>{welfareLevel}/5</div>
      </Card>

      <Card title="Politika">
        <div>{policy}</div>
      </Card>

      <Card title="Problem">
        <div>{problem}</div>
      </Card>
    </div>
  );
}

const styles = {
  scoreboardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "16px"
  }
};

export default Scoreboard;
