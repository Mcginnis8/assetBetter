"use client"
import Image from 'next/image'
import styles from './page.module.css'
import HouseForm from './HouseForm.client';
import CarForm from './CarForm.client';
import BankForm from './BankForm.client';
import Header from './Header.client';
import AssetCards from './AssetCards.client';
import GraphElement from './GraphElement.client';
import FormValuesContext from './FormValuesContext.client';
import React, { useReducer, useState } from 'react';

const formValuesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return [...state, action.value];
    case 'ADJUST_FOR_INFLATION':
      return state.map(formValue => ({
        ...formValue,
        avgYearlyChange: formValue.avgYearlyChange - 3,
      }));
    case 'UNADJUST_FOR_INFLATION':
      return state.map(formValue => ({
        ...formValue,
        avgYearlyChange: formValue.avgYearlyChange + 3,
      }));
    case 'DELETE_ASSET':
      return state.filter(asset => asset.id !== action.id);
    default:
      return state;
  }
};

export default function Home() {
  const [formValues, dispatchFormValues] = useReducer(formValuesReducer, []);
  const [isAdjustedForInflation, setIsAdjustedForInflation] = useState(false);

  const handleToggle = () => {
    setIsAdjustedForInflation(!isAdjustedForInflation);
    if (isAdjustedForInflation) {
      dispatchFormValues({ type: 'UNADJUST_FOR_INFLATION' });
    } else {
      dispatchFormValues({ type: 'ADJUST_FOR_INFLATION' });
    }
  };

  return (
      <main className={styles.main}>
      <FormValuesContext.Provider value={{ formValues, dispatchFormValues }}>
      <div className="imageButtonRow" style={{ display: 'flex', justifyContent: 'space-between', margin: '0 auto' }}>
        <HouseForm dispatchFormValues={dispatchFormValues} />
        <CarForm dispatchFormValues={dispatchFormValues} />
        <BankForm dispatchFormValues={dispatchFormValues} />
      </div>

      <div className={styles.person}>
        <div className={styles.personBento}>
        <label style={{width: '15vw', display: 'flex', alignItems: 'center'}}>
            <input 
              type="checkbox" 
              checked={isAdjustedForInflation} 
              onChange={handleToggle}
              style={{ filter: 'brightness(70%)', width: '2vw', height: '2vw', marginRight: '0.2vw' }}
            />
            <span style={{ color: 'black', fontSize: "1.3vw" }}>Adjust for inflation</span>
          </label>
          <div className={styles.imageContainer}>
            <Image src="/images/person.jpg" alt="Person" width={127} height={300} style={{width: '8.2vw', height: '19.5vw'}} />
          </div>
          <Header/>
        <AssetCards assets={formValues} dispatchFormValues={dispatchFormValues} />
      </div>
      </div>
      <div className={styles.graph}>
        <GraphElement assets={formValues} />
      </div>
      </FormValuesContext.Provider>
    </main>
  )
}