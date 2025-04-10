import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

export const Quest = () => {
  return (
    <main className="quest">
      <h1>В разработке</h1>
      <Link to={ '..' }>
        <IoIosArrowRoundBack style={ {color: 'white', fontSize: '42px'} }/>
      </Link>
    </main>
  )
}