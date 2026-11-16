import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function GrindPicker({ grinds }) {
  const [selected, setSelected] = useLocalStorage('grind', grinds[0].id)

  return (
    <fieldset className="grind-picker">
      <legend>Помел</legend>
      <div className="grind-options">
        {grinds.map((grind) => (
          <label key={grind.id} className="grind-option">
            <input
              type="radio"
              name="grind"
              value={grind.id}
              checked={selected === grind.id}
              onChange={() => setSelected(grind.id)}
            />
            {grind.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}