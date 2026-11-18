import { paths } from '../../../shared/config/index.js'
import Link from '../../../shared/ui/Link.jsx'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1>Сторінку не знайдено</h1>
      <p>
        <Link to={paths.catalog()}>До каталогу</Link>
      </p>
    </section>
  )
}
