import { Link } from 'react-router-dom';

export default function FeatureCard({ to, icon, title, description, color }) {
  return (
    <Link to={to} className="feature-card" style={{ '--card-color': color }} aria-label={title}>
      <div className="feature-icon" aria-hidden="true">{icon}</div>
      <div className="feature-text">
        <h2 className="feature-title">{title}</h2>
        <p className="feature-desc">{description}</p>
      </div>
      <span className="feature-arrow" aria-hidden="true">›</span>
    </Link>
  );
}
