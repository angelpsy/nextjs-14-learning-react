import NewPost from "../new-post";
import Post from "../post";
import Modal from '../modal';
import styles from "./styles.module.css";
import { useIndex } from './hooks';

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
    isLoadingFetchData,
    errorOfFetching,
    isLoadingCreatePost,
    errorOfCreatePost,
    isLoadingUpdatePost,
    errorOfUpdatePost,
    handleSelectPost,
    handleCloseModal,
    handleResetForNewPost,
    handleSubmitForm,
  } = useIndex({
    isOpenModal,
    openModal,
    closeModal,
  });

  if (isLoadingFetchData) {
    return <p>Loading...</p>;
  }

  if (errorOfFetching) {
    return <p>Error: {errorOfFetching}</p>;
  }

  return (
    <>
      <Modal open={isOpenModal || isLoadingCreatePost || isLoadingUpdatePost} onClose={handleCloseModal}>
        <NewPost
          id={idSelectedPost}
          defaultBody={selectedPost?.body || ''}
          defaultName={selectedPost?.author || ''}
          onCancel={handleResetForNewPost}
          onSubmit={handleSubmitForm}
          isDisabled={isLoadingCreatePost || isLoadingUpdatePost}
        />
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
