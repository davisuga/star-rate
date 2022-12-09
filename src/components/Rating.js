//@ts-check
import React, { useEffect, useRef, useState } from "react";
import "./Rating.css";
const def = {
  // 0.5 to 5
  value: 0,
  emptyIcon: undefined,
  halfFilledIcon: undefined,
  filledIcon: undefined,
  steps: 0.5,
};

// const calcIncrement = ()

const Rating = (props = def) => {
  const emptyIcon = props.emptyIcon || "/icons/stars/empty.svg";
  const filledIcon = props.filledIcon || "/icons/stars/filled.svg";
  const halfFilledIcon = props.halfFilledIcon || "/icons/stars/half.svg";
  const [savedValue, setSavedValue] = useState(props.value);
  const [shownValue, setShownValue] = useState(savedValue);

  const showHalfSteps = props.steps % 1 === 0.5;

  const isLessThanHalf = (event) => {
    const { target } = event;
    const boundingClientRect = target.getBoundingClientRect();
    let mouseAt = event.clientX - boundingClientRect.left;
    mouseAt = Math.round(Math.abs(mouseAt));
    const half = mouseAt <= boundingClientRect.width / 2;
    console.log({ half });
    return half;
  };

  // Utility function to calculate if the mouse event happened on the left side of the target or the right side.

  const renderSymbol = (symbolVal, index) => {
    const getInc = (e) => (showHalfSteps && isLessThanHalf(e) ? 1.5 : 1);

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
        const correctedIndex = index + 2;
        const adjustedValue =
          correctedIndex <= shownValue ? 1 : correctedIndex - shownValue;

        return renderSymbol(adjustedValue, index);
      })}
    </div>
  );
};

export default Rating;
