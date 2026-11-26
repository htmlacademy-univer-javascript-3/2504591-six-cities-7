import { Link, useParams } from 'react-router-dom';
import { CommentForm } from '@/components/comment-form';
import { ReviewsList } from '@/components/reviews-list';
import { OfferList } from '@/components/offer-list';
import Map from '@/components/map';
import { Spinner } from '@/components/spinner/spinner';
import { api } from '@/app/store';
import type { Offer, OfferDetails, Review } from '@/types';
import { useEffect, useState } from 'react';

type OfferPageData = {
  offer: OfferDetails | null;
  reviews: Review[];
  nearPlaces: Offer[];
  error: string | null;
};

export const OfferPage = () => {
  const { id } = useParams();
  const [pageData, setPageData] = useState<OfferPageData>({
    offer: null,
    reviews: [],
    nearPlaces: [],
    error: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadOfferPage = async () => {
      setIsLoading(true);
      setPageData({ offer: null, reviews: [], nearPlaces: [], error: null });

      try {
        if (!id) {
          throw new Error('Предложение не найдено.');
        }

        const encodedId = encodeURIComponent(id);
        const [offerResponse, reviewsResponse, nearbyResponse] = await Promise.all([
          api.get<OfferDetails>(`/offers/${encodedId}`),
          api.get<Review[]>(`/comments/${encodedId}`),
          api.get<Offer[]>(`/offers/${encodedId}/nearby`),
        ]);

        if (isActive) {
          setPageData({
            offer: offerResponse.data,
            reviews: reviewsResponse.data,
            nearPlaces: nearbyResponse.data,
            error: null,
          });
        }
      } catch {
        if (isActive) {
          setPageData({
            offer: null,
            reviews: [],
            nearPlaces: [],
            error: 'Не удалось загрузить данные предложения. Попробуйте позже.',
          });
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadOfferPage();

    return () => {
      isActive = false;
    };
  }, [id]);

  if (isLoading) {
    return <Spinner message="Загрузка предложения..." />;
  }

  if (pageData.error || !pageData.offer) {
    return (
      <div className="app-status" role="alert">
        <p>{pageData.error ?? 'Предложение не найдено.'}</p>
        <Link to="/">Вернуться к списку предложений</Link>
      </div>
    );
  }

  const { offer, reviews, nearPlaces } = pageData;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/login"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.slice(0, 6).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type[0].toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper user__avatar-wrapper${offer.host.isPro ? ' offer__avatar-wrapper--pro' : ''}`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt={`${offer.host.name}, host`}
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <Map city={offer.city} offers={nearPlaces} className="offer__map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              offers={nearPlaces}
              variant="near"
              className="near-places__list places__list"
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
