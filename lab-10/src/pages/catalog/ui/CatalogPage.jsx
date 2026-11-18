import { beans, BeanCard } from '../../../entities/bean/index.js'
import { AddToCartButton } from '../../../features/add-to-cart/index.js'
import { FavoriteButton } from '../../../features/toggle-favorite/index.js'

export default function CatalogPage() {
  return (
    <>
      <h1>Кава в зернах</h1>
      <section className="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Усі сорти ({beans.length})</h2>
        <ul className="bean-grid">
          {beans.map((bean) => (
            <li key={bean.id}>
              <BeanCard
                bean={bean}
                favorite={
                  <FavoriteButton productId={bean.id} name={bean.name} />
                }
                addToCart={<AddToCartButton bean={bean} />}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
