import React from 'react';

export default function ConfirmDeleteModal({ onClose, onDelete }) {
  return (
    <div className="modal">
      <h3>Are you sure you want to delete this shift?</h3>
      <p>This action cannot be undone.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDelete} style={{ marginLeft: 10, color: 'white', backgroundColor: 'red' }}>
          Yes, Delete
        </button>
      </div>
    </div>
  );
}
