import React from 'react'
import './App.css'

import data from './data'

export default function App() {
  const [active, setActive] = React.useState(0)

  const [selected, setSelected] = React.useState([])

  const isChecked = (value, menuIndex) => {
    return selected[menuIndex] === value
  }

  React.useEffect(() => {}, [selected, active])

  const isDisabled = (value, menuIndex) => {
    if (menuIndex > active) return true

    const rules = data.rules[selected[menuIndex - 1]]

    if (Array.isArray(rules)) {
      return rules.includes(Number(value))
    }

    return false
  }

  const handleChange = (value, menuIndex) => {
    const nextSelected = [...selected]

    nextSelected[menuIndex] = value

    nextSelected[menuIndex + 1] = null

    nextSelected[menuIndex + 2] = null

    setSelected(nextSelected)

    setActive(menuIndex + 1)
  }

  return (
    <div className="App">
      {data.menus.map((menu, menuIndex) => {
        return (
          <div className="menu" key={menuIndex}>
            <h3>Menu {menuIndex + 1}</h3>
            {menu.map((m) => {
              const checked = isChecked(m.id, menuIndex)
              const disabled = isDisabled(m.id, menuIndex)
              return (
                <label
                  className={
                    disabled ? 'menu__item menu__item--disabled' : 'menu__item'
                  }
                  key={m.value}
                >
                  <input
                    name={`menu${menuIndex}[]`}
                    type="radio"
                    value={m.id}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => handleChange(m.id, menuIndex)}
                  />
                  <span>{m.value}</span>
                </label>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
