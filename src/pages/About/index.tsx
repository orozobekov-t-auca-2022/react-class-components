import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <h1>Information about the author</h1>
      <div className={styles.name}>
        Author: Tilek
      </div>
      <div>
        <h2>Contact Info</h2>
        <ul className={styles.contactInfo}>
          <li>Discord: discord</li>
          <li>Telegram: telegram</li>
          <li>Linkedin: linkedin</li>
        </ul>
      </div>
      <div className={styles.reactCourseLink}>
        <a href="https://rs.school/courses/reactjs">Link to React Course</a>
      </div>
    </section>
  );
};

export default About;
