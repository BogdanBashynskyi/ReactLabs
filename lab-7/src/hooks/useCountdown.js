/**
 * Зворотний відлік від `totalSeconds` до нуля, по секунді.
 *
 * Використання:
 *   const { secondsLeft, isRunning, start, pause, reset } = useCountdown(180)
 *
 * Вимоги — у тестах tests/useCountdown.test.jsx.
 */
import { useEffect, useState } from 'react'

export function useCountdown(initialSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setIsRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [isRunning])

  function start() {
    if (secondsLeft > 0) {
      setIsRunning(true)
    }
  }

  function pause() {
    setIsRunning(false)
  }

  function reset() {
    setIsRunning(false)
    setSecondsLeft(initialSeconds)
  }

  return { secondsLeft, isRunning, start, pause, reset }
}
