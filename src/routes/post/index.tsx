import { useEffect } from 'react';
import { Link, Outlet, useMatch, useParams } from "react-router";
import { usePost } from './hooks';
import { useGoBack } from '../../hooks/navigate';
import Modal from '../../components/modal';

export default function PostPage() {
  const {postId} = useParams();
  const numId = postId ? parseInt(postId, 10) : 0;
  const {
    item,
    handleFetchPost,
  } = usePost(numId);
  const match = useMatch("/posts/:postId");
  const { goBack } = useGoBack(`/posts/${postId}`);
  const handleClose = goBack;

  useEffect(() => {
    if (!match) {
      return;
    }
    if (postId) handleFetchPost();
  }, [postId, match]);
  

  return (
    <>
    <div>
      <p>{item?.author}</p>
      <p>{item?.body}</p>
      <p><Link to={`/posts/${postId}/edit`}>Edit post</Link></p>
    </div>
    <Modal open={!match} onClose={handleClose}>
      <Outlet />
    </Modal>
  </>
  );
}
