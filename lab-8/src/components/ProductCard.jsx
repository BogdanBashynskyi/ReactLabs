import { useState } from 'react'
import Button from './Button.jsx'
import FavoriteButton from './FavoriteButton.jsx'
import GrindPicker from './GrindPicker.jsx'
import { withAnalytics } from '../hoc/withAnalytics.jsx'

const AddToCartButton = withAnalytics(Button, 'add_to_cart')

export default function ProductCard({ product }) {
  const [inCart, setInCart] = useState(0)

  return (
    <article className="product-card">
      <div className="product-header">
        <h1>{product.name}</h1>
        <FavoriteButton productId={product.id} name={product.name} />
      </div>
      <p className="product-description">{product.description}</p>
      <GrindPicker />
      <p className="product-price">
        <strong>{product.price} грн</strong> за 250 г
      </p>
      <div className="cart-row">
        <AddToCartButton
          analyticsData={{ productId: product.id }}
          onClick={() => setInCart((c) => c + 1)}
        >
          Додати в кошик
        </AddToCartButton>
        {inCart > 0 && (
          <p role="status" className="cart-count">
            У кошику: {inCart}
          </p>
        )}
      </div>
    </article>
  )
}
