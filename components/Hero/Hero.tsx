// Hero component
// hero component with parallax background
import './Hero.css'

function Hero() {
  return (
    <div className="landing-hero">
      <div className="container">
        <h1>
          Welcome to <span className="text-secondary font-bold">SawMovie</span>
        </h1>
        <p>
          Your all-in-one Movie Library.
          <br />
          Get{' '}
          <span className="border-b-2 border-secondary font-semibold">
            FREE
          </span>{' '}
          movies now without credit card!
        </p>
        <a className="inline-block px-4 py-2 bg-secondary text-primary rounded-full font-bold cursor-pointer tracking-wider">
          REGISTER NOW
        </a>
      </div>
    </div>
  )
}

export default Hero
