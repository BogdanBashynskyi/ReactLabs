/**
 * Простий (presentational) компонент таймера: лише показує те, що отримав у
 * props, і викликає передані обробники. Власного стану й ефектів не має.
 *
 * Використання:
 *   <TimerView
 *     method={method}
 *     secondsLeft={175}
 *     status="running"   // 'idle' | 'running' | 'paused' | 'done'
 *     onStart={…}
 *     onPause={…}
 *     onReset={…}
 *   />
 *
 * Вимоги — у тестах tests/TimerView.test.jsx.
 */
import { formatTime } from '../formatTime.js'

export default function TimerView({
  method,
  secondsLeft,
  status,
  onStart,
  onPause,
  onReset,
}) {
  let primaryLabel = 'Старт'
  let primaryAction = onStart

  if (status === 'running') {
    primaryLabel = 'Пауза'
    primaryAction = onPause
  } else if (status === 'paused') {
    primaryLabel = 'Продовжити'
    primaryAction = onStart
  } else if (status === 'done') {
    primaryLabel = 'Спочатку'
    primaryAction = onReset
  }

  const showReset = status === 'running' || status === 'paused'

  return (
    <article className="timer-card">
      <h3>{method.name}</h3>
      <p className="timer-recipe">{method.recipe}</p>
      <p className="timer-display" role="timer">
        {formatTime(secondsLeft)}
      </p>
      <p role="status" className="timer-done">
        {status === 'done' ? 'Готово! Час пити каву.' : ''}
      </p>
      <div className="timer-controls">
        <button type="button" onClick={primaryAction}>
          {primaryLabel}
        </button>
        {showReset && (
          <button type="button" onClick={onReset}>
            Скинути
          </button>
        )}
      </div>
    </article>
  )
}
