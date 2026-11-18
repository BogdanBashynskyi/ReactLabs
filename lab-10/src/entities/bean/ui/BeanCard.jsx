import { useId } from 'react'
import { paths } from '../../../shared/config/index.js'
import Link from '../../../shared/ui/Link.jsx'

export default function BeanCard({
  bean,
  compact = false,
  favorite,
  addToCart,
}) {
  const titleId = useId()

  return (
    <article className="bean-card" aria-labelledby={titleId}>
      <h3 id={titleId}>
        <Link to={paths.bean(bean.id)}>{bean.name}</Link>
      </h3>
      <p>{bean.notes.join(', ')}</p>
      <p className="price">{bean.price} грн</p>
      {favorite}
      {!compact && addToCart}
    </article>
  )
}
