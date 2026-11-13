import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import GuestsStepper from './GuestsStepper.jsx'
import { describeBooking } from '../describeBooking.js'

const defaultValues = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  comment: '',
}

export default function BookingForm() {
  const [booking, setBooking] = useState(null)
  const { register, control, handleSubmit, reset, setFocus } = useForm({
    defaultValues,
  })

  const comment = useWatch({ control, name: 'comment' })

  function onValid(data) {
    setBooking(data)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.requestSubmit()
    }
  }

  function handleReset() {
    setFocus('name')
    reset()
    setBooking(null)
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit(onValid)}
      onKeyDown={handleKeyDown}
    >
      <div className="field">
        <label>
          Ім&apos;я
          <input {...register('name')} autoComplete="name" required />
        </label>
        <p id="name-error" className="field-error" />
      </div>

      <div className="field">
        <label>
          Телефон
          <input
            {...register('phone')}
            type="tel"
            placeholder="+380XXXXXXXXX"
            autoComplete="tel"
            required
          />
        </label>
        <p id="phone-error" className="field-error" />
      </div>

      <div className="field-row">
        <div className="field">
          <label>
            Дата
            <input {...register('date')} type="date" required />
          </label>
          <p id="date-error" className="field-error" />
        </div>

        <div className="field">
          <label>
            Час
            <input {...register('time')} type="time" required />
          </label>
          <p id="time-error" className="field-error" />
        </div>
      </div>

      <Controller
        name="guests"
        control={control}
        render={({ field }) => (
          <GuestsStepper value={field.value} onChange={field.onChange} />
        )}
      />

      <div className="field">
        <label>
          Коментар
          <textarea
            {...register('comment')}
            rows="3"
            maxLength={200}
            aria-describedby="comment-counter"
          />
        </label>
        <p id="comment-counter" className="counter">
          {comment.length} / 200
        </p>
      </div>

      <div className="actions">
        <button type="submit">Забронювати</button>
        <button type="button" onClick={handleReset}>
          Очистити
        </button>
      </div>

      <p role="status" className="status">
        {booking && describeBooking(booking)}
      </p>
    </form>
  )
}
