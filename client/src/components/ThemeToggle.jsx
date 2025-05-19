import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </button>
  );
}