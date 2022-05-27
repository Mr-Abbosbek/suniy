import React from "react";

function MySelect({ options, defaultValue, onChange }) {
  return (
    <select onChange={(e) => onChange(e.target.value)} className="form-control-color filter-region" style={{color: "gray"}}>
      <option value="">
        {defaultValue}
      </option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.value}>
          {opt.region}
        </option>
      ))}
    </select>
  );
}

export default MySelect;
