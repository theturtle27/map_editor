import React from "react";
const Slider = (props) => {
  const { step, min, max, value, defaultLength, onChangeValue } = props;

  const handleChange = (e) => {
    console.log("e.target.value test:", e.target.value);
    onChangeValue(e.target.value);
  };

  return (
    <>
      <div className="slider-container">
        <input
          className="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
export default Slider;
