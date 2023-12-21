'use client';
import React, { useState, useContext, useRef } from 'react';
import styles from './page.module.css'
import FormValuesContext from './FormValuesContext.client';

const BankForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { formValues, dispatchFormValues } = useContext(FormValuesContext);
  const formRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const form = formRef.current;
    if (form) {
      const name = form.elements.name.value;
      const homeValue = form.elements.assetWorth.value;
      const avgYearlyChange = form.elements.averageChange.value;
      const assetType = 'bank';
  
      if (!name || !homeValue || !avgYearlyChange) {
        setErrorMessage('Please fill all fields');
        return;
      }
  
      dispatchFormValues({ type: 'ADD_VALUE', value: { name, homeValue, avgYearlyChange, assetType} });
      toggleForm();
      setErrorMessage('');
    }
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
      <div className={styles.imageButtonPair}>
        <div className={styles.imageContainer}>
          {isFormVisible ? (
            <form style={{ width: '300px', height: '300px' }} onSubmit={handleSubmit} ref={formRef}>
              <label className={styles.customLabel}>
                Name:
                <input className={styles.customInput} type="text" name="name" style={{ width: '80%' }} required />
              </label>
              <label className={styles.customLabel}>
                Account Value:
                <input className={styles.customInput} type="number" name="assetWorth" style={{ width: '80%' }} required />
              </label>
              <label className={styles.customLabel}>
                Avg Yearly Change:
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input className={styles.customInput} type="number" name="averageChange" style={{ width: '40%' }} required />
                  <span style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }}>%</span>
                </div>
              </label>
            </form>
          ) : (
            <img src="/images/bank.jpg" alt="PiggyBank" width={300} height={300}></img>
          )}
        </div>
        {errorMessage && <div style={{ color: 'red', fontSize: '1.5rem' }}>{errorMessage}</div>}
        <div className={styles.buttonContainer}>
          <button className={styles.button} style={{ maxWidth: '300px' }} onClick={() => { 
            if (isFormVisible) {
              if (formRef.current) {
                handleSubmit();
              }
            } else {
              toggleForm();
            }
          }}>
            {isFormVisible ? 'Submit' : 'Add Portfolio'}
          </button>
        </div>
      </div>
  );
};

export default BankForm;
