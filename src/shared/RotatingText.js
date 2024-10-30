import React, { useState, useEffect } from "react";

const RotatingText = ({ wordList, typingSpeed = 25, pauseDuration = 1500 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (!isDeleting && typingIndex <= wordList[currentWordIndex].length) {
      setTimeout(() => {
        setDisplayedText(
          wordList[currentWordIndex].substring(0, typingIndex + 1)
        );
        setTypingIndex(typingIndex + 1);
      }, typingSpeed);
    } else if (isDeleting) {
      setTimeout(() => {
        setDisplayedText(
          wordList[currentWordIndex].substring(0, typingIndex - 1)
        );
        setTypingIndex(typingIndex - 1);
      }, typingSpeed);
    } else {
      setTimeout(() => setIsDeleting(true), pauseDuration);
    }

    if (isDeleting && typingIndex === 0) {
      setIsDeleting(false);
      setTypingIndex(0);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordList.length);
    }
  }, [
    typingIndex,
    isDeleting,
    wordList,
    typingSpeed,
    pauseDuration,
    currentWordIndex,
  ]);

  return (
    <span>
      {displayedText}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

export default RotatingText;
