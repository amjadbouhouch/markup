import React from 'react'
import { useState } from 'react'
const ThemeChanger = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true)
  const toggleDarkMode = () => {
    const prevTheme = isDarkModeEnabled ? 'dark' : 'light'
    document
      .getElementsByTagName('html')[0]
      .setAttribute('data-theme', prevTheme === 'dark' ? 'light' : 'dark')
    setIsDarkModeEnabled((prev) => !prev)
  }
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">Dark mode</span>
        <input
          type="checkbox"
          className="toggle toggle-secondary"
          checked={isDarkModeEnabled}
          onChange={toggleDarkMode}
        />
      </label>
    </div>
  )
}

export default ThemeChanger
