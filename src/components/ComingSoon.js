
import { Link } from "react-router-dom";

function ComingSoon() {
  return (
    <main className="coming-soon">
      <div className="coming-soon-content">
        <div className="coming-soon-lemon" aria-hidden="true">
          🍋
        </div>

        <p className="coming-soon-label">
          A LITTLE SOMETHING IS COOKING
        </p>

        <h1>
          Something delicious
          <span> is on its way.</span>
        </h1>

        <p className="coming-soon-description">
          We're preparing something special for you.
          This page is still cooking, but it'll be ready
          to serve soon!
        </p>

        <div className="coming-soon-actions">
          <Link to="/" className="coming-soon-button">
            Back to Home
          </Link>
        </div>

        <p className="coming-soon-footer">
          Good things take time. Thanks for your patience!
        </p>
      </div>
    </main>
  );
}

export default ComingSoon;
