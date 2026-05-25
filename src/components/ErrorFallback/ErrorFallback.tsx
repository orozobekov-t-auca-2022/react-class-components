import styles from './ErrorFallback.module.css';

const ErrorFallback = () => {
  return (
    <section className={styles.errorBoundary}>
      <h2 className={styles.emoji}>🐱</h2>
      <h2>Oops, something went wrong. Please, visit this website later</h2>
    </section>
  )
}

export default ErrorFallback;
