import { useEffect, useState } from "react";

export function useTypewriter(
  words,
  {
    deletingSpeed = 60,
    pauseDuration = 1500,
    typingSpeed = 120,
  } = {},
) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const wordSignature = words.join("|");

  useEffect(() => {
    setCurrentWordIndex(0);
    setCurrentText("");
    setIsDeleting(false);
  }, [wordSignature]);

  useEffect(() => {
    if (words.length === 0) {
      return undefined;
    }

    const activeWord = words[currentWordIndex] ?? "";
    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const nextText = activeWord.slice(0, currentText.length + 1);
        setCurrentText(nextText);

        if (nextText === activeWord) {
          window.setTimeout(() => setIsDeleting(true), pauseDuration);
        }

        return;
      }

      const nextText = activeWord.slice(0, Math.max(0, currentText.length - 1));
      setCurrentText(nextText);

      if (nextText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((previousIndex) => (previousIndex + 1) % words.length);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [
    currentText,
    currentWordIndex,
    deletingSpeed,
    isDeleting,
    pauseDuration,
    typingSpeed,
    wordSignature,
  ]);

  return currentText;
}
