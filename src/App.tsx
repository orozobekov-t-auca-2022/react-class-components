import Header from "./components/Header/Header";
import styles from "./App.module.css";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;