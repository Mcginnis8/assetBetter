"use client"
import Image from 'next/image'
import styles from './page.module.css'
import HouseForm from './HouseForm.client';
import CarForm from './CarForm.client';
import Header from './Header.client';
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

      <div className={styles.imageButtonPair}>
        <div className={styles.imageContainer}>
          <img src="/images/bank.jpg" alt="PiggyBank" width={300} height={300}></img>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} style={{ maxWidth: '300px' }}>Add Investment Account</button>
        </div>
      </div>
    </div>

      <div className="person" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '0 auto' }}>
        <div className={styles.imageContainer}>
          <Image src="/images/person.jpg" alt="Person" width={300} height={300} />
        </div>
        <Header/>
      </div>
      </FormValuesContext.Provider>
    </main>
  )
}