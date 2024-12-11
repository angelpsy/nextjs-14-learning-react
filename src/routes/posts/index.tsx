import { Outlet, useLoaderData, useMatch } from "react-router";
import {postServiceInstance} from "../../hooks/posts-service-instance";

import Posts from "../../components/posts";
import Modal from '../../components/modal';
import { useGoBack } from '../../hooks/navigate';

function MainPage() {
  const match = useMatch("/");
  const { goBack } = useGoBack();
  const {items} = useLoaderData();

  // const { items, handleFetchPosts } = usePosts();
  const handleClose = goBack;

  // useEffect(() => {
  //   if (!match) {
  //     return;
  //   }
  //   handleFetchPosts();
  // }, [match]);

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

export async function loader() {
  const data = await postServiceInstance.getPosts();
  return {
    items: data || [],
  };
}
