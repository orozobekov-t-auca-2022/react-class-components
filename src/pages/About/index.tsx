import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
        <div className={styles.title}>
          <h1>Information about the author</h1>
        </div>
        <div className={styles.name}>
          <h2>Author: Tilek</h2>
        </div>
        <div className={styles.contactInfo}>
          <h2>Contact Info</h2>
          <ul>
            <li>Discord: discord</li>
            <li>Telegram: telegram</li>
            <li>Linkedin: linkedin</li>
          </ul>
        </div>
        <div className={styles.reactCourseLink}>
          <a href="https://rs.school/courses/reactjs" target='_blank' rel="noopener noreferrer">Link to React Course</a>
        </div>
      </section>
  );
};

export default About;
