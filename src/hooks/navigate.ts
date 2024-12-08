import { useLocation, useNavigate } from 'react-router';

export const useGoBack = (defaultRoute = '/') => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key !== 'default') {
      navigate(-1); // Go back if there's history
    } else {
      navigate(defaultRoute);
    }
  };

  return {
    goBack,
  };
};