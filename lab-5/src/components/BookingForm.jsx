import { useState } from 'react'
import GuestsStepper from './GuestsStepper.jsx'
import { describeBooking } from '../describeBooking.js'

export default function BookingForm() {
  const [booking, setBooking] = useState(null)
  const [comment, setComment] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setBooking(Object.fromEntries(formData))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.requestSubmit()
    }
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="field">
        <label htmlFor="name">Ім&apos;я</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="date">Дата</label>
          <input id="date" name="date" type="date" required />
        </div>

        <div className="field">
          <label htmlFor="time">Час</label>
          <input
            id="time"
            name="time"
            type="time"
            min="08:00"
            max="21:00"
            required
          />
        </div>
      </div>

      <GuestsStepper defaultValue={2} />

      <div className="field">
        <label htmlFor="comment">Коментар</label>
        <textarea
          id="comment"
          name="comment"
          rows="3"
          maxLength={200}
          aria-describedby="comment-counter"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <p id="comment-counter" className="counter">
          {comment.length} / 200
        </p>
      </div>

      <div className="actions">
        <button type="submit">Забронювати</button>
        <button type="reset">Очистити</button>
      </div>

      <p role="status" className="status">
        {booking && describeBooking(booking)}
      </p>
    </form>
  )
}
