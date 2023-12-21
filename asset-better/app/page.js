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
import React, { useReducer } from 'react';

const formValuesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return [...state, action.value];
    default:
      return state;
  }
};

export default function Home() {
  const [formValues, dispatchFormValues] = useReducer(formValuesReducer, []);

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
          <div className={styles.imageContainer}>
            <Image src="/images/person.jpg" alt="Person" width={127} height={300} />
          </div>
          <Header/>
        <AssetCards assets={formValues} />
      </div>
      </div>
      <div className={styles.graph}>
        <GraphElement assets={formValues} />
      </div>
      </FormValuesContext.Provider>
    </main>
  )
}