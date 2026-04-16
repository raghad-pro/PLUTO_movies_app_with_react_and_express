export default function StateMessage({ icon, title, subtitle }) {
  return (
    <div className="state-message">
      <i className={icon}></i>
      <p>{title}</p>
      <p>{subtitle}</p>
    </div>
  );
}
