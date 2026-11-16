import { useLocalStorage } from '../hooks/useLocalStorage.js'

const GRINDS = [
  { id: 'whole', label: 'Зерно' },
  { id: 'espresso', label: 'Для еспресо' },
  { id: 'filter', label: 'Для фільтра' },
  { id: 'french-press', label: 'Для френч-преса' },
]

export default function GrindPicker({ options = GRINDS }) {
  const [selected, setSelected] = useLocalStorage('grind', options[0].id)

  return (
    <fieldset className="grind-picker">
      <legend>Помел</legend>
      <div className="grind-options">
        {options.map((option) => (
          <label key={option.id} className="grind-option">
            <input
              type="radio"
              name="grind"
              value={option.id}
              checked={selected === option.id}
              onChange={() => setSelected(option.id)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
