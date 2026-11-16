/**
 * Показує перші `step` елементів з `items` і кнопку, що показує наступні.
 *
 * Використання:
 *   <ShowMore items={reviews} step={3}>
 *     {(visibleItems) => <ul>…</ul>}
 *   </ShowMore>
 *
 * Вимоги — у тестах tests/ShowMore.test.jsx.
 */
import { useState } from 'react'

export default function ShowMore({ items, step, children }) {
  const [visibleCount, setVisibleCount] = useState(step)

  const visibleItems = items.slice(0, visibleCount)
  const hiddenCount = items.length - visibleItems.length
  const hasToggle = items.length > step

  function handleClick() {
    if (hiddenCount > 0) {
      setVisibleCount((c) => Math.min(items.length, c + step))
    } else {
      setVisibleCount(step)
    }
  }

  return (
    <>
      {children(visibleItems)}
      {hasToggle && (
        <button type="button" className="show-more" onClick={handleClick}>
          {hiddenCount > 0
            ? `Показати ще ${Math.min(step, hiddenCount)}`
            : 'Згорнути'}
        </button>
      )}
    </>
  )
}