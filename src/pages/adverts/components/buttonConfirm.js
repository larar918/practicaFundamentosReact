import React, { useState} from 'react';
import ConfirmationDialog from './ConfirmationDialog'; 

import '../../../styles/components.css'

const ButtonConfirm = ({ onDelete }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handleShowConfirmation = () => {
    setConfirmationVisible(true);
  };

  const handleConfirm = (event) => {
    setConfirmationVisible(false);
    onDelete(event);
  };

  const handleCancel = () => {
    setConfirmationVisible(false);
  };

  return (
    <div className='form'>
      {isConfirmationVisible ? (
        <ConfirmationDialog onConfirm={handleConfirm} onCancel={handleCancel} />
      ) : (
        <button type="button" className="submit delete-button" onClick={handleShowConfirmation}>Borrar anuncio</button>
      )}
    </div>
  );
};

export default ButtonConfirm;
