import "../App.css";

export default function ConfirmModal({ title, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ maxWidth: 380, textAlign: "center" }}>
        <div className="confirm-icon">
          <i className="fas fa-trash-can" style={{ color: "#ef4444", fontSize: 40 }}></i>
        </div>
        <p className="confirm-title">are you sure?</p>
        <p className="confirm-sub">
      It will be permanently deleted<strong>{title}</strong>
        </p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onCancel}>cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
