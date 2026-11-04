import { useState } from 'react'
import './ProfileCard.css'

function ProfileCard({ name, group, technologies }) {
  const [likes, setLikes] = useState(0)

  return (
    <article className="profile-card" aria-labelledby="profile-title">
      <p className="profile-card__eyebrow">Про мене</p>
      <h1 id="profile-title">{name}</h1>
      <p className="profile-card__group">Група: {group}</p>

      <h2>Технології, які хочу опанувати</h2>
      <ul className="profile-card__technologies">
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <button
        className="profile-card__like"
        type="button"
        onClick={() => setLikes((currentLikes) => currentLikes + 1)}
        aria-label={`Подобається. Кількість натискань: ${likes}`}
      >
        <span>Подобається</span>
        <span className="profile-card__count" aria-hidden="true">
          {likes}
        </span>
      </button>
    </article>
  )
}

export default ProfileCard
