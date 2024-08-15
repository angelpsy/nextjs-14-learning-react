import { useState } from 'react';
import NewPost from "../new-post";
import Post from "../post";
import styles from "./styles.module.css";

export default function Posts() {
  const [items, setItems] = useState([
    {
      id: 1,
      author: 'Aleksei',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, impedit repudiandae alias ex nisi dolor perferendis sequi autem distinctio doloremque fugit delectus debitis magni doloribus? Odit ab corporis eos quisquam.',
    },
    {
      id: 2,
      author: 'Aleksey',
      body: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, libero!',
    },
  ]);
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [idSelectedPost, setIdSelectedPost] = useState<null | number>(null);

  function handleChangeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(event.target.value);
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function selectPost(id: number) {
    if (idSelectedPost === id) {
      setIdSelectedPost(null);
      setBody('');
      setName('');
      return;
    }
    setIdSelectedPost(id);
    const post = items.find((item) => item.id === id);
    if (post) {
      setBody(post.body);
      setName(post.author);
    }
  }

  return (
    <>
      <NewPost
        body={body}
        name={name}
        onChangeBody={handleChangeBody}
        onChangeName={handleChangeName}
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
              onSelect={(id) => selectPost(id)}
            />
          )
        })}
      </ul>
    </>
  );
}
