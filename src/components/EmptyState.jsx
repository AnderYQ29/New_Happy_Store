const EmptyState = ({ icon: Icon, title, description, children }) => (
  <div className="empty-state">
    {Icon && <Icon size={40} aria-hidden="true" />}
    <h2>{title}</h2>
    {description && <p>{description}</p>}
    {children}
  </div>
);

export default EmptyState;
