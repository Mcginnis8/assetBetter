import Image from 'next/image'
import styles from './page.module.css'
export default function Home() {
  return (
    <main className={styles.main}>
      <div className="imageButtonRow">
        <div className = "imageButtonPair">
          <div className={styles.imageContainer}>
            <Image src="/images/house.jpg" alt="House" width={300} height={300} />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Add House</button>
          </div>
        </div>

        <div className = "imageButtonPair"></div>
          <div className={styles.imageContainer}>
            <Image src="/images/car.jpg" width={300} height={300} />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Add Car</button>
          </div>
        </div>


        <div className = "imageButtonPair">
          <div className={styles.imageContainer}>
            <Image src="/images/bank.jpg" alt="Bank" width={300} height={300} />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Add Investment Account</button>
          </div>
        </div>


      <div className={styles.imageContainer}>
        <Image src="/images/person.jpg" alt="Person" width={300} height={300} />
      </div>
    </main>
  )
}