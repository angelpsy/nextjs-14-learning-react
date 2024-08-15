import "./App.css";
import Post from "./components/post";
import styles from "./styles.module.css";

function App() {
  return (
    <main>
      <Post
        className={styles.card}
        author="Aleksei"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, impedit repudiandae alias ex nisi dolor perferendis sequi autem distinctio doloremque fugit delectus debitis magni doloribus? Odit ab corporis eos quisquam."
      />
      <Post
        className={styles.card}
        author="Aleksey"
        body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, libero!"
      />
    </main>
  );
}

export default App;
