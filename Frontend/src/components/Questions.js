import React, { useState } from "react";
import confetti from "canvas-confetti";
import SadAnime from "./animations/sad";
import Happy from "./animations/happy1";
import Happy2 from "./animations/happy2";

export default function Questions({ question, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSAD1Visible, setIsSAD1Visible] = useState(false);
  const [isHAPPYVisible, setIsHAPPYVisible] = useState(false);
  const [isHAPPY2Visible, setIsHAPPY2Visible] = useState(false);

  function onSelect(i) {
    setSelectedOption(i);
    const selectedOptionText = question.options[i];
    const checkWith = question.correctanswer;

    if (checkWith === selectedOptionText) {
      shootConfetti();
      setIsHAPPYVisible(true);
      setTimeout(() => setIsHAPPYVisible(false), 3000);
      shootConfetti();
      setIsHAPPY2Visible(true);
      setTimeout(() => setIsHAPPY2Visible(false), 3000);
      shootConfetti();
    } else {
      setIsSAD1Visible(true);
      setTimeout(() => setIsSAD1Visible(false), 3000);
    }
  }

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
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 2 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 3 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 4 },
        colors: colors
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  return (
    <div className="questions" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SadAnime isSAD1Visible={isSAD1Visible} />
      <Happy isHAPPYVisible={isHAPPYVisible} />
      <Happy2 isHAPPY2Visible={isHAPPY2Visible} />
      <img src={question.image} alt="question" style={{ maxWidth: "100%", marginBottom: "20px" }} />
      <div className="answers-grid" style={{ width: "80%", textAlign: "center" }}>
        {question.options.map((q, i) => (
          <div
            key={i}
            className={`answer-option ${selectedOption === i ? "selected" : ""}`}
            onClick={() => onSelect(i)}
            style={{ padding: "10px", marginBottom: "10px", borderRadius: "5px", cursor: "pointer" }}
          >
            <label className="text-primary" style={{ fontSize: "18px" }}>{q}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
