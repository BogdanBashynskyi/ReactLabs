import ShowMore from './ShowMore.jsx'

export default function ReviewList({ reviews }) {
  return (
    <section className="reviews">
      <h2>Відгуки ({reviews.length})</h2>
      <ShowMore items={reviews} step={3}>
        {(visibleReviews) => (
          <ul className="review-list">
            {visibleReviews.map((review) => (
              <li key={review.id} className="review-card">
                <div className="review-header">
                  <strong>{review.author}</strong>
                  <span>{'★'.repeat(review.rating)}</span>
                </div>
                <p>{review.text}</p>
              </li>
            ))}
          </ul>
        )}
      </ShowMore>
    </section>
  )
}