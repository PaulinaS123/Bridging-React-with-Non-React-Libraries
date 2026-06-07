import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function App() {
  const [votes, setVotes] = useState({
    React: 5,
    Vue: 3,
    Angular: 2,
  });

  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const handleVote = (framework) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [framework]: prevVotes[framework] + 1,
    }));
  };

  useEffect(() => {
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: Object.keys(votes),
          datasets: [
            {
              label: "Votes",
              data: Object.values(votes),
            },
          ],
        },
      });
    } else {
      chartInstanceRef.current.data.datasets[0].data = Object.values(votes);

      chartInstanceRef.current.update();
    }

    // Destroying old chart instances prevents memory leaks,
    // duplicate event listeners, and canvas rendering errors.
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [votes]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Favorite JavaScript Framework Poll</h1>

      <button onClick={() => handleVote("React")}>Vote React</button>

      <button onClick={() => handleVote("Vue")}>Vote Vue</button>

      <button onClick={() => handleVote("Angular")}>Vote Angular</button>

      <div style={{ width: "600px", marginTop: "20px" }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
