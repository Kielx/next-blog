import styles from '../styles/sending.module.css'

const Sending = () => {
  return (
    <div className={styles.sendingContainer}>
      <div className={styles.sendingBox}>
        <div className={`${styles.sendingBorder} ${styles.sendingOne}`} />
        <div className={`${styles.sendingBorder} ${styles.sendingTwo}`} />
        <div className={`${styles.sendingBorder} ${styles.sendingThree}`} />
        <div className={`${styles.sendingBorder} ${styles.sendingFour}`} />

        <div className={`${styles.sendingLine} ${styles.sendingOne}`} />
        <div className={`${styles.sendingLine} ${styles.sendingTwo}`} />
        <div className={`${styles.sendingLine} ${styles.sendingThree}`} />
      </div>
    </div>
  )
}

export default Sending
