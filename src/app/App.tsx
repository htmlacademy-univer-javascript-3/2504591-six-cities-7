import { AppRouterProvider } from './providers';
import { Spinner } from '@/components/spinner/spinner';
import { useSelector } from 'react-redux';
import { selectOffersError, selectOffersStatus } from './store/selector';

export const App = () => {
  const offersStatus = useSelector(selectOffersStatus);
  const offersError = useSelector(selectOffersError);

  if (offersStatus === 'idle' || offersStatus === 'loading') {
    return <Spinner />;
  }

  if (offersStatus === 'failed') {
    return (
      <div className="app-status" role="alert">
        {offersError ?? 'Сервер предложений временно недоступен.'}
      </div>
    );
  }

  return <AppRouterProvider />;
};
