import { useShowMore } from '../hooks/useShowMore.js'

export default function ShowMore({ items, step, children }) {
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    items,
    step
  )
  const hasToggle = items.length > step

  return (
    <>
      {children(visibleItems)}
      {hasToggle && (
        <button
          type="button"
          className="show-more"
          onClick={hiddenCount > 0 ? showMore : collapse}
        >
          {hiddenCount > 0
            ? `Показати ще ${Math.min(step, hiddenCount)}`
            : 'Згорнути'}
        </button>
      )}
    </>
  )
}