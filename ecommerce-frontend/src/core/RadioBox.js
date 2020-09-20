import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices,handleFilters }) => {
  const [value, setValues] = useState(0);

  const handleChange=(event)=>{
    handleFilters(event.target.value);
    setValues(event.target.value);
  }

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={p._id}
        name={p}
        type="radio"
        className="form-check-inpu mr-2 ml-4"
      />
      <label>{p.name}</label>
    </div>
  ));
};
export default RadioBox;
