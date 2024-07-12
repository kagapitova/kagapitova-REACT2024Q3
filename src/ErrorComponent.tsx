import React, { useState } from 'react';
import styles from './ErrorComponent.module.css';

const ErrorComponent: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('Example error');
  }

  return (
    <button onClick={() => setHasError(true)} className={styles.btn}>
      Error
    </button>
  );
};

export default ErrorComponent;
