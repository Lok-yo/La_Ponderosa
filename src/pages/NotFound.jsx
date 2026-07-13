import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container not-found__inner">
        <span className="not-found__code" aria-hidden="true">404</span>
        <div>
          <span className="eyebrow">Esta mesa no existe</span>
          <h1 id="not-found-title">Se nos fue ese corte.</h1>
          <p>La página que buscabas no está en el mostrador, pero lo bueno sigue aquí.</p>
          <Link to="/" className="btn btn--primary">
            Volver al inicio <Icon.ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}
