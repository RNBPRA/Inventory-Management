import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
