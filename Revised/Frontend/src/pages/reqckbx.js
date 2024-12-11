import React, { useState } from 'react';

const RequiredCheckbox = ({ label, required, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          required={required}
        />
        {label}
      </label>
    </div>
  );
};

export default RequiredCheckbox;