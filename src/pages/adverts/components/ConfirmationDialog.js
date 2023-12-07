import React from 'react';
import '../../../styles/confirmationDialog.css'
import '../../../styles/components.css'

const ConfirmationDialog = ({ onConfirm, onCancel }) => (
  <div className='info'>
    <p><b>¿Seguro que quieres borrar este anuncio?</b></p>
    <button type="button" className='submit' onClick={onConfirm}>
      Sí
    </button>
    <button type="button" className='submit' onClick={onCancel}>
      No
    </button>
  </div>
);

export default ConfirmationDialog;

