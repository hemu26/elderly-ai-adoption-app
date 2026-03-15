export default function CaseCard({ caseItem, onHelp }) {
  const CATEGORY_META = {
    financial: { icon: '💰', color: '#34a853' },
    injustice: { icon: '⚖️', color: '#1a73e8' },
    community: { icon: '🤝', color: '#9c27b0' },
  };

  const meta = CATEGORY_META[caseItem.category] || { icon: '🙏', color: '#ea4335' };

  return (
    <div
      className="case-card"
      style={{ '--case-color': meta.color }}
      aria-label={`Case: ${caseItem.title}`}
    >
      <div className="case-card-header">
        <span className="case-icon" aria-hidden="true">{meta.icon}</span>
        <div className="case-meta">
          <span className="case-category">{caseItem.categoryLabel}</span>
          {caseItem.verified && (
            <span className="case-verified-badge" title="Verified by our team">
              ✅ Verified
            </span>
          )}
        </div>
      </div>

      <h3 className="case-title">{caseItem.title}</h3>
      <p className="case-desc">{caseItem.description}</p>

      {caseItem.amountNeeded && (
        <p className="case-amount">
          <strong>Amount needed:</strong> ₹{caseItem.amountNeeded.toLocaleString('en-IN')}
        </p>
      )}

      <div className="case-card-footer">
        <span className="case-date">{caseItem.date}</span>
        {onHelp && (
          <button
            className="case-help-btn"
            onClick={() => onHelp(caseItem)}
            aria-label={`Help with: ${caseItem.title}`}
          >
            🤲 I Want to Help
          </button>
        )}
      </div>
    </div>
  );
}
