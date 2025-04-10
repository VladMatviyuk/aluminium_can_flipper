import { Link } from 'react-router-dom';

export const Quest = () => {
  return (
    <main className="quest">
      <h1>В разработке</h1>
      <Link to={ '..' } style={ {color: 'white', fontSize: '2rem'} }>
        Назад
      </Link>
    </main>
  )
}