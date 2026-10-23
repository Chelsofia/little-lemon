
import './App.css';
import restaurantFood from './assets/restaurantfood.jpg';
import Logo from './assets/Logo.svg';
import greekSalad from './assets/greek salad.jpg';
import bruschetta from './assets/bruchetta.svg';
import lemonDessert from './assets/lemon dessert.jpg';
import { MdDeliveryDining } from "react-icons/md";
import Header from './Header';
function App() {

  return (
    <>
    <Header />
    <main>

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

<section className="specials-section">
  <div className="specials-header">
    <h1>This week's specials!</h1>
    <button>Online Menu</button>
  </div>

  <div className="specials">
    <div className="special-card">
      <img src={greekSalad} alt="Greek Salad" className="specials-image" />
      <div className="card-content">
        <div className="card-header">
          <h2>Greek Salad</h2>
          <p>$12.99</p>
        </div>
        <p>
          The famous Greek salad of crispy lettuce, peppers, olives and our
          Chicago style feta cheese, garnished with crunchy garlic and
          rosemary croutons.
        </p>
               <div className="delivery">
              <p>Order a delivery</p>
        <MdDeliveryDining />
        </div>
      </div>
    </div>

    <div className="special-card">
      <img src={bruschetta} alt="Bruschetta" className="specials-image" />
      <div className="card-content">
        <div className="card-header">
          <h2>Bruschetta</h2>
          <p>$5.99</p>
        </div>
        <p>
          Our Bruschetta is made from grilled bread that has been smeared
          with garlic and seasoned with salt and olive oil.
        </p>
               <div className="delivery">
 <p>Order a delivery</p>
        <MdDeliveryDining />
        </div>
      </div>
    </div>

    <div className="special-card">
      <img src={lemonDessert} alt="Lemon Dessert" className="specials-image" />
      <div className="card-content">
        <div className="card-header">
          <h2>Lemon Dessert</h2>
          <p>$5.00</p>
        </div>
        <p>
          This comes straight from grandma's recipe book, every last
          ingredient has been sourced and is as authentic as can be imagined.
        </p>
        <div className="delivery">
        <p>Order a delivery</p>
        <MdDeliveryDining />
        </div>

      </div>
    </div>
  </div>
</section>

    </main>
    <footer><p>Copyright 2026 Little Lemon</p></footer>
    </>
  );
}

export default App;
