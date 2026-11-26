import { Link } from 'react-router-dom';
import { OfferList } from '@/components/offer-list';
import MapView from '@/components/map';
import { CityList } from '@/components/city-list';
import { SortOptions, type SortType } from '@/components/sort-options';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { changeCityName } from '@/app/store/action';
import { selectCity, selectCityOffers, selectOffers } from '@/app/store/selector';
import type { AppDispatch } from '@/app/store';
import type { City } from '@/types';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cityName = useSelector(selectCity);
  const allOffers = useSelector(selectOffers);
  const offers = useSelector(selectCityOffers);
  const cities = Array.from(
    allOffers.reduce((cityByName, offer) => {
      cityByName.set(offer.city.name, offer.city);
      return cityByName;
    }, new Map<string, City>()).values(),
  );
  const [sortType, setSortType] = useState<SortType>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const city = cities.find((item) => item.name === cityName);
  const sortedOffers = useMemo(() => {
    switch (sortType) {
      case 'Price: low to high':
        return [...offers].sort((first, second) => first.price - second.price);
      case 'Price: high to low':
        return [...offers].sort((first, second) => second.price - first.price);
      case 'Top rated first':
        return [...offers].sort((first, second) => second.rating - first.rating);
      default:
        return offers;
    }
  }, [offers, sortType]);

  if (!city) {
    throw new Error(`Unknown selected city: ${cityName}`);
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
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
                    <span className="header__favorite-count">3</span>
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList
            cities={cities}
            selectedCity={cityName}
            onCitySelect={(name) => {
              dispatch(changeCityName(name));
              setActiveOfferId(null);
            }}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {cityName}
              </b>
              <SortOptions sortType={sortType} onSortTypeChange={setSortType} />
              <OfferList
                offers={sortedOffers}
                className="cities__places-list places__list tabs__content"
                onActiveOfferChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <MapView
                city={city}
                offers={offers}
                activeOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
