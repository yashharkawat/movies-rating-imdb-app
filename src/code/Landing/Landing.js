import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link to="/" className="landing-logo">
            <span className="landing-logo-icon">★</span>
            <span className="landing-logo-text">Movies</span>
          </Link>
          <nav className="landing-nav">
            <Link to="/movies" className="landing-nav-link landing-nav-browse">
              Browse Movies
            </Link>
            <Link to="/login" className="landing-nav-link landing-nav-signin">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <h1 className="landing-hero-title">
            Discover & rate movies with <span className="landing-hero-accent">IMDB</span> ratings
          </h1>
          <p className="landing-hero-subtitle">
            Search thousands of movies, see ratings at a glance, save your favorites, and explore full cast, plot, and more—all in one place.
          </p>
          <div className="landing-hero-ctas">
            <Link to="/movies" className="landing-cta landing-cta-primary">
              Browse Movies
            </Link>
            <Link to="/sign-up" className="landing-cta landing-cta-secondary">
              Create free account
            </Link>
          </div>
        </section>

        <section className="landing-features">
          <h2 className="landing-features-title">What you can do</h2>
          <div className="landing-features-grid">
            <article className="landing-feature">
              <div className="landing-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3 className="landing-feature-heading">Search & discover</h3>
              <p className="landing-feature-text">Find any movie by title. Results update as you type, with instant access to details.</p>
            </article>
            <article className="landing-feature">
              <div className="landing-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z" />
                </svg>
              </div>
              <h3 className="landing-feature-heading">IMDB ratings</h3>
              <p className="landing-feature-text">Every result shows the official IMDB rating so you can decide what to watch next.</p>
            </article>
            <article className="landing-feature">
              <div className="landing-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z" />
                </svg>
              </div>
              <h3 className="landing-feature-heading">Save favorites</h3>
              <p className="landing-feature-text">Create an account and like movies to build your own watchlist—synced across devices.</p>
            </article>
            <article className="landing-feature">
              <div className="landing-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14.5 2 14.5 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <h3 className="landing-feature-heading">Full details</h3>
              <p className="landing-feature-text">Open any movie for plot, cast, director, awards, genre, and runtime—everything in one page.</p>
            </article>
          </div>
        </section>

        <section className="landing-cta-block">
          <h2 className="landing-cta-block-title">Ready to find your next favorite?</h2>
          <p className="landing-cta-block-subtitle">Start browsing now or sign up to save your likes.</p>
          <div className="landing-cta-block-buttons">
            <Link to="/movies" className="landing-cta landing-cta-primary">
              Browse Movies
            </Link>
            <Link to="/sign-up" className="landing-cta landing-cta-secondary">
              Sign up free
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <Link to="/" className="landing-footer-logo">Movies</Link>
          <p className="landing-footer-tagline">Discover & rate movies with IMDB ratings.</p>
          <nav className="landing-footer-links">
            <Link to="/movies">Browse</Link>
            <Link to="/login">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
