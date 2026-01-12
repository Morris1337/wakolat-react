import React, { useState } from 'react';
import './ShopPanel.scss';

export default function DropdownCheckbox({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);
  const handleOptionChange = (option) => {
    onChange(
      selected.includes(option)
        ? selected.filter(o => o !== option)
        : [...selected, option]
    );
  };

  return (
    <div style={{ marginBottom: '10px', position: 'relative' }}>
      <div
        onClick={toggle}
        className='dropdown-label'
      >
        {label} ▾
      </div>
      {open && (
        <div
        className='dropdown-checkbox'
        >
          {options.map((opt) => (
            <label key={opt} style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                value={opt}
                checked={selected.includes(opt)}
                onChange={() => handleOptionChange(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
