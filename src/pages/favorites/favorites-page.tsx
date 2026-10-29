import { Link } from 'react-router-dom';
import { OfferList } from '@/components/offer-list';
import type { Offer } from '@/types';

type FavoritesPageProps = {
  offers: Offer[];
};

export const FavoritesPage = ({ offers }: FavoritesPageProps) => {
  const offersByCity = offers.reduce<Record<string, Offer[]>>((grouped, offer) => {
    const cityName = offer.city.name;
    grouped[cityName] = [...(grouped[cityName] ?? []), offer];
    return grouped;
  }, {});
  const cities = Object.keys(offersByCity);

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
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">{offers.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {cities.length > 0 ? (
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <span className="locations__item-link">{city}</span>
                      </div>
                    </div>
                    <OfferList
                      offers={offersByCity[city]}
                      variant="favorite"
                      className="favorites__places"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="favorites__empty">
                <b className="favorites__empty-title">Nothing yet</b>
                <p>
                  Save properties by clicking the bookmark icon on the
                  property&apos;s page.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
};
