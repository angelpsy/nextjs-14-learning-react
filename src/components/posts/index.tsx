import NewPost from "../new-post";
import Post from "../post";
import styles from "./styles.module.css";

export default function Posts() {
  return (
    <>
      <NewPost />
      <ul className={styles.root}>
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
      </ul>
    </>
  );
}
