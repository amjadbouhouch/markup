import React, { useState } from 'react';

const ThemeChanger = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<
    'forest' | 'light'
  >(() => {
    const prevTheme = localStorage.getItem('theme');
    return prevTheme || 'forest';
  });
  const toggleDarkMode = () => {
    const newTheme = isDarkModeEnabled === 'forest' ? 'light' : 'forest';
    localStorage.setItem('theme', newTheme);
    document
      .getElementsByTagName('html')[0]
      .setAttribute('data-theme', newTheme);
    setIsDarkModeEnabled(newTheme);
  };
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">Dark mode</span>
        <input
          type="checkbox"
          className="toggle toggle-secondary"
          checked={isDarkModeEnabled === 'forest'}
          onChange={toggleDarkMode}
        />
      </label>
    </div>
  );
};

export default ThemeChanger;
