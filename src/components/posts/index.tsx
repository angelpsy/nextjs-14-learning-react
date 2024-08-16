import NewPost from "../new-post";
import Post from "../post";
import Modal from '../modal';
import styles from "./styles.module.css";
import { usePosts } from './hooks';

type Props = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export default function Posts({
  isOpenModal,
  openModal,
  closeModal,
}: Props) {
  const {
    body,
    name,
    handleChangeBody,
    handleChangeName,
    items,
    idSelectedPost,
    handleSelectPost,
    handleCloseModal,
    handleResetForNewPost,
  } = usePosts({
    isOpenModal,
    openModal,
    closeModal,
  });

  return (
    <>
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <NewPost
          id={idSelectedPost}
          body={body}
          name={name}
          onChangeBody={handleChangeBody}
          onChangeName={handleChangeName}
          onCancel={handleResetForNewPost}
        />
      </Modal>
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
