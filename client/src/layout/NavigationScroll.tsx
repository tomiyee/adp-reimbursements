import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Whenever the path in the URL changes, automatically scroll to the top
 * of the page automatically.
 */
const NavigationScroll: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
  return null;
};

export default NavigationScroll;
