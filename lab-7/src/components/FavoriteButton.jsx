import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function FavoriteButton({ productId, name }) {
  const [favorite, setFavorite] = useLocalStorage(
    `favorite:${productId}`,
    false,
  )

  return (
    <button
      type="button"
      className={favorite ? 'favorite-button active' : 'favorite-button'}
      aria-pressed={favorite}
      aria-label={`До обраного: ${name}`}
      onClick={() => setFavorite((f) => !f)}
    >
      {favorite ? '♥' : '♡'}
    </button>
  )
}
