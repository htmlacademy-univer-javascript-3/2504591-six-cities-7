import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="page page--gray page--main">
    <main className="page__main page__main--index">
      <h1>404. Page not found</h1>
      <Link to="/">Go to main page</Link>
    </main>
  </div>
);
