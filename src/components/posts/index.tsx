import Post from "../post";
import {type IPost} from "../../types/posts";
import styles from "./styles.module.css";

type Props = {
  items: IPost[];
}

export default function Posts({items}: Props) {

  return (
    <ul className={styles.root}>
        {items.map((item) => {
          return (
            <Post
              className={styles.card}
              key={item.id}
              id={item.id as number}
              author={item.author}
              body={item.body}
              isActive={false}
            />
          )
        })}
      </ul>
  );
}
