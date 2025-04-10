import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/classicGame">Классический</Link>
      <Link to="/timeGame">На время</Link>
      <Link to="/quest">Квест</Link>
      {/*<Link to="/statistics">Статистика</Link>*/ }
    </nav>
  )
}