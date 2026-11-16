import ShowMore from './ShowMore.jsx'
import FavoriteButton from './FavoriteButton.jsx'

export default function RelatedProducts({ products }) {
  return (
    <section className="related">
      <h2>Схожі товари</h2>
      <ShowMore items={products} step={4}>
        {(visibleProducts) => (
          <ul className="related-grid">
            {visibleProducts.map((product) => (
              <li key={product.id} className="related-card">
                <div className="related-header">
                  <h3>{product.name}</h3>
                  <FavoriteButton
                    productId={product.id}
                    productName={product.name}
                  />
                </div>
                <p className="related-notes">{product.notes}</p>
                <p className="related-price">{product.price} грн</p>
              </li>
            ))}
          </ul>
        )}
      </ShowMore>
    </section>
  )
}