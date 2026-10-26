import restaurantFood from '../assets/restaurantfood.jpg';

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
    <button>Reserve a Table</button>
  </div>

  <img src={restaurantFood} alt="Little Lemon Restaurant" />
</section>
  );
}

export default callToAction;