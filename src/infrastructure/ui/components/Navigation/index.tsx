import style from './style.module.css';

import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className={ style.nav }>
      <Link to="/classicGame">классический</Link>
      <Link to="/timeGame">на время</Link>
      <Link to="/turnsGame">на ходы</Link>
    </nav>
  )
}