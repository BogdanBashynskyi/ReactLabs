import Button from './Button.jsx'
import { formatTime } from '../formatTime.js'
import { withAnalytics } from '../hoc/withAnalytics.jsx'

const PrimaryButton = withAnalytics(Button, 'timer_control')

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
  let action = 'start'

  if (status === 'running') {
    primaryLabel = 'Пауза'
    primaryAction = onPause
    action = 'pause'
  } else if (status === 'paused') {
    primaryLabel = 'Продовжити'
    primaryAction = onStart
    action = 'resume'
  } else if (status === 'done') {
    primaryLabel = 'Спочатку'
    primaryAction = onReset
    action = 'restart'
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
        <PrimaryButton
          analyticsData={{ method: method.id, action }}
          onClick={primaryAction}
        >
          {primaryLabel}
        </PrimaryButton>
        {showReset && <Button onClick={onReset}>Скинути</Button>}
      </div>
    </article>
  )
}
