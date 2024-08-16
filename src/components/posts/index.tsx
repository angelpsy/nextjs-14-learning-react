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
    items,
    idSelectedPost,
    selectedPost,
    handleSelectPost,
    handleCloseModal,
    handleResetForNewPost,
    handleSubmitForm,
  } = usePosts({
    isOpenModal,
    openModal,
    closeModal,
  });

  return (
    <>
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        {isOpenModal && <NewPost
          id={idSelectedPost}
          defaultBody={selectedPost?.body}
          defaultName={selectedPost?.author}
          onCancel={handleResetForNewPost}
          onSubmit={handleSubmitForm}
        />}
      </Modal>
      <ul className={styles.root}>
        {items.map((item) => {
          return (
            <Post
              className={styles.card}
              key={item.id}
              id={item.id as number}
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
