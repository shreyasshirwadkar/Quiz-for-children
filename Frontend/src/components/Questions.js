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
    if (option === question.correct) {
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
    var colors = ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  return (
    <div className="flex flex-col items-center p-6 shadow-xl rounded-2xl w-full max-w-xl bg-gray-200">
      <SadAnime isSAD1Visible={isSAD1Visible} />
      <Happy isHAPPYVisible={isHAPPYVisible} />
      <Happy2 isHAPPY2Visible={isHAPPY2Visible} />
      <img
        src={question.question}
        alt="question"
        className="max-w-4xl max-h-96 p-6 rounded-lg"
      />
      <div className="grid grid-cols-2 gap-6 mt-4 w-full">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`py-4 px-6 rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:bg-blue-200 ${
              selectedOption === option ? "bg-blue-300" : "bg-slate-300"
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <label className="text-2xl text-black">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
