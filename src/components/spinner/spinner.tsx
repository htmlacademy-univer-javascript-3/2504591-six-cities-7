import './spinner.css';

type SpinnerProps = {
  message?: string;
};

export const Spinner = ({ message = 'Загрузка предложений...' }: SpinnerProps) => (
  <div className="app-status" role="status" aria-live="polite">
    <span className="spinner" aria-hidden="true"></span>
    <span>{message}</span>
  </div>
);
