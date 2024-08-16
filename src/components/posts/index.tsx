import NewPost from "../new-post";
import Post from "../post";
import styles from "./styles.module.css";
import { usePosts } from './hooks';

export default function Posts() {
  const {
    body,
    name,
    onChangeBody,
    onChangeName,
    items,
    idSelectedPost,
    handleSelectPost,
  } = usePosts();

  return (
    <>
      <NewPost
        body={body}
        name={name}
        onChangeBody={onChangeBody}
        onChangeName={onChangeName}
      />
      <ul className={styles.root}>
        {items.map((item) => {
          return (
            <Post
              className={styles.card}
              key={item.id}
              id={item.id}
              author={item.author}
              body={item.body}
              selected={idSelectedPost === item.id}
              onSelect={(id) => handleSelectPost(id)}
            />
          )
        })}
      </ul>
    </>
  );
}
