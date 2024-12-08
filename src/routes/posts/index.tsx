import { useEffect } from 'react';
import { Outlet, useMatch } from "react-router";

import Posts from "../../components/posts";
import Modal from '../../components/modal';
import { usePosts } from "./hooks";
import { useGoBack } from '../../hooks/navigate';

function MainPage() {
  const match = useMatch("/");
  const { goBack } = useGoBack();

  const { items, handleFetchPosts } = usePosts();
  const handleClose = goBack;

  useEffect(() => {
    if (!match) {
      return;
    }
    handleFetchPosts();
  }, [match]);

  return (
    <>
      <Posts items={items} />
      <Modal open={!match} onClose={handleClose}>
        <Outlet />
      </Modal>
    </>
  );
}

export default MainPage;
