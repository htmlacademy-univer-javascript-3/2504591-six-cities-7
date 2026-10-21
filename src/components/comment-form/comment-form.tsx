import { useForm } from 'react-hook-form';

type CommentFormData = {
  rating: number;
  review: string;
};

const ratings = [
  { value: 5, id: '5-stars', title: 'perfect' },
  { value: 4, id: '4-stars', title: 'good' },
  { value: 3, id: '3-stars', title: 'not bad' },
  { value: 2, id: '2-stars', title: 'badly' },
  { value: 1, id: '1-star', title: 'terribly' },
];

export const CommentForm = () => {
  const { register, handleSubmit, watch } = useForm<CommentFormData>({
    defaultValues: { review: '' },
  });
  const rating = watch('rating');
  const review = watch('review');
  const canSubmit = Boolean(rating) && review.trim().length >= 50;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit(() => undefined)();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({ value, id, title }) => (
          <span key={id}>
            <input
              className="form__rating-input visually-hidden"
              value={value}
              id={id}
              type="radio"
              {...register('rating', {
                required: true,
                valueAsNumber: true,
              })}
            />
            <label
              htmlFor={id}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </span>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        {...register('review', { required: true, minLength: 50 })}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star"> rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!canSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
