import React, { useState } from "react";
import confetti from "canvas-confetti";
import SadAnime from "./animations/sad";
import Happy from "./animations/happy1";
import Happy2 from "./animations/happy2";

export default function Questions({ question }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSAD1Visible, setIsSAD1Visible] = useState(false);
  const [isHAPPYVisible, setIsHAPPYVisible] = useState(false);
  const [isHAPPY2Visible, setIsHAPPY2Visible] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === question.correct ) {
      setIsHAPPYVisible(true);
      setTimeout(() => setIsHAPPYVisible(false), 3000);
      setIsHAPPY2Visible(true);
      setTimeout(() => setIsHAPPY2Visible(false), 3000);
      shootConfetti(); // Call confetti animation for correct answer
    } else {
      setIsSAD1Visible(true);
      setTimeout(() => setIsSAD1Visible(false), 3000);
    }
  };

  function shootConfetti() {
    var end = Date.now() + 1500;
    var colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  return (
    <div className="questions">
      <SadAnime isSAD1Visible={isSAD1Visible} />
      <Happy isHAPPYVisible={isHAPPYVisible} />
      <Happy2 isHAPPY2Visible={isHAPPY2Visible} />
      <img src={question.question} alt="question" style={{ maxWidth: "350px", padding: "50px" }} />
      <div className="answers-grid" style={{ width: "80%", textAlign: "center" }}>
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`answer-option ${selectedOption === option ? "selected" : ""}`}
            onClick={() => handleOptionSelect(option)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: selectedOption === option ? '#d3d3d3' : 'transparent'
            }}
          >
            <label className="text-primary" style={{ fontSize: "18px" }}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}