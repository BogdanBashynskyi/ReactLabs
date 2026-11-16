import { useShowMore } from '../hooks/useShowMore.js'
import FavoriteButton from './FavoriteButton.jsx'

export default function RelatedProducts({ products }) {
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    products,
    4,
  )
  const hasToggle = products.length > 4

  return (
    <section className="related">
      <h2 id="related-heading">Схожі товари</h2>
      <ul className="related-grid" aria-labelledby="related-heading">
        {visibleItems.map((product) => (
          <li key={product.id} className="related-card">
            <div className="related-header">
              <h3>{product.name}</h3>
              <FavoriteButton productId={product.id} name={product.name} />
            </div>
            <p className="related-notes">{product.notes}</p>
            <p className="related-price">{product.price} грн</p>
          </li>
        ))}
        {hasToggle && (
          <li className="related-more">
            <button
              type="button"
              onClick={hiddenCount > 0 ? showMore : collapse}
            >
              {hiddenCount > 0
                ? `Показати ще ${Math.min(4, hiddenCount)}`
                : 'Згорнути'}
            </button>
          </li>
        )}
      </ul>
    </section>
  )
}
