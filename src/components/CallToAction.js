import { Link } from 'react-router-dom';
import restaurantFood from '../assets/restaurantfood.jpg';
import ComingSoon from './ComingSoon';

function callToAction() {
  return (
  <section className="intro">
  <div className="intro-text">
    <h1 className="markazi-text-400">Little Lemon</h1>
    <h2 className="markazi-text-400">Chicago</h2>
    <p>
      We are a family-owned Mediterranean restaurant, focused
      on traditional recipes served with a modern twist.
    </p>
   <Link to="/reservations">
  <button>Reserve a Table</button>
</Link>
    
  </div>

  <img src={restaurantFood} alt="Little Lemon Restaurant" />
</section>
  );
}

export default callToAction;