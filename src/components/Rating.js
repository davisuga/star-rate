//@ts-check
import React, { useEffect, useRef, useState } from "react";
import "./Rating.css";

// const calcIncrement = ()

const Rating = (props) => {
  const emptyIcon = props.emptyIcon || "/icons/stars/empty.svg";
  const filledIcon = props.filledIcon || "/icons/stars/filled.svg";
  const halfFilledIcon = props.halfFilledIcon || "/icons/stars/half.svg";
  const [savedValue, setSavedValue] = useState(props.value);
  const [shownValue, setShownValue] = useState(savedValue);

  const value = props.value || shownValue || 0;

  const showHalfSteps = props.steps === 0.5;
  console.log("value", value);

  const isLessThanHalf = (event) => {
    const { target } = event;
    const boundingClientRect = target.getBoundingClientRect();
    let mouseAt = event.clientX - boundingClientRect.left;
    mouseAt = Math.round(Math.abs(mouseAt));
    return mouseAt <= boundingClientRect.width / 2;
  };

  const showAndSave = (newVal) => {
    setShownValue(newVal);
    setSavedValue(newVal);
  };

  useEffect(() => {
    const handler = (e) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowLeft":
          showAndSave(value - (props.steps || 1));

          break;
        case "ArrowRight":
          showAndSave(value + (props.steps || 1));

          break;

        default:
          setShownValue(Number(e.key));
          setSavedValue(Number(e.key));
          break;
      }
    };
    window.addEventListener("keyup", handler);

    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [shownValue, value, savedValue]);

  // Utility function to calculate if the mouse event happened on the left side of the target or the right side.

  const renderSymbol = (symbolVal, index) => {
    const getInc = (e) => (showHalfSteps && isLessThanHalf(e) ? 0.5 : 1);

    return (
      <img
        src={
          symbolVal === 1
            ? filledIcon
            : symbolVal === 0.5
            ? halfFilledIcon
            : emptyIcon
        }
        className="rating-image"
        data-testid="rating-icon"
        alt="Rate"
        onMouseMove={(e) => {
          setShownValue(index + getInc(e));
        }}
        onClick={(e) => {
          setSavedValue(index + getInc(e));
        }}
      />
    );
  };

  return (
    <div
      tabIndex={0}
      className="star-rating"
      onMouseLeave={() => setShownValue(savedValue)}
      data-testid="star-rating-container"
    >
      {[0, 0, 0, 0, 0].map((_, index) => {
        const correctedIndex = index + 1;
        if (correctedIndex <= value) return renderSymbol(1, index);
        const adjustedValue = correctedIndex > value + 1 ? 0 : value % 1;
        console.log(adjustedValue);
        return renderSymbol(adjustedValue, index);
      })}
    </div>
  );
};

export default Rating;
