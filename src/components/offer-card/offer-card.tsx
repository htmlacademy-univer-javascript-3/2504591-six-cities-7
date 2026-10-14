import { Link } from 'react-router-dom';
import type { Offer } from '@/types';

type OfferCardProps = {
  offer: Offer;
  variant?: 'city' | 'favorite';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
};

export const OfferCard = ({
  offer,
  variant = 'city',
  onMouseEnter,
  onMouseLeave,
  isActive = false,
}: OfferCardProps) => {
  const isFavoriteCard = variant === 'favorite';
  const cardClassName = isFavoriteCard
    ? 'favorites__card place-card'
    : 'cities__card place-card';
  const imageWrapperClassName = isFavoriteCard
    ? 'favorites__image-wrapper place-card__image-wrapper'
    : 'cities__image-wrapper place-card__image-wrapper';
  const infoClassName = isFavoriteCard
    ? 'favorites__card-info place-card__info'
    : 'place-card__info';

  return (
    <article
      className={cardClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-current={isActive ? 'true' : undefined}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClassName}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoriteCard ? '150' : '260'}
            height={isFavoriteCard ? '110' : '200'}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">
          {offer.type[0].toUpperCase() + offer.type.slice(1)}
        </p>
      </div>
    </article>
  );
};
