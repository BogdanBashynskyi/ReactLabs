import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function FavoriteButton({ productId, productName }) {
  const [favorite, setFavorite] = useLocalStorage(
    `favorite:${productId}`,
    false,
  )

  return (
    <button
      type="button"
      className={favorite ? 'favorite-button active' : 'favorite-button'}
      aria-pressed={favorite}
      aria-label={
        favorite
          ? `Прибрати ${productName} з обраного`
          : `Додати ${productName} в обране`
      }
      onClick={() => setFavorite((f) => !f)}
    >
      {favorite ? '♥' : '♡'}
    </button>
  )
}
